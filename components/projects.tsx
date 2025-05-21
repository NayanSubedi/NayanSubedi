"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThreeSceneProjects } from "./three-scene-projects";

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Stellar dapps",
      description:
        "Developed smart contracts on the Stellar platform, enabling seamless integration and automation of transactions. Implemented Create, Read, and Update (CRU) operations within the smart contract. Designed and deployed API endpoints to interact with the smart contract, ensuring efficient and user-friendly access to its functionalities.",
      technologies: ["Rust", "Soroban"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Product Authenticity",
      description:
        "Developed a blockchain-based Product Authenticity solution using EVM based polygon. Designed and implemented Chaincode to store and query product details such as SKU, name, description, price, and customizable attributes. Leveraged Hyperledger Fabric's secure, decentralized infrastructure to ensure data integrity and tamper-proof storage.",
      technologies: ["EVM", "Solidity", "Polygon"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Data Science and Machine Learning",
      description:
        "Analysis of English Premier League 1993-2023 (Python). Analysis of Airplane Crashes and Fatalities 1908-2023 (R). Developed a comprehensive report on World Economic Indicators utilizing R with shiny dashboard for advanced data visualization and LaTeX for professional documentation. Developed a Stroke Prediction model and deployed in streamlit.",
      technologies: [
        "Python",
        "scikit-learn",
        "Numpy",
        "Pandas",
        "R",
        "Plotly",
        "shiny",
      ],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Crypto Portfolio Tracker",
      description:
        "Built a real-time crypto portfolio tracker app with React and Node.js that connects to multiple exchanges via APIs, providing live updates and analytics on user holdings.",
      technologies: ["React", "Node.js", "Express", "CoinGecko API"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "E-commerce Website",
      description:
        "Designed and developed a fully functional e-commerce website using Next.js and Tailwind CSS with integrated payment gateway and admin dashboard.",
      technologies: ["Next.js", "Tailwind CSS", "Stripe"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Real-time Chat Application",
      description:
        "Created a scalable real-time chat application using Socket.IO and MongoDB, supporting private messaging, group chats, and message history.",
      technologies: ["Socket.IO", "MongoDB", "Express"],
      image: "/placeholder.svg?height=300&width=500",
    },
  ];

  const projectsPerPage = 3;
  const cardWidth = 320; // px
  const cardHeight = 420; // fixed height for all cards

  // Duplicate projects for infinite scroll effect
  const extendedProjects = [...projects, ...projects];

  // Current index for sliding
  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  // Handle previous slide
  function handlePrev() {
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }

  // Handle next slide
  function handleNext() {
    setIndex((prev) => (prev + 1) % projects.length);
  }

  // Calculate slide offset in px
  const x = -index * cardWidth;

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeSceneProjects />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            My <span className="text-purple-500">Projects</span>
          </h2>

          {/* Carousel viewport */}
          <div
            className="overflow-hidden mx-auto"
            style={{ width: projectsPerPage * cardWidth }}
          >
            {/* Sliding container */}
            <motion.div
              className="flex"
              animate={{ x }}
              transition={{ type: "spring", stiffness: 120, damping: 25 }}
              style={{ width: extendedProjects.length * cardWidth }}
            >
              {extendedProjects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-700 flex flex-col h-full mr-4"
                  style={{
                    width: cardWidth - 16,
                    height: cardHeight,
                    flexShrink: 0,
                  }} // fix width & height
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-purple-900/30 z-10"></div>
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-purple-900/40 text-purple-200 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-700 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </Button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-center items-center space-x-6 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="p-2 rounded-full bg-purple-900/40 text-white hover:bg-purple-700 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next"
              className="p-2 rounded-full bg-purple-900/40 text-white hover:bg-purple-700 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-4 space-x-3">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-purple-600"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
