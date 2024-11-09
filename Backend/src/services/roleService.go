// services/role_service.go

package services

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"time"
)

// Role represents the role model
type Role struct {
    ID          int                    `json:"id"`
    Name        string                 `json:"name"`
    Permissions map[string]interface{} `json:"permissions"`  // Changed to map for compatibility with gqlgen
    CreatedAt   time.Time              `json:"createdAt"`
    UpdatedAt   time.Time              `json:"updatedAt"`
}

type RoleInput struct {
    Name        string                 `json:"name"`
    Permissions map[string]interface{} `json:"permissions"`  // Changed to map for compatibility with gqlgen
}

// RoleService handles role-related business logic
type RoleService struct {
	db *sql.DB
}

// NewRoleService creates a new role service instance
func NewRoleService(db *sql.DB) *RoleService {
	return &RoleService{db: db}
}

// CreateRole creates a new role
func (s *RoleService) CreateRole(ctx context.Context, input RoleInput) (*Role, error) {
    var role Role
    var permissionsBytes []byte

    // Serialize the permissions map to JSON
    permissionsJSON, err := json.Marshal(input.Permissions)
    if err != nil {
        log.Printf("Error serializing permissions: %v", err)
        return nil, err
    }

    // Execute the query with serialized permissions
    err = s.db.QueryRowContext(ctx,
        `SELECT * FROM create_role($1, $2)`,
        input.Name,
        permissionsJSON,
    ).Scan(
        &role.ID,
        &role.Name,
        &permissionsBytes, // Scan into []byte first
        &role.CreatedAt,
        &role.UpdatedAt,
    )

    if err != nil {
        log.Printf("Error executing query: %v", err)
        return nil, fmt.Errorf("could not add role to db: %w", err)
    }

    // Unmarshal the permissions bytes into the map
    if err := json.Unmarshal(permissionsBytes, &role.Permissions); err != nil {
        log.Printf("Error unmarshaling permissions: %v", err)
        return nil, fmt.Errorf("could not unmarshal permissions: %w", err)
    }

    return &role, nil
}

// GetRoleByID retrieves a role by its ID
func (s *RoleService) GetRoleByID(ctx context.Context, id int) (*Role, error) {
	var role Role

	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM get_role_by_id($1)`,
		id,
	).Scan(
		&role.ID,
		&role.Name,
		&role.Permissions,
		&role.CreatedAt,
		&role.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("role not found")
	}
	if err != nil {
		return nil, err
	}

	return &role, nil
}

// GetRoleByName retrieves a role by its name
func (s *RoleService) GetRoleByName(ctx context.Context, name string) (*Role, error) {
	var role Role

	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM get_role_by_name($1)`,
		name,
	).Scan(
		&role.ID,
		&role.Name,
		&role.Permissions,
		&role.CreatedAt,
		&role.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("role not found")
	}
	if err != nil {
		return nil, err
	}

	return &role, nil
}

// GetAllRoles retrieves all roles
func (s *RoleService) GetAllRoles(ctx context.Context) ([]*Role, error) {
	rows, err := s.db.QueryContext(ctx, `SELECT * FROM get_all_roles()`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var roles []*Role
	for rows.Next() {
		var role Role
		err := rows.Scan(
			&role.ID,
			&role.Name,
			&role.Permissions,
			&role.CreatedAt,
			&role.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		roles = append(roles, &role)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return roles, nil
}

// UpdateRole updates an existing role
func (s *RoleService) UpdateRole(ctx context.Context, id int, input RoleInput) (*Role, error) {
	var role Role

	err := s.db.QueryRowContext(ctx,
		`SELECT * FROM update_role($1, $2, $3)`,
		id,
		input.Name,
		input.Permissions,
	).Scan(
		&role.ID,
		&role.Name,
		&role.Permissions,
		&role.CreatedAt,
		&role.UpdatedAt,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("role not found")
	}
	if err != nil {
		return nil, err
	}

	return &role, nil
}

// DeleteRole deletes a role
func (s *RoleService) DeleteRole(ctx context.Context, id int) (bool, error) {
	var deleted bool
	err := s.db.QueryRowContext(ctx,
		`SELECT delete_role($1)`,
		id,
	).Scan(&deleted)

	if err != nil {
		return false, err
	}

	return deleted, nil
}

// RoleExists checks if a role exists by name
func (s *RoleService) RoleExists(ctx context.Context, name string) (bool, error) {
	var exists bool
	err := s.db.QueryRowContext(ctx,
		`SELECT role_exists_by_name($1)`,
		name,
	).Scan(&exists)

	if err != nil {
		return false, err
	}

	return exists, nil
}