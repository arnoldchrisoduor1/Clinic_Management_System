"use client"
import React, { useState } from 'react';
import { Contact } from 'lucide-react';
import { X } from 'lucide-react';
import bg from "../../public/images/background-3.jpg";
import {  motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CallToAction = () => {

  const [ ref1, inView1 ] = useInView({threshold: 0.1});
  const [ ref2, inView2 ] = useInView({threshold: 0.1});
  const [ ref3, inView3 ] = useInView({threshold: 0.1});

    const [text, setText] = useState("");
    const [ contact, setContact ] = useState(false);
    
    const contactFunc = () => {
      setContact(!contact);
    }

  return (
    <section className="bg-black py-20">
      <div className="bg-customGray curved-rectangle py-10">
        <div className="container flex flex-col align-center justify-center ">
        <h2 className="text-5xl md:text-6xl text-center text-black tracking-tighter font-medium py-5">
          Talk to Us
        </h2>
          <motion.div className="border border-slate-400 rounded-lg lg:w-full md:max-w-[40rem] self-center"
          ref={ref1}
        initial={{ opacity:0, y:30 }}
        animate={inView1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* will hold the entire thing */}
            <div className='flex flex-end justify-between relative'>
              <motion.div className='absolute p-2 right-0 flex flex-col'>
                <div className='bg-black md:border p-2 rounded-full self-end cursor-pointer'
                onClick={() => contactFunc()}
                >{
                  contact == false ?
                  <Contact style={{ color: 'white' }}/>
                  :
                  <X style={{ color: 'white' }}/>
                }
                </div>
                {
                  contact == true ? 
                  <motion.div className='p-2 mt-2 rounded-md'
                style={{
                  backgroundImage: `url(${bg.src})`,
                }}
                ref={ref3}
                initial={{ opacity:0, y:30 }}
                    animate={inView3 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <p className='text-black font-semibold'>arnoldchrisoduor@gmail.com</p>
                  <p className='text-black font-semibold'>+254 791 165 995</p>
                  <p className='text-black font-semibold'>@arnoldOduor</p>
                </motion.div>
                :
                ""
                }
              </motion.div>
                <div className='flex flex-col gap-3 flex-start px-10 py-10 lg:w-1/2 md:w-2/3'>
                    <p className="font-semibold font-merienda">Hello there, my name is: <input type="text" className="bg-transparent placeholder:underline-offset-8 border-none outline-none" placeholder="your name"/></p>
                    <p className="font-semibold font-merienda mb-2">and im looking for ...</p>
                    <textarea className="border-b border-black bg-transparent outline-none resize-none h-24 w-72"
                    defaultValue="small description"
                    onChange={(e) => setText(e.target.value)}
                    >
                    </textarea>
                    <p className="font-semibold font-merienda">You can reach me at: <input type="email" className="bg-transparent placeholder:underline-offset-8 border-none outline-none" placeholder="your email"/></p>
                    <motion.button className='bg-black text-white rounded-full w-44 py-2 hover:scale-105 transition hover:text-white/70 duration-300 ease-in-out'
                    ref={ref2}
                    initial={{ opacity:0, y:30 }}
                    animate={inView2 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    >Send</motion.button>
                </div>
                <div className='flex-1 bg-black rounded-tr-lg rounded-br-lg'>
                    
                </div>
                <div className='absolute flex flex-col gap-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:ml-16 md:ml-40 md:mt-36 lg:-mt-2 rounded-lg sm:hidden'>
                    <div className='text-white bg-[linear-gradient(to_bottom_left,gray,black)] py-2 px-2 font-merienda hover:scale-105 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center'>+254 791 165 995</div>
                    <div className='text-white bg-[linear-gradient(to_bottom_left,gray,black)] py-2 px-2 font-merienda hover:scale-105 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center'>arnoldchrisoduor@gmail.com</div>
                    <div className='text-white bg-[linear-gradient(to_bottom_left,gray,black)] py-2 px-2 font-merienda hover:scale-105 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center'>Kenya, Central, Nairobi</div>
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
