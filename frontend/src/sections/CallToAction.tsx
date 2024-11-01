"use client"
import React, { useState } from 'react';

const CallToAction = () => {

    const [text, setText] = useState("");

  return (
    <section className="bg-black py-20">
      <div className="bg-customGray curved-rectangle py-10">
        <div className="container flex flex-col align-center justify-center ">
        <h2 className="text-5xl md:text-6xl text-center text-black tracking-tighter font-medium py-5">
          Talk to Us
        </h2>
          <div className="border border-slate-400 rounded-lg md:max-w-[40rem] self-center">
            {/* will hold the entire thing */}
            <div className='flex flex-end justify-between relative'>
                <div className='flex flex-col gap-3 flex-start px-10 py-10 w-1/2 md:w-2/3'>
                    <p className="font-semibold font-merienda">Hello there, my name is: <input type="text" className="bg-transparent placeholder:underline-offset-8 border-none outline-none" placeholder="your name"/></p>
                    <p className="font-semibold font-merienda mb-2">and im looking for ...</p>
                    <textarea className="border-b border-black bg-transparent outline-none resize-none h-44 w-72"
                    defaultValue="small description"
                    onChange={(e) => setText(e.target.value)}
                    >
                    </textarea>
                    <p className="font-semibold font-merienda">You can reach me at: <input type="email" className="bg-transparent placeholder:underline-offset-8 border-none outline-none" placeholder="your email"/></p>
                    <button className='bg-black text-white rounded-full w-44 py-2 hover:scale-105 transition duration-300 ease-in-out'>Send</button>
                </div>
                <div className='flex-1 bg-black rounded-tr-lg rounded-br-lg'>
                    
                </div>
                <div className='absolute flex flex-col gap-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ml-16 md:ml-40 md:mt-36 rounded-lg'>
                    <div className='text-white bg-[linear-gradient(to_bottom_left,gray,black)] py-2 px-2 font-merienda hover:scale-105 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center'>+254 791 165 995</div>
                    <div className='text-white bg-[linear-gradient(to_bottom_left,gray,black)] py-2 px-2 font-merienda hover:scale-105 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center'>arnoldchrisoduor@gmail.com</div>
                    <div className='text-white bg-[linear-gradient(to_bottom_left,gray,black)] py-2 px-2 font-merienda hover:scale-105 transition duration-300 ease-in-out cursor-pointer rounded-lg text-center'>Kenya, Central, Nairobi</div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
