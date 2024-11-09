package resolvers

import (
	"HealthCareSystem/services"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{
	userService *services.UserService
	RoleService *services.RoleService
}

func NewResolver(userService *services.UserService, roleService *services.RoleService) *Resolver {
	return &Resolver{
		userService: userService,
		RoleService: roleService,
	}
}
