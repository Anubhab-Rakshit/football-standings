"use client"

import { useRef, useEffect, useState } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  connections: number[]
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [points, setPoints] = useState<Point[]>([])
  const animationRef = useRef<number>(0)
  const footballImageRef = useRef<HTMLImageElement | null>(null)

  // Initialize canvas and points
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const width = window.innerWidth
        const height = window.innerHeight
        canvas.width = width
        canvas.height = height
        setDimensions({ width, height })

        // Create points based on screen size
        const pointCount = Math.floor((width * height) / 25000) // Adjust density
        const newPoints: Point[] = []

        for (let i = 0; i < pointCount; i++) {
          newPoints.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            connections: [],
          })
        }

        // Determine connections between points
        for (let i = 0; i < newPoints.length; i++) {
          const connectionCount = Math.floor(Math.random() * 3) + 2 // 2-4 connections per point
          const connections: number[] = []

          for (let j = 0; j < connectionCount; j++) {
            let connectionIndex
            do {
              connectionIndex = Math.floor(Math.random() * newPoints.length)
            } while (connectionIndex === i || connections.includes(connectionIndex))

            connections.push(connectionIndex)
          }

          newPoints[i].connections = connections
        }

        setPoints(newPoints)
      }
    }

    // Load football image
    const footballImage = new Image()
    footballImage.src = "/football.png"
    footballImage.onload = () => {
      footballImageRef.current = footballImage
      handleResize()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || points.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw points
      const updatedPoints = [...points]

      for (let i = 0; i < updatedPoints.length; i++) {
        const point = updatedPoints[i]

       
        point.x += point.vx
        point.y += point.vy

        
        if (point.x <= 0 || point.x >= dimensions.width) {
          point.vx *= -1
          point.x = Math.max(0, Math.min(point.x, dimensions.width))
        }

        if (point.y <= 0 || point.y >= dimensions.height) {
          point.vy *= -1
          point.y = Math.max(0, Math.min(point.y, dimensions.height))
        }

     
        const dx = mousePosition.x - point.x
        const dy = mousePosition.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 200) {
          const force = 0.2 * (1 - distance / 200)
          point.vx += (dx * force) / distance
          point.vy += (dy * force) / distance

          
          const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy)
          if (speed > 2) {
            point.vx = (point.vx / speed) * 2
            point.vy = (point.vy / speed) * 2
          }
        }

        
        ctx.strokeStyle = "rgba(0, 128, 255, 0.2)"
        ctx.lineWidth = 0.5

        for (const connectionIndex of point.connections) {
          const connectedPoint = updatedPoints[connectionIndex]
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(connectedPoint.x, connectedPoint.y)
          ctx.stroke()
        }

       
        ctx.fillStyle = "rgba(0, 128, 255, 0.6)"
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fill()

       
       
      }

      setPoints(updatedPoints)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [points, dimensions, mousePosition])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 bg-black" />
}

