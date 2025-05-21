"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calendar } from "lucide-react"
import { ThreeSceneCertifications } from "./three-scene-certifications"

export function Certifications() {
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

  const certifications = [
    {
      title: "Python",
      issuer: "Kaggle",
      date: "March 2023",
      icon: "🐍",
    },
    {
      title: "Blockchain: Beyond the Basics",
      issuer: "LinkedIn Learning",
      date: "July 2023",
      icon: "🔗",
    },
    {
      title: "Chainlink Cross-Chain Event - 77 Days of CCIP",
      issuer: "",
      date: "October 2023",
      icon: "⛓️",
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black to-gray-900">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeSceneCertifications />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-purple-500">Certifications</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 transform transition-transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center text-3xl">
                    {cert.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white text-center mb-2">{cert.title}</h3>
                {cert.issuer && <p className="text-purple-400 text-center mb-2">{cert.issuer}</p>}
                <div className="flex items-center justify-center text-gray-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {cert.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
