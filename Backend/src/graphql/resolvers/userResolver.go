package resolvers

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"strconv"

	"HealthCareSystem/services"
)

// type Resolver struct {
// 	userService *services.UserService
// }

func NewResolver(userService *services.UserService) *Resolver {
	return &Resolver{
		userService: userService,
	}
}

// Query Resolvers

// func (r *Resolver) User(ctx context.Context, id string) (*services.User, error) {
// 	userID, err := strconv.Atoi(id)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return r.userService.GetUserByID(ctx, userID)
// }

func (r *Resolver) UserByEmail(ctx context.Context, email string) (*services.User, error) {
	return r.userService.GetUserByEmail(ctx, email)
}

func (r *Resolver) Users(ctx context.Context, limit *int, offset *int) ([]*services.User, error) {
	l := 10
	o := 0
	if limit != nil {
		l = *limit
	}
	if offset != nil {
		o = *offset
	}
	return r.userService.GetAllUsers(ctx, l, o)
}

func (r *Resolver) UsersCount(ctx context.Context) (int, error) {
	return r.userService.GetUsersCount(ctx)
}

// Mutation Resolvers

func (r *Resolver) CreateUser(ctx context.Context, input services.UserInput) (*services.User, error) {
	// Hash password before storing
	hasher := sha256.New()
	hasher.Write([]byte(input.PasswordHash))
	input.PasswordHash = hex.EncodeToString(hasher.Sum(nil))
	
	return r.userService.CreateUser(ctx, input)
}

func (r *Resolver) UpdateUser(ctx context.Context, id string, input services.UpdateUserInput) (*services.User, error) {
	userID, err := strconv.Atoi(id)
	if err != nil {
		return nil, err
	}
	return r.userService.UpdateUser(ctx, userID, input)
}

func (r *Resolver) UpdatePassword(ctx context.Context, id string, password string) (bool, error) {
	userID, err := strconv.Atoi(id)
	if err != nil {
		return false, err
	}

	// Hash password before updating
	hasher := sha256.New()
	hasher.Write([]byte(password))
	hashedPassword := hex.EncodeToString(hasher.Sum(nil))

	return r.userService.UpdatePassword(ctx, userID, hashedPassword)
}

func (r *Resolver) DeleteUser(ctx context.Context, id string) (bool, error) {
	userID, err := strconv.Atoi(id)
	if err != nil {
		return false, err
	}
	return r.userService.DeleteUser(ctx, userID)
}