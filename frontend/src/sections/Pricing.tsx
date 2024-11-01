import { CircleCheck } from "lucide-react";

const Pricing = () => {
  return (
    <section className="bg-customGray py-20">
        <h2 className="text-5xl md:text-6xl text-center text-black tracking-tighter font-medium">
        Pricing
      </h2>
      <p className="text-black text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
        Our revolutionary AI Medical tools have transformed our clients'
        productivity
      </p>

      <div className="container flex lg:flex-row md:flex-col flex-1 lg:items-end md:items-center align-center justify-center gap-10 py-20">

        {/* Basic Package */}
        <div className=" bg-white/70 border border-slate-300 hover:border-slate-400 hover:scale-105 transition duration-300 ease-in-out lg:py-8 md:py-12 px-8 rounded-xl flex flex-col align-center justify-center cursor-pointer lg:max-w-[40rem] md:max-w-[32rem]">
          <div className="text-center lg:gap-3 md:gap-10">
            <div>
              <h3 className="text-3xl border rounded-full border-slate-300 mb-6">
                Starter
              </h3>
              <div className="my-4">
                <p className="font-extrabold md:text-3xl">$2,000</p>
              </div>
              <p className="mb:text-2xl">Suitable for small clinics</p>
            </div>
          </div>
          <div>
            <ul className="lg:my-6 md:py-10">
            <li className="flex flex-row my-3 md:my-6 md:text-2xl">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Local Data storage 
              </li>
              <li className="flex flex-row my-3 md:my-6 md:text-2xl">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Unlimited Security updates.
              </li>
              <li className="flex flex-row my-3 md:my-6 md:text-2xl">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Automated data input system with *AI.
              </li>
            </ul>
          </div>
          <div className="py-3 mx-auto">
            <button className="bg-black text-white/70 rounded-full lg:px-6 md:px-16 lg:py-1 md:py-2 hover:text-white md:text-xl">
              Purchase
            </button>
          </div>
        </div>

        {/* Premium Package */}
        <div className="border border-white/15 p-6 md:p-10 bg-[linear-gradient(to_bottom_left,gray,black)] text-white border-slate-300 hover:border-slate-400 hover:scale-110 transition duration-300 ease-in-out py-8 px-8 rounded-xl flex flex-col align-center justify-center cursor-pointer lg:max-w-[40rem]">
          <div className="text-center gap-3">
            <div>
              <h3 className="lg:text-3xl md:text-4xl">Premium</h3>
              <div className="my-4">
              <p className="font-extrabold lg:text-2xl md:text-3xl">$4,500</p>
            </div>
              <p className="md:text-2xl">Recommended for medium to large institutions</p>
            </div>
          </div>
          <div>
            <ul className="lg:my-6 md:py-10 md:text-2xl">
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600 " /> Local and Cloud Data storage 
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600 " /> Automated Data Input System with *AI
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600 " /> Real-Time Data Ingestion and Processing
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600 " /> Real Time Disease Prediction.
              </li>
            </ul>
          </div>
          <div className="py-3 mx-auto">
            <button className="bg-white text-black rounded-full lg:px-6 md:px-16 lg:py-1 md:py-2 md:text-xl">
              Purchase
            </button>
          </div>
        </div>

        {/* Enterprise Package */}
        <div className="bg-white/70 border border-slate-300 hover:border-slate-400 hover:scale-105 transition duration-300 ease-in-out py-8 px-8 rounded-xl flex flex-col align-center justify-center cursor pointer lg:max-w-[40rem] md:max-w-[32rem]">
          <div className="text-center gap-3 cursor-pointer">
            <div>
              <h3 className="text-3xl border rounded-full border-slate-300 mb-6">Enterprise</h3>
              <div className="my-4">
              <p className="font-extrabold text-2xl md:text-3xl">$10,000</p>
            </div>
              <p className="text-2xl">Suitable for very large institutions</p>
            </div>
          </div>
          <div>
          <ul className="my-6 md:my-10 md:text-2xl">
          <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Local and Cloud Data storage 
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Unlimited Security updates.
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Automated Data Input System with *AI
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Real-Time Data Ingestion and Processing
              </li>
              <li className="flex flex-row my-3 md:my-6">
                <CircleCheck size={30} className="mr-1 text-green-600" /> Real Time Disease Prediction.
              </li>
            </ul>
          </div>
          <div className="py-3 mx-auto">
          <button className="bg-black text-white/70 rounded-full lg:px-6 md:px-16 lg:py-1 md:py-2 hover:text-white md:text-xl">
              Purchase
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
