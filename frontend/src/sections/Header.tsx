"use client";
import bg from "../../public/images/background-3.jpg";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on tab click
  };

  const sidebarVariants = {
    hidden: { x: "100%" }, // Start off-screen
    visible: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { x: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.1, duration: 0.3 },
    }),
  };

  return (
    <header
      className="h-[1px] w-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="flex items-center justify-center fixed left-1/2 transform -translate-x-1/2 top-5 sm:w-[85%] md:w-[85%] lg:w-[65%] xl:w-[55%] m-auto z-10 bg-white bg-opacity-50 backdrop-blur-md rounded-full shadow-lg">
        <div className="my-2 md:mr-3 px-2 flex items-center justify-center sm:mr-2 font-bold">
          MEDICARE
        </div>

        {/* Main Navbar - Hidden on small screens */}
        <div className="max-sm:hidden sm:flex border border-gray-400 rounded-full my-4 flex items-center justify-center lg:gap-20">
          <nav className="sm:hidden md:flex flex-row gap-10 md:gap-5">
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

        {/* Mobile Menu Button - Only visible on small screens */}
        <button
          className="sm:block md:hidden ml-4 p-2 text-black"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar - Only visible on small screens */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div className="lg:hidden fixed inset-0 z-20 flex" initial="hidden" animate="visible" exit="exit">
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>

            {/* Sidebar Content */}
            <motion.div
              className="fixed top-0 right-0 h-full w-2/4 max-w-xs p-6 shadow-lg z-30"
              style={{
                backgroundImage: `url(${bg.src})`,
              }}
              variants={sidebarVariants}
            >
              <button className="mb-6 text-black" onClick={() => setSidebarOpen(false)}>
                <X />
              </button>
              <nav className="flex flex-col gap-4">
                {["home", "sponsors", "pricing", "developers"].map((tab, index) => (
                  <motion.a
                    key={tab}
                    href="#"
                    className={`px-3 py-2 rounded transition duration-300 ease-in-out ${
                      activeTab === tab ? "bg-black text-white" : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleTabClick(tab)}
                    custom={index}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
