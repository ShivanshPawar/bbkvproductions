import logo from '../assets/logo-white.png';


import { FaInstagram, FaLinkedin, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 px-4 sm:px-6 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                {/* Left: BBKV Logo */}
                <div className="cursor-target flex items-center gap-2">
                    <img
                        src={logo}
                        alt="BBKV Logo"
                        className="h-8 sm:h-10 w-auto"
                    />
                </div>

                {/* Center: Copyright */}
                <div className="text-xs sm:text-sm text-center sm:text-base font-medium text-gray-500">
                    © {new Date().getFullYear()} BBKV Productions. All rights reserved.
                </div>

                {/* Right: Social Icons */}
                <div className="flex gap-3 sm:gap-5 text-lg sm:text-xl text-yellow-400">
                    <a
                        href="https://www.instagram.com/bbkvproductions?utm_source=ig_web_button_share_sheet&igsh=MTdlZmU1djBtYmp0aA=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target hover:scale-110 transition-transform"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/bbkv-productions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target hover:scale-110 transition-transform"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://www.youtube.com/@BBKVProductions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target hover:scale-110 transition-transform"
                    >
                        <FaYoutube />
                    </a>
                    <a
                        href="https://x.com/BbkvProductions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target hover:scale-110 transition-transform"
                    >
                        <FaXTwitter />
                    </a>
                </div>
            </div>
        </footer>
    );
}
