"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Briefcase, Calendar } from "lucide-react"
import { ThreeSceneExperience } from "./three-scene-experience"

export function Experience() {
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

  const experiences = [
    {
      title: "Junior Blockchain Developer",
      company: "Anvesh Technologies",
      location: "Kathmandu, Nepal",
      period: "November 2024 – May 2025",
      responsibilities: [
        "Integrated blockchain using Polygon in the development of product authenticity.",
        "Implemented product authentication systems using Polygon blockchain to ensure transparency and traceability in supply chain and consumer goods.",
        "Designed and implemented EVM-based smart contracts for various decentralized applications (dApps).",
        "Developed Tron-based TRC20 Tokenization.",
      ],
    },
    {
      title: "Blockchain Intern",
      company: "Anvesh Technologies",
      location: "Kathmandu, Nepal",
      period: "September 2024 – November 2024",
      responsibilities: [
        "Worked on Hyperledger Fabric, Stellar, and Solidity for blockchain applications.",
        "Contributed to the development of solutions for product authenticity and contract management using Hyperledger Fabric.",
      ],
    },
  ]

  return (
    <section id="experience" className="relative py-20 bg-black">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeSceneExperience />
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
            Work <span className="text-purple-500">Experience</span>
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-purple-500/30"></div>

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:ml-auto" : "md:pl-12 md:mr-auto"}`}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0 ? "md:-left-6 left-0" : "md:-right-6 left-0"
                  } w-12 h-12 bg-gray-800 border-4 border-purple-500 rounded-full flex items-center justify-center z-10`}
                >
                  <Briefcase className="h-5 w-5 text-purple-500" />
                </div>

                <div
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <h4 className="text-lg font-medium text-purple-400 mt-1">{exp.company}</h4>
                  <div className="flex items-center mt-2 text-gray-400 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    {exp.period}
                  </div>
                  <ul className={`text-gray-300 space-y-2 ${index % 2 === 0 ? "md:ml-auto" : ""}`}>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex} className="flex items-start">
                        <span className="h-2 w-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
