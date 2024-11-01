import XSocial from "../../public/assets/social-x.svg";
import InstaSocial from "../../public/assets/social-instagram.svg";
import YTSocial from "../../public/assets/social-youtube.svg";

const Footer = () => {
  return (
    <footer className="py-5 bg-black">
        <div className="container">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="flex gap-2 items-center lg:flex-1">
                    <p className="text-white/70">AIMEDICALS</p>
                    <div className="text-white/70">Medical Landing Page</div>
                </div>
                <nav className="flex flex-col lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
                    <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Features</a>
                    <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Developers</a>
                    <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Company</a>
                    <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Blog</a>
                    <a href="#" className="text-white/70 hover:text-white text-xs md:text-sm transition">Changelog</a>
                </nav>
                <div className="flex gap-5 lg:flex-1 lg:justify-end">
                <XSocial className="text-white/40 hover:text-white transition" />
                <InstaSocial className="text-white/40 hover:text-white transition" />
                <YTSocial className="text-white/40 hover:text-white transition" />
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;