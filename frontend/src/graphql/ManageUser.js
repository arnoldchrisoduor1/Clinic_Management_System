// components/ManageUser.js
import { gql, useQuery, useMutation } from '@apollo/client';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

// GraphQL Mutations and Queries
const SIGN_IN_USER = gql`
    mutation SignInUser($input: SignInInput!) {
        signInUser(input: $input) {
            id
            username
            email
            phone
            isActive
            role
            createdAt
            updatedAt
        }
    }
`;

const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            username
            email
            phone
            role
            isActive
            createdAt
            updatedAt
        }
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $input: updateUserInput!) {
        updateUser(id: $id, input: $input) {
            id
            username
            email
            phone
            isActive
            role
            createdAt
            updatedAt
        }
    }
`;

const USERS_COUNT = gql`
    query {
        usersCount
    }
`;

const GET_USERS = gql`
    query GetUsers($limit: Int, $offset: Int) {
        users(limit: $limit, offset: $offset) {
            id
            username
            email
            phone
            isActive
            role
            createdAt
            updatedAt
        }
    }
`;

const USER_BY_EMAIL = gql`
    query UserByEmail($email: String!) {
        userByEmail(email: $email) {
            id
            username
            email
            phone
            isActive
            role
            createdAt
            updatedAt
        }
    }
`;

// User Management Functions
const useManageUser = () => {
    const { setUser, setIsAuthenticated, setError, setUsers } = useAuthStore();

    const [signInUserMutation, { loading: signInLoading }] = useMutation(SIGN_IN_USER, {
        onCompleted: (data) => {
            setUser(data.signInUser);
            setIsAuthenticated(true);
            setError(null); // Clear any previous errors
        },
        onError: (error) => {
            console.error('Sign in error:', error);
            setError(error.message);
        }
    });

    // create user mutation.
    const [createUserMutation, { loading: createLoading }] = useMutation(CREATE_USER, {
        onCompleted: (data) => {
            console.log("User created:", data);
            setUser(data.createUser);
            setError(null); // Clear any previous errors
        },
        onError: (error) => {
            console.error('Create user error:', error);
            setError(error.message);
        }
    });

    // Update user mutation
    const [updateUserMutation] = useMutation(UPDATE_USER, {
        onCompleted: (data) => {
            setUser(data.updateUser); // Update Zustand store with updated user data
        },
        onError: (error) => {
            setError(error.message); // Set error in Zustand store
        },
    });

    // Users count query
    const { data: usersCountData } = useQuery(USERS_COUNT);

    // Get users query
    const { data: usersData } = useQuery(GET_USERS, {
        variables: { limit: 5, offset: 0 },
        onCompleted: (data) => {
            setUsers(data.users); // Update Zustand store with user list
        },
    });

    // User by email query
    const { data: userByEmailData } = useQuery(USER_BY_EMAIL, {
        variables: { email: "test1@gmail.com" },
    });


    // ============================================ HANDLERS ================================


    // Handlers for user-related actions
    const handleSignIn = async (input) => {
        try {
            console.log("Signing in with:", input);
            const response = await signInUserMutation({
                variables: { 
                    input: {
                        email: input.email,
                        password: input.password
                    }
                }
            });
    
            // Check for errors in the GraphQL response
            if (response.errors && response.errors.length > 0) {
                console.error("Sign in error:", response.errors);
                toast.error(response.errors[0].message || "Error Signing In");
                throw new Error(response.errors[0].message); // Rethrow for additional handling if needed
            }
    
            // If no errors, show success toast
            console.log("Sign in response:", response);
            toast.success("Sign In Successful.");
            return response;
    
        } catch (errors) {
            console.error("Sign in error:", errors);
            // toast.error("Error Signing In");
            throw errors;
        }
    };
    


    const handleCreateUser = async (input) => {
        // TODO: Solve for error 422
        try {
            console.log("Creating user with:", input);
            const response = await createUserMutation({
                variables: { 
                    input: {
                        username: input.username,
                        email: input.email,
                        phone: input.phone,
                        role: input.role,
                        password: input.password
                    }
                }
            });
            // checking for errrors in the GraphQL response.
            if (response.errors && response.errors.length > 0) {
                console.error("Create user error: ", response.errors);
                toast.error(response.errors[0].message || "Error Creating Account")
                throw new Error(response.errors[0].message);
            }

            // if no errors return success toast.
            console.log("Create user in response:", response);
            toast.success("Account Created Successfully");
            return response;
        } catch (error) {
            console.error("Create user error:", error);
            // toast.error("Errir creating an account.")
            throw error;
        }
    };

    const handleUpdateUser = async (id, input) => {
        try {
            console.log("Updating user details with: ", id, input);
            const response = await updateUserMutation({ variables: { id, input } });
            console.log("Updated user: ", response);
            toast.success("Account Updated Successfully");
            return response;
        } catch(error) {
            toast.error("Error Updating Details");
            throw error;
        }
    };

    return {
        handleSignIn,
        handleCreateUser,  // Export the create user function
        handleUpdateUser,
        usersCount: usersCountData?.usersCount,
        users: usersData?.users,
        userByEmail: userByEmailData?.userByEmail,
    };
};

export default useManageUser;
