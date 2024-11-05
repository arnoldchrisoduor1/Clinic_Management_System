"use client";

import { Header } from "@/sections/Header";
import Hero from "@/sections/Hero";
import bg from '../../public/images/background-3.jpg';
import LogoTicker from "@/sections/LogoTicker";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";
import CallToAction from "@/sections/CallToAction";
import { ChevronUp } from "lucide-react"; // Arrow icon from Lucide
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.getElementById("hero")?.offsetHeight || 0;
      setShowScrollTop(window.scrollY > heroHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="sm:h-[85vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] bg-cover bg-no-repeat bg-center relative"
        style={{
          backgroundImage: `url(${bg.src})`
        }}
        id="home"
      >
        <Header />
        <div id="hero">
          <Hero />
        </div>
      </div>
      <LogoTicker />
      <Pricing />
      {/* <Features /> */}
      <Testimonials />
      <CallToAction />
      <Footer />

      {/* Scroll to Top Arrow with Bounce Animation */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed border border-slate-400 bottom-5 right-5 p-2 bg-black bg-opacity-50 backrop-blur-md text-white rounded-md shadow-lg hover:bg-gray-800 transition duration-300"
          aria-label="Scroll to top"
          initial={{ y: 0 }}
          animate={{
            y: [0, -20, 0]  // Bounce effect (up and down)
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          }}
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </>
  );
}
