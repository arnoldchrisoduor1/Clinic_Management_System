// stores/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: null,
    users: [], // To store the list of users
    isAuthenticated: false,
    error: null,
    isLoading: false,

    setUser: (user) => set({ user }),
    setUsers: (users) => set({ users }), // New setter for users
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),
}));

export default useAuthStore;
