"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ThreeSceneHero } from "./three-scene-hero"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { ClientOnly } from "./client-only";
import Link from "next/link";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeSceneHero />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            <span className="text-purple-500">Nayan</span> Subedi
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-6 text-gray-300"
          >
            Blockchain Developer & Data Scientist
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-400 mb-8"
          >
            Kathmandu, Nepal
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
              asChild
            >
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-500/10"
              size="lg"
              asChild
            >
              <Link href="#contact">Contact Me</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <ArrowDown className="h-8 w-8 text-purple-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
