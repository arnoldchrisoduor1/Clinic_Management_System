package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
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
    ID                        int               `json:"id"`
    Username                  string            `json:"username"`
    Email                     string            `json:"email"`
    Phone                     string            `json:"phone"`
    Role                      UserRole          `json:"role"`
    IsActive                  bool              `json:"isActive"`
    PasswordHash              string            `json:"-"`
    Token                     string            `json:"token"`
    IsVerified                bool              `json:"isVerified"`
    IDNumber                  sql.NullFloat64   `json:"idNumber"`
    LastLogin                 time.Time         `json:"lastLogin"`
    ResetPasswordToken        string    `json:"resetPasswordToken"`
    ResetPasswordExpiresAt    time.Time        `json:"resetPasswordExpiresAt"`
    VerificationToken         int              `json:"verificationToken"`  // Changed to *int
    VerificationTokenExpiresAt time.Time       `json:"verificationTokenExpiresAt"`
    OtherDetails             sql.NullString    `json:"otherDetails"`
    OtherDetailsJSON         json.RawMessage   `json:"otherDetails,omitempty"`
    CreatedAt                time.Time         `json:"createdAt"`
    UpdatedAt                time.Time         `json:"updatedAt"`
}

// UserInput represents the input for creating a user
type UserInput struct {
	Username     string   `json:"username"`
	Email        string   `json:"email"`
	Phone        string   `json:"phone"`
	Role         UserRole `json:"role"`
	PasswordHash string   `json:"-"`
	Token        string   `json:"token"`
	IDNumber     float64  `json:"idNumber"`
}

// UpdateUserInput represents the input for updating a user
type UpdateUserInput struct {
	Username *string   `json:"username"`
	Email    *string   `json:"email"`
	Phone    *string   `json:"phone"`
	Role     *UserRole `json:"role"`
	IsActive *bool     `json:"isActive"`
	IDNumber *float64  `json:"idNumber"`
	OtherDetails *map[string]interface{} `json:"otherDetails"`
	IsVerified            bool              `json:"isVerified"`
	ResetPasswordToken    string            `json:"resetPasswordToken"`
	ResetPasswordExpiresAt time.Time        `json:"resetPasswordExpiresAt"`
	VerificationToken     int            `json:"verificationToken"`
	VerificationTokenExpiresAt time.Time    `json:"verificationTokenExpiresAt"`

}

type UpdateUserTokenInput struct {
	ID    int    `json:"id"`
	Token string `json:"token"`
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
    var verificationTokenNull sql.NullInt64  // Temporary variable to hold the scanned value

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
        &user.IsVerified,
        &user.IDNumber,
        &user.LastLogin,
        &user.ResetPasswordToken,
        &user.ResetPasswordExpiresAt,
        &verificationTokenNull,  // Scan into temporary variable
        &user.VerificationTokenExpiresAt,
        &user.OtherDetails,
        &user.CreatedAt,
        &user.UpdatedAt,
    )

    // Handle OtherDetails JSON conversion
    if user.OtherDetails.Valid {
        user.OtherDetailsJSON = json.RawMessage(user.OtherDetails.String)
    } else {
        user.OtherDetailsJSON = nil
    }

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
		&user.IsActive,
		&user.Token,
		&user.IsVerified,
		&user.IDNumber,
		&user.LastLogin,
		&user.ResetPasswordToken,
		&user.ResetPasswordExpiresAt,
		&user.VerificationToken,
		&user.VerificationTokenExpiresAt,
		&user.OtherDetails,
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
		&user.IsVerified,
		&user.IDNumber,
		&user.LastLogin,
		&user.ResetPasswordToken,
		&user.ResetPasswordExpiresAt,
		&user.VerificationToken,
		&user.VerificationTokenExpiresAt,
		&user.OtherDetails,
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
			&user.IsVerified,
			&user.IDNumber,
			&user.LastLogin,
			&user.ResetPasswordToken,
			&user.ResetPasswordExpiresAt,
			&user.VerificationToken,
			&user.VerificationTokenExpiresAt,
			&user.OtherDetails,
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
    var verificationTokenNull sql.NullInt64 // Temporary variable to hold the scanned value

    // Query the database and scan results
    err := s.db.QueryRowContext(ctx,
        `SELECT * FROM update_user($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
        id,
        input.Username,
        input.Email,
        input.Phone,
        input.Role,
        input.IsActive,
        input.IDNumber,
        input.OtherDetails,
        input.IsVerified,
        input.ResetPasswordToken,
        input.ResetPasswordExpiresAt,
        input.VerificationToken,
        input.VerificationTokenExpiresAt,
    ).Scan(
        &user.ID,
        &user.Username,
        &user.Email,
        &user.Phone,
        &user.Role,
        &user.IsActive,
        &user.Token,
        &user.IsVerified,
        &user.IDNumber,
        &user.LastLogin,
        &user.ResetPasswordToken,
        &user.ResetPasswordExpiresAt,
        &verificationTokenNull, // Use the NullInt64 variable here
        &user.VerificationTokenExpiresAt,
        &user.OtherDetails,
        &user.CreatedAt,
        &user.UpdatedAt,
    )

    if err == sql.ErrNoRows {
        return nil, errors.New("user not found")
    }
    if err != nil {
        return nil, err
    }

    // Convert verification token from sql.NullInt64 to *int
    if verificationTokenNull.Valid {
		user.VerificationToken = int(verificationTokenNull.Int64) // Convert int64 to int and assign directly
	} else {
		user.VerificationToken = 0 // Assign a default value if you need one, or use another approach to handle the absence of a token
	}

    fmt.Printf("success: verification token successfully converted to int: %v\n", user.VerificationToken)

    // Handle OtherDetails JSON conversion
    if user.OtherDetails.Valid {
        user.OtherDetailsJSON = json.RawMessage(user.OtherDetails.String)
    } else {
        user.OtherDetailsJSON = nil
    }

    return &user, err
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

// UpdateUserToken updates the user token.
func (s *UserService) UpdateUserToken(ctx context.Context, input UpdateUserTokenInput) (*User, error) {
	fmt.Println("calling the updateusertoken function")
	var user User
	var verificationTokenNull sql.NullInt64
	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM update_user_token($1, $2)`,
		input.ID,
		input.Token,
	).Scan(
		&user.ID,
		&user.Username,
		&user.Email,
		&user.Phone,
		&user.Role,
		&user.IsActive,
		&user.Token,
		&user.IsVerified,
		&user.IDNumber,
		&user.LastLogin,
		&user.ResetPasswordToken,
		&user.ResetPasswordExpiresAt,
		&verificationTokenNull,
		&user.VerificationTokenExpiresAt,
		&user.OtherDetails,
		&user.CreatedAt,
		&user.UpdatedAt,
	)

	if verificationTokenNull.Valid {
		user.VerificationToken = int(verificationTokenNull.Int64) // Convert int64 to int and assign directly
	} else {
		user.VerificationToken = 0 // Assign a default value if you need one, or use another approach to handle the absence of a token
	}

	if err == sql.ErrNoRows {
		return nil, errors.New("user not found")
	}
	if err != nil {
		return nil, err
	}
	return &user, nil
}