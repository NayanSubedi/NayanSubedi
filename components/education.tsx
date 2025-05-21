"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GraduationCap, BookOpen } from "lucide-react"

export function Education() {
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

  const coursework = [
    "Data Structures & Algorithms",
    "Data Science and Visualisation",
    "OOPS Concept",
    "Linear Algebra",
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="text-purple-500">Education</span> & Coursework
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                  <GraduationCap className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <div className="ml-16">
                <h4 className="text-lg font-medium text-purple-400">Sunway College Kathmandu</h4>
                <p className="text-gray-300 mt-1">BSc (Hons) Computer and Data Science</p>
                <p className="text-gray-400 mt-1">Kathmandu, Nepal</p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Coursework</h3>
              </div>
              <div className="ml-16">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {coursework.map((course, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
