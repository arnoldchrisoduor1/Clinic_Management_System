"use client";
import { motion } from "framer-motion";
import Image from "next/image";

import avatar1 from "../../public/assets/avatar-1.png"
import avatar2 from "../../public/assets/avatar-2.png"
import avatar3 from "../../public/assets/avatar-3.png"
import avatar4 from "../../public/assets/avatar-4.png"

const testimonials = [
  {
    text: "“This platform has significantly improved our workflow and patient care management.”",
    name: "Olivia Johnson",
    title: "Chief Operating Officer @ HealthSync",
    avatarImg: avatar1,
  },
  {
    text: "“The innovative solutions provided by this software have accelerated our service delivery remarkably.”",
    name: "Brian Smith",
    title: "Co-Founder @ MedTech Innovations",
    avatarImg: avatar2,
  },
  {
    text: "“The streamlined design of the application makes it a breeze to navigate, saving us so much time.”",
    name: "Melissa Brown",
    title: "Lead Designer @ UserFirst",
    avatarImg: avatar3,
  },
  {
    text: "“Our clinic's efficiency has soared since we integrated this solution into our operations.”",
    name: "Jose Martinez",
    title: "Vice President @ CareSolutions",
    avatarImg: avatar4,
  },
];


const Testimonials = () => {
  return (
    <section className="py-20 md:py-24 bg-black" id="testimonials">
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
          <div className="flex items-center gap-3 mt-5 self-end">
            {/* <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[rgb(91,124,194)] after:mix-blend-soft-light before:content-[''] before:absolute before:inset-0 before:border before:border-white/30 before:z-10 before:rounded-full"> */}
              <img
                src={testimonial.avatarImg.src}
                width={20}
                height={20}
                alt={`Avatar for ${testimonial.avatarImg}`}
                className="h-11 w-11 rounded-full"
              />
            {/* </div> */}
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