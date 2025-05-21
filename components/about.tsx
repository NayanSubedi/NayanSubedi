"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ThreeSceneAbout } from "./three-scene-about"

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-black to-gray-900">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeSceneAbout />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-8 text-center">
            About <span className="text-purple-500">Me</span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-gray-700"
          >
            <motion.p variants={itemVariants} className="text-gray-300 mb-4 leading-relaxed">
              Aspiring blockchain enthusiast and data scientist pursuing a BSc (Hons) in Computer and Data Science at
              Birmingham City University. Passionate about integrating blockchain technology and data science to solve
              real-world challenges, I have hands-on experience with Hyperledger Fabric, Solidity, and smart contract
              development.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 mb-4 leading-relaxed">
              My skills extend to Python, R, and data analysis libraries like NumPy and Pandas. Participation in Kaggle
              competitions has refined my problem-solving and machine learning capabilities.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              Committed to leveraging blockchain for innovation and continuous learning.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-2 text-purple-400">Language Proficiency</h3>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <span className="px-4 py-2 bg-gray-800 rounded-full text-white">English (Fluent)</span>
              <span className="px-4 py-2 bg-gray-800 rounded-full text-white">Nepali (Native)</span>
              <span className="px-4 py-2 bg-gray-800 rounded-full text-white">German (Basic)</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
