import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="container mt-20 flex items-center justify-center max-h-screen">
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl text-center">
          <h1 className="">
            Transforming the <span className="font-merienda">Medical</span> <br /> <span className="font-dancingsemibold">Industry</span> with AI
          </h1>
        </div>
        <div className="border border-gray-400 rounded-full mt-10">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
