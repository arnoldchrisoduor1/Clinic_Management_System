import { Header } from "@/sections/Header";
import Hero from "@/sections/Hero";
import bg from '../../public/images/background-3.jpg';
import LogoTicker from "@/sections/LogoTicker";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";

export default function Home() {
  return (
    <>
    <div className="h-[450px] bg-cover bg-no-repeat bg-center relative"
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
    <Footer/>
    </>
  );
}
