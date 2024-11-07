import { create } from 'zustand';

interface GlobalState {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
    setIsSidebarCollapsed: (isCollapsed: boolean) => void;
    setIsDarkMode: (isDarkMode: boolean) => void;
}

const useGlobalStore = create<GlobalState>((set) => ({
    // Initial state
    isSidebarCollapsed: false,
    isDarkMode: false,

    // Actions to update the state
    setIsSidebarCollapsed: (isCollapsed: boolean) =>
        set(() => ({ isSidebarCollapsed: isCollapsed })),
        
    setIsDarkMode: (isDarkMode: boolean) =>
        set(() => ({ isDarkMode })),
}));

export default useGlobalStore;
