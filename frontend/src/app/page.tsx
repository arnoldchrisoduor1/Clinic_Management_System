import { Header } from "@/sections/Header";
import Hero from "@/sections/Hero";
import bg from '../../public/images/background-3.jpg';
import LogoTicker from "@/sections/LogoTicker";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";
import CallToAction from "@/sections/CallToAction";

export default function Home() {
  return (
    <>
    <div className="sm:h-[85vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] bg-cover bg-no-repeat bg-center relative"
    style={{
      backgroundImage: `url(${bg.src})`
    }}
    >
      <Header />
      <Hero />
    </div>
    <LogoTicker />
    <Pricing />
    {/* <Features /> */}
    <Testimonials />
    <CallToAction />
    <Footer/>
    </>
  );
}
