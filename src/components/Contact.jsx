import { motion } from 'framer-motion';
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaXTwitter,
} from 'react-icons/fa6';

export default function ContactSection() {
  return (
    <section className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6" id="contact">
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"
        >
          CONNECT WITH <span className="text-yellow-400 cursor-target">BBKV</span>
        </motion.h2>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Let's collaborate, chat, or just say hi!
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 sm:space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="cursor-target w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="cursor-target w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            className="cursor-target w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base resize-none"
          />
          <button
            type="submit"
            className="cursor-target bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base"
          >
            Send Message
          </button>
        </motion.form>

        {/* Info + Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="text-base sm:text-lg font-semibold">Email</h4>
              <p className="text-gray-400 text-sm sm:text-base">hello@bbkvproductions.com</p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold">Phone</h4>
              <p className="text-gray-400 text-sm sm:text-base">+91 98765 12345</p>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold">Location</h4>
              <p className="text-gray-400 text-sm sm:text-base">Mumbai, Maharashtra, India</p>
            </div>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/bbkv-productions"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-3 sm:p-4 rounded-xl transition"
            >
              <FaLinkedin size={18} className="text-blue-500 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm">LinkedIn</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bhuvan.bam22"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-3 sm:p-4 rounded-xl transition"
            >
              <FaInstagram size={18} className="text-pink-500 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm">Instagram</span>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/bbkivines"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-3 sm:p-4 rounded-xl transition"
            >
              <FaFacebook size={18} className="text-blue-600 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm">Facebook</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/bbkivines"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-3 sm:p-4 rounded-xl transition"
            >
              <FaYoutube size={18} className="text-red-600 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm">YouTube</span>
            </a>

            {/* X / Twitter */}
            <a
              href="https://twitter.com/bhuvan_bam"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-3 sm:p-4 rounded-xl transition"
            >
              <FaXTwitter size={18} className="text-white flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm">X / Twitter</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
