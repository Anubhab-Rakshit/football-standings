"use client"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [footballsData, setFootballsData] = useState<
    Array<{
      x: number
      y: number
      size: number
      rotation: number
      speed: number
    }>
  >([])

  // Initialize footballs
  useEffect(() => {
    const footballs = []
    for (let i = 0; i < 15; i++) {
      footballs.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        speed: Math.random() * 0.5 + 0.2,
      })
    }
    setFootballsData(footballs)
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e0a] to-[#0f172a]"></div>
      <div className="absolute inset-0 field-pattern opacity-20"></div>

      {/* 3D Footballs */}
      {footballsData.map((ball, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: ball.size,
            height: ball.size,
          }}
          animate={{
            x: [0, (mousePosition.x - 50) / 5],
            y: [0, (mousePosition.y - 50) / 5],
            rotate: [0, 360],
          }}
          transition={{
            x: { duration: 1, ease: "easeOut" },
            y: { duration: 1, ease: "easeOut" },
            rotate: { duration: 10 / ball.speed, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          <div className="w-full h-full rounded-full bg-white p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white border-4 border-black relative overflow-hidden">
              {/* Soccer ball pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(black_2px,transparent_0)] bg-[size:10px_10px]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(black_2px,transparent_0)] bg-[size:10px_10px] rotate-45"></div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
            <motion.div
              className="w-full h-full rounded-full bg-white p-2 shadow-lg"
              animate={{
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              }}
            >
              <div className="w-full h-full rounded-full bg-white border-8 border-black relative overflow-hidden">
                {/* Soccer ball pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(black_2px,transparent_0)] bg-[size:10px_10px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(black_2px,transparent_0)] bg-[size:10px_10px] rotate-45"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight glow-text"
          style={{
            textShadow: "0 0 20px rgba(0, 255, 0, 0.5), 0 0 40px rgba(0, 255, 0, 0.3)",
            transform: "perspective(1000px) rotateX(10deg)",
          }}
        >
          Football<span className="text-primary">Verse</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/80 max-w-2xl mb-8"
        >
          Explore football standings from top competitions around the world
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Button
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full text-lg"
            onClick={() => {
              document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore Competitions
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white animate-bounce"
            onClick={() => {
              document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
          <span className="text-white/70 text-sm">Explore Competitions</span>
        </motion.div>
      </div>
    </div>
  )
}

