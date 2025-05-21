"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, MessageSquare } from "lucide-react"
import { ThreeSceneSkills } from "./three-scene-skills"

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="h-6 w-6 text-purple-500" />,
      skills: [
        "Python",
        "Java",
        "JavaScript",
        "SQL",
        "R",
        "Go",
        "Rust",
        "Solidity",
      ],
    },
    {
      title: "Data Science & Machine Learning",
      icon: <Database className="h-6 w-6 text-purple-500" />,
      skills: [
        "Python",
        "TensorFlow",
        "scikit-learn",
        "Seaborn",
        "Numpy",
        "Pandas",
        "R",
        "Plotly",
        "shiny",
      ],
    },
    {
      title: "Soft Skills",
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      skills: ["Communication", "Multilingual", "Teamwork", "Fast Learning"],
    },
  ];

  return (
    <section id="skills" className="relative py-20 bg-black">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeSceneSkills />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-purple-500">Skills</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-purple-500/20 rounded-full mr-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: skillIndex * 0.05,
                            duration: 0.4,
                          },
                        },
                      }}
                      className="px-3 py-1 bg-purple-900/40 text-purple-200 rounded-full text-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill bars for visual representation */}
          <motion.div variants={itemVariants} className="mt-16 grid md:grid-cols-2 gap-8">
            {["Blockchain", "Data Science", "Web Development", "Machine Learning"].map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{skill}</span>
                  <span className="text-purple-400">{85 - index * 5}%</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${85 - index * 5}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
