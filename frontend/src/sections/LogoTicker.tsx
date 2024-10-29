"use client";
import acmeLogo from "../../public/assets/logo-acme.png";
import apexLogo from "../../public/assets/logo-apex.png";
import celestialLogo from "../../public/assets/logo-celestial.png";
import quantumLogo from "../../public/assets/logo-quantum.png";
import pulseLogo from "../../public/assets/logo-pulse.png";
import echoLogo from "../../public/assets/logo-echo.png";

import {motion} from "framer-motion";

const LogoTicker = () => {
  return (
    <section className="bg-black text-white">
      <div className="container py-20 md:py-24">
        <div className="flex items-center gap-5">
          <div className="flex-1 md:flex-none">
            <h2>Trusted by top Healthcare Institutions</h2>
          </div>
          <div className="flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <motion.div
            initial = {{ translateX: '-50%' }}
            animate = {{ translateX: "0" }}
            transition = {{
                repeat: Infinity,
                duration: 30,
                ease: "linear"
            }}
            className="flex flex-none gap-14 pr-14 -translate-x-1/2"
            >
              {[
                acmeLogo,
                apexLogo,
                echoLogo,
                celestialLogo,
                quantumLogo,
                pulseLogo,
                acmeLogo,
                apexLogo,
                echoLogo,
                celestialLogo,
                quantumLogo,
                pulseLogo,
              ].map((logo, index) => (
                <img src={logo.src} key={`${logo.src}-${index}`} className="h-6 w-auto" />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
