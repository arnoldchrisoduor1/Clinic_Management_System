package services

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

// UserRole represents the user role enum
type UserRole string

const (
	RoleAdmin       UserRole = "admin"
	RolePatient     UserRole = "patient"
	RoleDoctor      UserRole = "doctor"
	RoleNurse       UserRole = "nurse"
	RolePharmacist  UserRole = "pharmacist"
	RoleSupplier    UserRole = "supplier"
	RoleDelivery    UserRole = "delivery"
	RoleProcurement UserRole = "procurement"
)

// User represents the user model
type User struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	Email        string    `json:"email"`
	Phone        string    `json:"phone"`
	Role         UserRole  `json:"role"`
	IsActive     bool      `json:"isActive"`
	PasswordHash string    `json:"password_hash"`
	Token        string    `json:"token"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

// UserInput represents the input for creating a user
type UserInput struct {
	Username     string   `json:"username"`
	Email        string   `json:"email"`
	Phone        string   `json:"phone"`
	Role         UserRole `json:"role"`
	PasswordHash string   `json:"-"`
	Token        string   `json:"token"`
}

// UpdateUserInput represents the input for updating a user
type UpdateUserInput struct {
	Username *string   `json:"username"`
	Email    *string   `json:"email"`
	Phone    *string   `json:"phone"`
	Role     *UserRole `json:"role"`
	IsActive *bool     `json:"isActive"`
}

type UpdateUserTokenInput struct {
	ID  	  int      `json:"id"`
	Token     string   `json:"token"`
}

// UserService handles user-related business logic
type UserService struct {
	db *sql.DB
}

// NewUserService creates a new user service instance
func NewUserService(db *sql.DB) *UserService {
	return &UserService{db: db}
}

// CreateUser creates a new user
func (s *UserService) CreateUser(ctx context.Context, input UserInput) (*User, error) {
	exists, err := s.UserExists(ctx, input.Username, input.Email)
	if err != nil {
		return nil, err
	}
	if exists {
		return nil, errors.New("user already exists")
	}

	var user User
	err = s.db.QueryRowContext(ctx,
		`SELECT * FROM create_user($1, $2, $3, $4, $5)`,
		input.Username,
		input.PasswordHash,
		input.Email,
		input.Phone,
		input.Role,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Phone,
		&user.Role,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserByID retrieves a user by ID
func (s *UserService) GetUserByID(ctx context.Context, id int) (*User, error) {
	var user User
	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM get_user_by_id($1)`,
		id,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Phone,
		&user.Role,
		&user.Token,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("user not found")
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetUserByEmail retrieves a user by email
func (s *UserService) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	var user User
	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM get_user_by_email($1)`,
		email,
	).Scan(
		&user.ID,
		&user.Username,
		&user.PasswordHash,
		&user.Email,
		&user.Phone,
		&user.Role,
		&user.IsActive,
		&user.Token,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("user not found")
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// GetAllUsers retrieves all users with pagination
func (s *UserService) GetAllUsers(ctx context.Context, limit, offset int) ([]*User, error) {
	rows, err := s.db.QueryContext(ctx,
		`SELECT * FROM get_all_users($1, $2)`,
		limit,
		offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []*User
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.Username,
			&user.Email,
			&user.Phone,
			&user.Role,
			&user.IsActive,
			&user.Token,  
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, &user)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return users, err
}

// UpdateUser updates an existing user
func (s *UserService) UpdateUser(ctx context.Context, id int, input UpdateUserInput) (*User, error) {
	var user User
	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM update_user($1, $2, $3, $4, $5, $6)`,
		id,
		input.Username,
		input.Email,
		input.Phone,
		input.Role,
		input.IsActive,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Phone,
		&user.Role,
		&user.Token,
		&user.IsActive,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("user not found")
	}
	if err != nil {
		return nil, err
	}

	return &user, nil
}

// UpdatePassword updates a user's password
func (s *UserService) UpdatePassword(ctx context.Context, id int, passwordHash string) (bool, error) {
	var updated bool
	err := s.db.QueryRowContext(ctx,
		`SELECT update_user_password($1, $2)`,
		id,
		passwordHash,
	).Scan(&updated)

	if err != nil {
		return false, err
	}

	return updated, nil
}

// DeleteUser deletes a user
func (s *UserService) DeleteUser(ctx context.Context, id int) (bool, error) {
	var deleted bool
	err := s.db.QueryRowContext(ctx,
		`SELECT delete_user($1)`,
		id,
	).Scan(&deleted)

	if err != nil {
		return false, err
	}

	return deleted, err
}

// UserExists checks if a user exists by username or email
func (s *UserService) UserExists(ctx context.Context, username string, email string) (bool, error) {
	var exists bool
	err := s.db.QueryRowContext(ctx,
		`SELECT user_exists($1, $2)`,
		username,
		email,
	).Scan(&exists)

	if err != nil {
		return false, err
	}

	return exists, nil
}

// GetUsersCount returns the total number of users
func (s *UserService) GetUsersCount(ctx context.Context) (int, error) {
	var count int
	err := s.db.QueryRowContext(ctx,
		`SELECT get_users_count()`,
	).Scan(&count)

	if err != nil {
		return 0, err
	}

	return count, nil
}

// Update the user Token.
func (s *UserService) UpdateUserToken(ctx context.Context, input UpdateUserTokenInput) (*User, error) {
    var user User
    err := s.db.QueryRowContext(ctx,
        `SELECT * FROM update_user_token($1, $2)`,
        input.ID, input.Token,
    ).Scan(
        &user.ID,
        &user.Username,
        &user.Email,
        &user.Phone,
        &user.Role,
        &user.IsActive,  
        &user.Token,     
        &user.CreatedAt,
        &user.UpdatedAt,
    )

    if err == sql.ErrNoRows {
        return nil, errors.New("user not found")
    }
    if err != nil {
        return nil, err
    }
    return &user, nil
}
