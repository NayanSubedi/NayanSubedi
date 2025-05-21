"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Heart, ArrowUp } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-2xl font-bold text-purple-500">
              Nayan<span className="text-white">.dev</span>
            </h3>
            <p className="text-gray-400 mt-2">
              Blockchain Developer & Data Scientist
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex space-x-4 mb-6 md:mb-0"
          >
            <a
              href="https://github.com/NayanSubedi"
              className="p-2 bg-gray-800 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              <Github className="h-5 w-5 text-gray-300 hover:text-purple-400" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-purple-400" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-800 rounded-full hover:bg-purple-500/20 transition-colors"
            >
              <Twitter className="h-5 w-5 text-gray-300 hover:text-purple-400" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm flex items-center justify-center">
            © {currentYear} Nayan Subedi.
          </p>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg focus:outline-none"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </footer>
  );
}
