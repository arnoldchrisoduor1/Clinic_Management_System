// Example GraphQL resolver usage
type Resolver struct {
    userService *services.UserService
    roleService *services.RoleService
}

func (r *Resolver) CreateUser(ctx context.Context, args struct{ Input services.UserInput }) (*services.User, error) {
    return r.userService.CreateUser(ctx, args.Input)
}

func (r *Resolver) UpdateUserRole(ctx context.Context, args struct {
    UserID int
    RoleName string
}) (*services.User, error) {
    role, err := r.roleService.GetRoleByName(ctx, args.RoleName)
    if err != nil {
        return nil, err
    }

    return r.userService.UpdateUser(ctx, args.UserID, services.UpdateUserInput{
        Role: &role.Name,
    })
}