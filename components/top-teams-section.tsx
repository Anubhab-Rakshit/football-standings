"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Badge } from "@/components/ui/badge"
import { fetchCompetitions, fetchStandings } from "@/lib/api"
import type { Competition, Standing } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { Trophy, Star, ArrowRight, RefreshCw } from "lucide-react"
import Link from "next/link"

export function TopTeamsSection() {
  const [topTeams, setTopTeams] = useState<Record<string, Standing[]>>({})
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch competitions
        const comps = await fetchCompetitions()
        setCompetitions(comps)

        // Filter for top leagues
        const topLeagues = comps.filter((comp) => ["PL", "PD", "BL1", "SA", "FL1"].includes(comp.code))

        
        const teamsData: Record<string, Standing[]> = {}

        await Promise.all(
          topLeagues.map(async (league) => {
            try {
              const standings = await fetchStandings(league.id)
           
              teamsData[league.id] = standings.slice(0, 4)
            } catch (error) {
              console.error(`Error fetching standings for ${league.name}:`, error)
            }
          }),
        )

        setTopTeams(teamsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error loading data",
          description: "There was a problem fetching the top teams data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const handleRefresh = () => {
    setLoading(true)
   
    const loadData = async () => {
      try {
        
        const comps = await fetchCompetitions()
        setCompetitions(comps)

     
        const topLeagues = comps.filter((comp) => ["PL", "PD", "BL1", "SA", "FL1"].includes(comp.code))

       
        const teamsData: Record<string, Standing[]> = {}

        await Promise.all(
          topLeagues.map(async (league) => {
            try {
              const standings = await fetchStandings(league.id)
              
              teamsData[league.id] = standings.slice(0, 4)
            } catch (error) {
              console.error(`Error fetching standings for ${league.name}:`, error)
            }
          }),
        )

        setTopTeams(teamsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error refreshing data",
          description: "There was a problem fetching the top teams data.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }

  if (loading) {
    return <Loader />
  }

  
  const allTopTeams = Object.values(topTeams).flat()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-primary" />
          Top Performing Teams
        </h2>
        <Button variant="outline" size="sm" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="all">All Leagues</TabsTrigger>
          {Object.keys(topTeams).map((leagueId) => {
            const league = competitions.find((c) => c.id === leagueId)
            return (
              <TabsTrigger key={leagueId} value={leagueId}>
                {league?.name.split(" ").slice(0, 2).join(" ") || league?.code || "League"}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allTopTeams.map((team, index) => (
              <TeamCard
                key={`${team.team.id}-${index}`}
                team={team}
                league={competitions.find(
                  (c) =>
                    Object.keys(topTeams).find((leagueId) =>
                      topTeams[leagueId].some((t) => t.team.id === team.team.id),
                    ) === c.id,
                )}
                index={index}
              />
            ))}
          </div>
        </TabsContent>

        {Object.keys(topTeams).map((leagueId) => {
          const league = competitions.find((c) => c.id === leagueId)
          return (
            <TabsContent key={leagueId} value={leagueId} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {topTeams[leagueId].map((team, index) => (
                  <TeamCard key={`${team.team.id}-${index}`} team={team} league={league} index={index} />
                ))}
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

interface TeamCardProps {
  team: Standing
  league?: Competition
  index: number
}

function TeamCard({ team, league, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="pb-2 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {team.team.crestUrl && (
                <div className="w-12 h-12 mr-3 bg-white/10 rounded-full p-1 flex items-center justify-center">
                  <img
                    src={team.team.crestUrl || "/placeholder.svg"}
                    alt={team.team.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                    }}
                  />
                </div>
              )}
              <div>
                <CardTitle className="text-lg">{team.team.name}</CardTitle>
                <CardDescription className="flex items-center">
                  {league && (
                    <>
                      {league.emblemUrl && (
                        <img
                          src={league.emblemUrl || "/placeholder.svg"}
                          alt={league.name}
                          className="w-4 h-4 mr-1"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=16&width=16"
                          }}
                        />
                      )}
                      {league.name}
                    </>
                  )}
                </CardDescription>
              </div>
            </div>
            <Badge className="bg-primary">#{team.position}</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div className="bg-muted/30 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">Points</p>
              <p className="text-xl font-bold">{team.points}</p>
            </div>
            <div className="bg-muted/30 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">W/D/L</p>
              <p className="text-sm font-medium">
                {team.won}/{team.draw}/{team.lost}
              </p>
            </div>
            <div className="bg-muted/30 p-2 rounded-md">
              <p className="text-xs text-muted-foreground">GD</p>
              <p
                className={`text-xl font-bold ${team.goalDifference > 0 ? "text-green-500" : team.goalDifference < 0 ? "text-red-500" : ""}`}
              >
                {team.goalDifference > 0 ? "+" : ""}
                {team.goalDifference}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">Form: </span>
              <div className="flex ml-2">
                {team.form?.split(",").map((result, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold mx-0.5 ${
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

            <Link href={`/competitions?id=${league?.id}`} passHref>
              <Button variant="ghost" size="sm" className="text-xs">
                Details
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

