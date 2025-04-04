"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-slate-900/80 z-0"></div>

     
      <motion.div
        className="absolute hero-animation"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          <div className="absolute inset-0 rounded-full bg-white opacity-10 blur-3xl"></div>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2" />
            <path d="M100,20 L100,180" stroke="white" strokeWidth="2" />
            <path d="M20,100 L180,100" stroke="white" strokeWidth="2" />
            <path d="M30,50 L170,150" stroke="white" strokeWidth="2" />
            <path d="M30,150 L170,50" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </motion.div>

    
      <div className="container relative z-10 px-4 text-center">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Football Standings
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore standings from top football competitions around the world
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full"
            onClick={handleScroll}
          >
            Explore Competitions
          </Button>
        </motion.div>
      </div>

     
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <ChevronDown className="h-8 w-8 text-white animate-bounce" />
      </motion.div>

      <div ref={scrollRef} id="competitions" className="h-0"></div>
    </div>
  )
}

