"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {  motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Hero = () => {

  const [ ref1, inView1 ] = useInView({ threshold: 0.1 });
  const [ ref2, inView2 ] = useInView({ threshold: 0.1 });

  return (
    <section className="container sm:mt-32 md:mt-56 lg:mt-32 xl:mt-56 flex items-center justify-center max-h-screen">
      <div className="flex flex-col items-center justify-center">
        <motion.div className="text-6xl text-center"
        ref={ref1}
        initial={{ opacity: 0, y:30 }}
        animate={inView1 ? { opacity: 1, y:0 }: {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="xl:text-7xl">
            Transforming the <span className="font-merienda">Medical</span> <br /> <span className="font-dancingsemibold">Industry</span> with AI
          </h1>
        </motion.div>
        <motion.div className="border border-gray-400 rounded-full mt-10 xl:mt-20"
        ref={ref2}
        initial={{ opacity: 0, y: 30 }}
        animate={inView2 ? { opacity: 1, y: 0 }: {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <input
            type="email"
            placeholder="Enter Email"
            className="py-2 bg-transparent focus:outline-none pl-2"
          />
          <button className="bg-black text-white rounded-full px-2 py-2">
            <div className="flex flex-row align items-center gap-2">
              <span>Get Started</span>
              <ArrowUpRight size={17} />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
