"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { FootballParticles } from "@/components/football-particles"
import Link from "next/link"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
    }

  
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY
        const heroElement = heroRef.current

      
        const title = heroElement.querySelector(".hero-title")
        const subtitle = heroElement.querySelector(".hero-subtitle")
        const logos = heroElement.querySelector(".hero-logos")

        if (title) {
          ;(title as HTMLElement).style.transform = `translateY(${scrollY * 0.2}px)`
        }
        if (subtitle) {
          ;(subtitle as HTMLElement).style.transform = `translateY(${scrollY * 0.1}px)`
        }
        if (logos) {
          ;(logos as HTMLElement).style.transform = `translateY(${scrollY * -0.05}px)`
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
     
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e0a] to-[#0f172a] z-0"></div>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
           
            e.currentTarget.style.display = "none"
          }}
        >
          <source src="/football-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

    
      <FootballParticles />

    
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10"></div>

    
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></div>
            <motion.div
              className="w-full h-full rounded-full bg-white/10 p-2 shadow-lg"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(0, 255, 0, 0.5)",
                  "0 0 20px rgba(0, 255, 0, 0.8)",
                  "0 0 10px rgba(0, 255, 0, 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <img
                src="/football-logo.png"
                alt="Football Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=128&width=128"
                }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="hero-title text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            textShadow: "0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)",
          }}
        >
          Football<span className="text-green-500">Verse</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle text-xl md:text-2xl text-white/90 max-w-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Explore real-time standings from top football leagues around the world
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => {
              document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore Competitions
          </Button>
          <Link href="/top-teams" passHref>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 rounded-full text-lg shadow-lg hover:shadow-white/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              View Top Teams
            </Button>
          </Link>
        </motion.div>

      
        <motion.div
          className="hero-logos mt-16 flex flex-wrap justify-center gap-8 max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {["premier-league", "la-liga", "bundesliga", "serie-a", "ligue-1"].map((league, index) => (
            <motion.div
              key={league}
              className="relative group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="absolute inset-0 bg-white/5 rounded-full blur-xl transform scale-75 group-hover:scale-125 transition-all duration-300"></div>
              <img
                src={`/leagues/${league}.png`}
                alt={league}
                className="h-12 w-auto opacity-70 group-hover:opacity-100 transition-opacity relative z-10"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                }}
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

   
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex flex-col items-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white animate-bounce bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-full w-12 h-12 shadow-lg"
            onClick={() => {
              document.getElementById("competitions")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
          <span className="text-white/70 text-sm mt-2">Scroll Down</span>
        </motion.div>
      </div>
    </div>
  )
}

