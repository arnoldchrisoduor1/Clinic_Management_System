"use client";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import useGlobalStore from "../store/GlobalStore"; // Update this path as needed
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // Access Zustand store for state
  const { isSidebarCollapsed, isDarkMode } = useGlobalStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayout>{children}</DashboardLayout>
  );
};

export default DashboardWrapper;
