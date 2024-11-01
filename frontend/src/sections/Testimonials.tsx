"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import avatar1 from "../../public/assets/avatar-1.png"
import avatar2 from "../../public/assets/avatar-2.png"
import avatar3 from "../../public/assets/avatar-3.png"
import avatar4 from "../../public/assets/avatar-4.png"

const testimonials = [
    {
      text: "“This product has completely transformed how I manage my patients and orders”",
      name: "Sophia Perez",
      title: "Director @ Quantum",
      avatarImg: avatar1,
    },
    {
      text: "“These AI tools have completely revolutionized our Medicalstrategy overnight”",
      name: "Jamie Lee",
      title: "Founder @ Pulse",
      avatarImg: avatar2,
    },
    {
      text: "“The user interface is so intuitive and easy to use, it has saved us countless hours”",
      name: "Alisa Hester",
      title: "Product @ Innovate",
      avatarImg: avatar3,
    },
    {
      text: "“Our Hospital's productivity has increased significantly since we started using this tool”",
      name: "Alec Whitten",
      title: "CTO @ Tech Solutions",
      avatarImg: avatar4,
    },
  ];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-24 bg-black">
    <div className="container">
      <h2 className="text-5xl md:text-6xl text-center text-white tracking-tighter font-medium">
        Beyond Expectations
      </h2>
      <p className="text-white text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
        Our revolutionary AI Medical tools have transformed our clients'
        productivity
      </p>
      <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
      <motion.div 
      initial={{
        translateX: '-50%'
      }}
      animate={{
        translateX: '0',
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 30,
      }}
      className="flex gap-5 pr-5 flex-none">
      {[...testimonials].map((testimonial) => (
        <div
          key={testimonial.name}
          className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,gray,black)] max-w-xs md:max-w-md flex-none text-white"
        >
          <div className="text-lg md:text-2xl tracking-tight">{testimonial.text}</div>
          <div className="flex items-center gap-3 mt-5">
            <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[rgb(91,124,194)] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-lg">
              <Image
                src={testimonial.avatarImg}
                alt={`Avatar for ${testimonial.avatarImg}`}
                className="h-11 w-11 rounded-lg grayscale"
              />
            </div>
            <div className="text-white">
              <div>{testimonial.name}</div>
              <div className="text-white/50 text-sm">{testimonial.title}</div>
            </div>
          </div>
        </div>
      ))}
      </motion.div>
      </div>
    </div>
  </section>
  )
}

export default Testimonials;