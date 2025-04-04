"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StandingsTable } from "@/components/standings-table"
import { Loader } from "@/components/loader"
import { fetchCompetitions, fetchStandings } from "@/lib/api"
import type { Competition, Standing } from "@/lib/types"

interface CompetitionSelectorProps {
  initialCompetitionId?: string | null
}

export default function CompetitionSelector({ initialCompetitionId = null }: CompetitionSelectorProps) {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(initialCompetitionId)
  const [standings, setStandings] = useState<Standing[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [standingsLoading, setStandingsLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadCompetitions = async () => {
      try {
        const data = await fetchCompetitions()
        setCompetitions(data)
        setLoading(false)

        // If we have an initial competition ID, load its standings
        if (initialCompetitionId) {
          handleCompetitionSelect(initialCompetitionId)
        }
      } catch (error) {
        console.error("Error loading competitions:", error)
        setLoading(false)
      }
    }

    loadCompetitions()
  }, [initialCompetitionId])

  const handleCompetitionSelect = async (competitionId: string) => {
    if (competitionId === selectedCompetition) return

    setSelectedCompetition(competitionId)
    setStandingsLoading(true)

    try {
      const data = await fetchStandings(competitionId)
      setStandings(data)
    } catch (error) {
      console.error("Error loading standings:", error)
    } finally {
      setStandingsLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-center mb-8">Select a Competition</h2>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="popular">Popular Leagues</TabsTrigger>
            <TabsTrigger value="all">All Competitions</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions
                .filter((comp) => ["PL", "PD", "BL1", "SA", "FL1"].includes(comp.code))
                .map((competition, index) => (
                  <CompetitionCard
                    key={competition.id}
                    competition={competition}
                    onClick={() => handleCompetitionSelect(competition.id)}
                    isSelected={selectedCompetition === competition.id}
                    index={index}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions.map((competition, index) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                  onClick={() => handleCompetitionSelect(competition.id)}
                  isSelected={selectedCompetition === competition.id}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {selectedCompetition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">
            {competitions.find((c) => c.id === selectedCompetition)?.name} Standings
          </h2>

          {standingsLoading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <StandingsTable standings={standings} />
          )}
        </motion.div>
      )}
    </div>
  )
}

function CompetitionCard({
  competition,
  onClick,
  isSelected,
  index,
}: {
  competition: Competition
  onClick: () => void
  isSelected: boolean
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className={`competition-card cursor-pointer overflow-hidden ${isSelected ? "border-primary border-2" : ""}`}
        onClick={onClick}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            {competition.emblemUrl && (
              <img
                src={competition.emblemUrl || "/placeholder.svg"}
                alt={competition.name}
                className="w-8 h-8 mr-2 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                }}
              />
            )}
            {competition.name}
          </CardTitle>
          <CardDescription>{competition.area.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Season: {competition.currentSeason?.startDate?.split("-")[0] || "N/A"}</p>
        </CardContent>
        <CardFooter className="bg-muted/50 pt-2">
          <p className="text-xs text-muted-foreground">Click to view standings</p>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

