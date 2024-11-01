"use client"

import bg from "../../public/images/background-3.jpg";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on tab click
  };

  return (
    <header
      className="h-[1px] w-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="flex items-center justify-center fixed left-1/2 transform -translate-x-1/2 top-5 lg:w-[55%] md:w-[85%] m-auto z-10 bg-white bg-opacity-50 backdrop-blur-md rounded-full shadow-lg">
        <div className="my-2 mr-3 px-2 flex items-center justify-center">MEDICARE</div>
        <div className="hidden sm:flex border border-gray-400 rounded-full my-4 flex items-center justify-center lg:gap-20">
          <nav className="flex flex-row gap-10 md:gap-5">
            {["home", "sponsors", "pricing", "developers"].map((tab) => (
              <a
                key={tab}
                href="#"
                className={`hover:bg-gray-100 px-3 py-1 rounded-full transition duration-300 ease-in-out ${
                  activeTab === tab ? "bg-black text-white" : ""
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </a>
            ))}
          </nav>
        </div>
        <div className="my-2 ml-3 border rounded-full px-2 bg-black text-white flex items-center justify-center">
          <button>Join Waitlist</button>
        </div>
        <button
          className="sm:hidden ml-4 p-2 text-black"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-20 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white p-6 shadow-lg z-30">
            <button className="mb-6 text-black" onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
            <nav className="flex flex-col gap-4">
              {["home", "sponsors", "pricing", "developers"].map((tab) => (
                <a
                  key={tab}
                  href="#"
                  className={`px-3 py-2 rounded transition duration-300 ease-in-out ${
                    activeTab === tab ? "bg-black text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};
