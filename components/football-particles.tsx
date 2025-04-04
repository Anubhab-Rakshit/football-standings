"use client"

import { useRef, useEffect, useState } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  rotation: number
  rotationSpeed: number
}

export function FootballParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [lastMousePosition, setLastMousePosition] = useState({ x: -100, y: -100 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>(0)
  const footballImageRef = useRef<HTMLImageElement | null>(null)
  const lastEmitTimeRef = useRef<number>(0)

  // Initialize canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })
      }
    }

    // Load football image
    const footballImage = new Image()
    footballImage.src = "/football-logo.png"
    footballImage.onload = () => {
      footballImageRef.current = footballImage
      handleResize()
    }
    footballImage.onerror = () => {
      console.error("Failed to load football image")
      handleResize()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setLastMousePosition(mousePosition)
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Emit particles based on mouse movement speed and time since last emit
      const now = Date.now()
      const dx = e.clientX - lastMousePosition.x
      const dy = e.clientY - lastMousePosition.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 5 && now - lastEmitTimeRef.current > 50) {
        emitParticles(e.clientX, e.clientY, Math.min(5, Math.floor(distance / 10)))
        lastEmitTimeRef.current = now
      }
    }

    const emitParticles = (x: number, y: number, count: number) => {
      const newParticles: Particle[] = []
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3 + 1

        newParticles.push({
          x,
          y,
          size: Math.random() * 20 + 10, // 10-30px
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 0.8,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
        })
      }

      setParticles((prev) => [...prev, ...newParticles])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mousePosition, lastMousePosition])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      const updatedParticles = particles
        .map((particle) => {
          // Update position
          particle.x += particle.speedX
          particle.y += particle.speedY

          // Update rotation
          particle.rotation += particle.rotationSpeed

          // Reduce opacity over time
          particle.opacity -= 0.01

          // Draw football
          if (particle.opacity > 0) {
            ctx.save()
            ctx.globalAlpha = particle.opacity
            ctx.translate(particle.x, particle.y)
            ctx.rotate((particle.rotation * Math.PI) / 180)

            // Draw a simple football if image is not available
            if (!footballImageRef.current) {
              ctx.beginPath()
              ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
              ctx.fillStyle = "white"
              ctx.fill()
              ctx.strokeStyle = "black"
              ctx.lineWidth = 1
              ctx.stroke()

              // Draw pentagon pattern
              for (let i = 0; i < 5; i++) {
                const angle = (i * 2 * Math.PI) / 5
                const x = Math.cos(angle) * (particle.size / 4)
                const y = Math.sin(angle) * (particle.size / 4)
                ctx.beginPath()
                ctx.arc(x, y, particle.size / 10, 0, Math.PI * 2)
                ctx.fillStyle = "black"
                ctx.fill()
              }
            } else {
              // Draw the football image
              ctx.drawImage(
                footballImageRef.current,
                -particle.size / 2,
                -particle.size / 2,
                particle.size,
                particle.size,
              )
            }

            ctx.restore()
          }

          return particle
        })
        .filter((particle) => particle.opacity > 0) // Remove faded particles

      setParticles(updatedParticles)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [particles, dimensions])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

