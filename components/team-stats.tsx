"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Standing } from "@/lib/types"
import { Trophy, Users, Goal, Shield, Percent, TrendingUp, TrendingDown } from "lucide-react"

export function TeamStats({ team }: { team: Standing }) {

  const winPercentage = Math.round((team.won / team.playedGames) * 100) || 0


  const mockForm = ["W", "L", "W", "D", "W"]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 bg-muted/30">
          <div className="flex items-center">
            {team.team.crestUrl && (
              <div className="w-16 h-16 mr-4 bg-white/10 rounded-full p-1 flex items-center justify-center">
                <img
                  src={team.team.crestUrl || "/placeholder.svg"}
                  alt={team.team.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=56&width=56"
                  }}
                />
              </div>
            )}
            <div>
              <CardTitle className="text-2xl">{team.team.name}</CardTitle>
              <CardDescription className="flex items-center">
                <Trophy className="h-4 w-4 mr-1 text-primary" />
                Position: {team.position}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 gap-4">
            <StatCard title="Points" value={team.points} icon={<Trophy className="h-5 w-5 text-yellow-500" />} />
            <StatCard title="Played" value={team.playedGames} icon={<Users className="h-5 w-5 text-blue-500" />} />
            <StatCard
              title="Win Rate"
              value={`${winPercentage}%`}
              icon={<Percent className="h-5 w-5 text-green-500" />}
            />
            <StatCard
              title="Goal Diff"
              value={team.goalDifference}
              icon={<Goal className="h-5 w-5 text-purple-500" />}
              isPositive={team.goalDifference > 0}
            />
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Performance</h3>

            <div className="grid grid-cols-3 gap-4">
              <PerformanceCard
                title="Wins"
                value={team.won}
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                color="green"
              />
              <PerformanceCard
                title="Draws"
                value={team.draw}
                icon={<Shield className="h-5 w-5 text-yellow-500" />}
                color="yellow"
              />
              <PerformanceCard
                title="Losses"
                value={team.lost}
                icon={<TrendingDown className="h-5 w-5 text-red-500" />}
                color="red"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Goals</h3>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Scored</span>
                  <span className="font-bold">{team.goalsFor}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2.5">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${(team.goalsFor / (team.goalsFor + team.goalsAgainst)) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mt-4 mb-2">
                  <span className="text-sm">Conceded</span>
                  <span className="font-bold">{team.goalsAgainst}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2.5">
                  <div
                    className="bg-red-500 h-2.5 rounded-full"
                    style={{ width: `${(team.goalsAgainst / (team.goalsFor + team.goalsAgainst)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Recent Form</h3>
              <div className="flex space-x-2">
                {mockForm.map((result, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      result === "W" ? "bg-green-500" : result === "D" ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StatCard({
  title,
  value,
  icon,
  isPositive,
}: {
  title: string
  value: number | string
  icon: React.ReactNode
  isPositive?: boolean
}) {
  return (
    <div className="bg-muted/30 rounded-lg p-3 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p
          className={`text-xl font-bold ${
            isPositive === true ? "text-green-500" : isPositive === false ? "text-red-500" : ""
          }`}
        >
          {value}
        </p>
      </div>
      <div className="bg-background/50 p-2 rounded-full">{icon}</div>
    </div>
  )
}

function PerformanceCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: "green" | "yellow" | "red"
}) {
  const colorClasses = {
    green: "bg-green-500/10 border-green-500/30 text-green-500",
    yellow: "bg-yellow-500/10 border-yellow-500/30 text-yellow-500",
    red: "bg-red-500/10 border-red-500/30 text-red-500",
  }

  return (
    <div className={`rounded-lg p-3 border ${colorClasses[color]} text-center`}>
      <div className="flex justify-center mb-1">{icon}</div>
      <p className="text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}

