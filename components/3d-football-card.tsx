"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Competition } from "@/lib/types"
import { Star, ChevronRight, MapPin, Calendar, Users } from "lucide-react"

interface FootballCardProps {
  competition: Competition
  onClick: () => void
  isSelected: boolean
  isFavorite: boolean
  onToggleFavorite: () => void
  index: number
}

export function FootballCard3D({
  competition,
  onClick,
  isSelected,
  isFavorite,
  onToggleFavorite,
  index,
}: FootballCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2

    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((e.clientX - cardCenterX) / (rect.width / 2)) * 10
    const rotateX = -((e.clientY - cardCenterY) / (rect.height / 2)) * 10

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotateX(0)
        setRotateY(0)
      }}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease",
          transformStyle: "preserve-3d",
        }}
      >
        <Card
          className={`competition-card relative overflow-hidden cursor-pointer transition-all ${
            isSelected ? "border-primary border-2 glow-border" : ""
          }`}
        >
      
          <div className="absolute inset-0 field-pattern opacity-30"></div>

        
          {isHovered && (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-xl z-0"></div>
            </>
          )}

          {/* Favorite button */}
          <motion.button
            className="absolute top-2 right-2 z-10 text-muted-foreground hover:text-primary bg-transparent border-none p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite()
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Star className={`h-5 w-5 ${isFavorite ? "fill-primary text-primary" : ""}`} />
          </motion.button>

          <div className="relative z-0" onClick={onClick}>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                {competition.emblemUrl && (
                  <div className="w-12 h-12 mr-4 rounded-full bg-white/10 p-1 flex items-center justify-center">
                    <img
                      src={competition.emblemUrl || "/placeholder.svg"}
                      alt={competition.name}
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                      }}
                    />
                  </div>
                )}
                <div>
                  <CardTitle className="text-xl">{competition.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {competition.area.name}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Season: {competition.currentSeason?.startDate?.split("-")[0] || "N/A"}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Teams: 20</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/30 pt-3 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Click to view standings</span>
              <ChevronRight className="h-4 w-4 text-primary" />
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}

