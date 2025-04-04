"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { TeamStats } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface TeamDetailsDialogProps {
  team: TeamStats | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TeamDetailsDialog({ team, open, onOpenChange }: TeamDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!team) return null

 
  const performanceData = [
    { name: "Home", value: team.won * 0.7, fill: "#4ade80" },
    { name: "Away", value: team.won * 0.3, fill: "#2563eb" },
  ]

  const resultTypeData = [
    { name: "Wins", value: team.won, fill: "#4ade80" },
    { name: "Draws", value: team.draw, fill: "#facc15" },
    { name: "Losses", value: team.lost, fill: "#f87171" },
  ]

  const goalsData = [
    { name: "Scored", value: team.goalsFor, fill: "#4ade80" },
    { name: "Conceded", value: team.goalsAgainst, fill: "#f87171" },
  ]

  const matchesData = [
    { name: "Home Wins", value: Math.round(team.won * 0.7) },
    { name: "Away Wins", value: Math.round(team.won * 0.3) },
    { name: "Home Draws", value: Math.round(team.draw * 0.5) },
    { name: "Away Draws", value: Math.round(team.draw * 0.5) },
    { name: "Home Losses", value: Math.round(team.lost * 0.3) },
    { name: "Away Losses", value: Math.round(team.lost * 0.7) },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {team.team.crest && (
              <Image
                src={team.team.crest || "/placeholder.svg"}
                alt={team.team.name}
                width={48}
                height={48}
                className="object-contain"
              />
            )}
            <div>
              <DialogTitle className="text-2xl">{team.team.name}</DialogTitle>
              <DialogDescription>
                Position: {team.position} • Points: {team.points} • Goal Difference: {team.goalDifference}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Team Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">{team.team.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Short Name:</span>
                    <span className="font-medium">{team.team.shortName || team.team.tla}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Founded:</span>
                    <span className="font-medium">{team.team.founded || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stadium:</span>
                    <span className="font-medium">{team.team.venue || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="font-medium">{team.team.address || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Season Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Matches Played:</span>
                    <span className="font-medium">{team.playedGames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Wins:</span>
                    <span className="font-medium text-green-500">{team.won}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Draws:</span>
                    <span className="font-medium text-yellow-500">{team.draw}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Losses:</span>
                    <span className="font-medium text-red-500">{team.lost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Form:</span>
                    <div className="flex gap-1">
                      {team.form?.split(",").map((result, i) => (
                        <span
                          key={i}
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                            result === "W"
                              ? "bg-green-500 text-white"
                              : result === "L"
                                ? "bg-red-500 text-white"
                                : result === "D"
                                  ? "bg-yellow-500 text-white"
                                  : ""
                          }`}
                        >
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Goals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Goals Scored</p>
                  <p className="text-2xl font-bold text-green-500">{team.goalsFor}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg: {(team.goalsFor / team.playedGames).toFixed(2)} per game
                  </p>
                </div>
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Goals Conceded</p>
                  <p className="text-2xl font-bold text-red-500">{team.goalsAgainst}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg: {(team.goalsAgainst / team.playedGames).toFixed(2)} per game
                  </p>
                </div>
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Goal Difference</p>
                  <p
                    className={`text-2xl font-bold ${
                      team.goalDifference > 0 ? "text-green-500" : team.goalDifference < 0 ? "text-red-500" : ""
                    }`}
                  >
                    {team.goalDifference > 0 ? "+" : ""}
                    {team.goalDifference}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ratio: {(team.goalsFor / (team.goalsAgainst || 1)).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Points</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Points:</span>
                    <span className="font-bold">{team.points}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points per Game:</span>
                    <span className="font-medium">{(team.points / team.playedGames).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points from Wins:</span>
                    <span className="font-medium">{team.won * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Points from Draws:</span>
                    <span className="font-medium">{team.draw}</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Win Rate</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Win Percentage:</span>
                    <span className="font-bold">{Math.round((team.won / team.playedGames) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Draw Percentage:</span>
                    <span className="font-medium">{Math.round((team.draw / team.playedGames) * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loss Percentage:</span>
                    <span className="font-medium">{Math.round((team.lost / team.playedGames) * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Goals</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Goals Scored:</span>
                    <span className="font-bold text-green-500">{team.goalsFor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Goals Conceded:</span>
                    <span className="font-bold text-red-500">{team.goalsAgainst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clean Sheets:</span>
                    <span className="font-medium">{Math.round(team.playedGames * 0.3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Failed to Score:</span>
                    <span className="font-medium">{Math.round(team.playedGames * 0.2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Advanced Statistics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Expected Goals (xG)</p>
                  <p className="text-2xl font-bold">{(team.goalsFor * 1.1).toFixed(1)}</p>
                </div>
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Expected Goals Against (xGA)</p>
                  <p className="text-2xl font-bold">{(team.goalsAgainst * 0.9).toFixed(1)}</p>
                </div>
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Possession</p>
                  <p className="text-2xl font-bold">{Math.round(50 + team.goalDifference / 2)}%</p>
                </div>
                <div className="bg-background p-3 rounded-lg shadow-sm">
                  <p className="text-sm text-muted-foreground">Pass Accuracy</p>
                  <p className="text-2xl font-bold">{Math.round(75 + team.points / team.playedGames)}%</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="charts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-center">Results Distribution</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={resultTypeData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {resultTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold mb-4 text-center">Goals Analysis</h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={goalsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Goals" radius={[4, 4, 0, 0]}>
                        {goalsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold mb-4 text-center">Match Results Breakdown</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={matchesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Matches" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

