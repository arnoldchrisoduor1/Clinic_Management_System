"use client"

import { useState } from "react";

export const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <header className="flex py-1 w-[60%] m-auto sticky z-10 top-0">
      <div className="mt-3 mr-3 px-2 flex items-center justify-center">MEDICARE</div>
      <div className="border border-gray-400 rounded-full mt-4 flex items-center justify-center gap-20">
        <nav className="flex flex-row gap-10">
          <a
            href="#"
            className={`hover:bg-gray-100 px-3 py-1 rounded-full transition duration-300 ease-in-out ${
              activeTab === "home" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleTabClick("home")}
          >
            Home
          </a>
          <a
            href="#"
            className={`hover:bg-gray-200 px-3 py-1 rounded-full transition duration-300 ease-in-out ${
              activeTab === "sponsors" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleTabClick("sponsors")}
          >
            Sponsors
          </a>
          <a
            href="#"
            className={`hover:bg-gray-200 px-3 py-1 rounded-full transition duration-300 ease-in-out ${
              activeTab === "pricing" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleTabClick("pricing")}
          >
            Pricing
          </a>
          <a
            href="#"
            className={`hover:bg-gray-200 px-3 py-1 rounded-full transition duration-300 ease-in-out ${
              activeTab === "developers" ? "bg-black text-white" : ""
            }`}
            onClick={() => handleTabClick("developers")}
          >
            Developers
          </a>
        </nav>
      </div>
    <div className="mt-3 ml-3 border rounded-full px-2 bg-black text-white flex items-center justify-center">
        <button>Join Waitlist</button>
    </div>
    </header>
  );
};
