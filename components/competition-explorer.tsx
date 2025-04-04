"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Trophy } from "lucide-react"
import { StandingsTable } from "@/components/standings-table"
import { TeamStats } from "@/components/team-stats"
import { Loader } from "@/components/loader"
import { fetchCompetitions, fetchStandings } from "@/lib/api"
import type { Competition, Standing } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"
import { FootballCard3D } from "@/components/3d-football-card"

export default function CompetitionExplorer() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null)
  const [standings, setStandings] = useState<Standing[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [standingsLoading, setStandingsLoading] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("popular")
  const [selectedTeam, setSelectedTeam] = useState<Standing | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadCompetitions = async () => {
      try {
        setError(null)
        const data = await fetchCompetitions()
        setCompetitions(data)
      } catch (error) {
        console.error("Error loading competitions:", error)
        setError("Failed to load competitions. Using mock data instead.")
        toast({
          title: "Error loading competitions",
          description: "Using mock data instead. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadCompetitions()

    
    try {
      const savedFavorites = localStorage.getItem("favoriteCompetitions")
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
    } catch (e) {
      console.error("Error loading favorites from localStorage:", e)
    }
  }, [toast])

  const handleCompetitionSelect = async (competitionId: string) => {
    if (competitionId === selectedCompetition && !standingsLoading) return

    setSelectedCompetition(competitionId)
    setStandingsLoading(true)
    setSelectedTeam(null)

    try {
      setError(null)
      const data = await fetchStandings(competitionId)
      setStandings(data)

     
      setTimeout(() => {
        document.getElementById("standings-section")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    } catch (error) {
      console.error("Error loading standings:", error)
      setError("Failed to load standings. Using mock data instead.")
      toast({
        title: "Error loading standings",
        description: "Using mock data instead. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setStandingsLoading(false)
    }
  }

  const toggleFavorite = (competitionId: string) => {
    try {
      const newFavorites = favorites.includes(competitionId)
        ? favorites.filter((id) => id !== competitionId)
        : [...favorites, competitionId]

      setFavorites(newFavorites)
      localStorage.setItem("favoriteCompetitions", JSON.stringify(newFavorites))

      toast({
        title: favorites.includes(competitionId) ? "Removed from favorites" : "Added to favorites",
        description: competitions.find((c) => c.id === competitionId)?.name,
      })
    } catch (e) {
      console.error("Error saving favorites to localStorage:", e)
    }
  }

  const filteredCompetitions = competitions.filter(
    (comp) =>
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.area.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const popularCompetitions = filteredCompetitions.filter((comp) =>
    ["PL", "PD", "BL1", "SA", "FL1", "CL"].includes(comp.code),
  )

  const favoriteCompetitions = filteredCompetitions.filter((comp) => favorites.includes(comp.id))

  if (loading) {
    return <Loader />
  }

  return (
    <div className="space-y-12" ref={containerRef} id="competitions">
      {error && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 p-4 rounded-md mb-4">
          <p>{error}</p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold tracking-tight glow-text">Explore Football Competitions</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover standings from top football leagues and tournaments around the world
        </p>

        <div className="max-w-md mx-auto mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search competitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background/50 border-muted"
            />
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="popular" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="popular" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCompetitions.length > 0 ? (
              popularCompetitions.map((competition, index) => (
                <FootballCard3D
                  key={competition.id}
                  competition={competition}
                  onClick={() => handleCompetitionSelect(competition.id)}
                  isSelected={selectedCompetition === competition.id}
                  isFavorite={favorites.includes(competition.id)}
                  onToggleFavorite={() => toggleFavorite(competition.id)}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No competitions found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCompetitions.length > 0 ? (
              favoriteCompetitions.map((competition, index) => (
                <FootballCard3D
                  key={competition.id}
                  competition={competition}
                  onClick={() => handleCompetitionSelect(competition.id)}
                  isSelected={selectedCompetition === competition.id}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(competition.id)}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">
                  No favorite competitions yet. Star competitions to add them here.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompetitions.length > 0 ? (
              filteredCompetitions.map((competition, index) => (
                <FootballCard3D
                  key={competition.id}
                  competition={competition}
                  onClick={() => handleCompetitionSelect(competition.id)}
                  isSelected={selectedCompetition === competition.id}
                  isFavorite={favorites.includes(competition.id)}
                  onToggleFavorite={() => toggleFavorite(competition.id)}
                  index={index}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">No competitions found matching your search.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {selectedCompetition && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 pt-8 border-t"
          id="standings-section"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-primary" />
                {competitions.find((c) => c.id === selectedCompetition)?.name} Standings
              </h2>
              <p className="text-muted-foreground">
                {competitions.find((c) => c.id === selectedCompetition)?.area.name} • Season{" "}
                {competitions.find((c) => c.id === selectedCompetition)?.currentSeason?.startDate?.split("-")[0] ||
                  "Current"}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedTeam(null)}
              className={!selectedTeam ? "hidden" : ""}
            >
              Back to Full Standings
            </Button>
          </div>

          {standingsLoading ? (
            <div className="flex justify-center py-12">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className={`${selectedTeam ? "lg:col-span-8" : "lg:col-span-12"}`}>
                <StandingsTable
                  standings={standings}
                  onSelectTeam={setSelectedTeam}
                  selectedTeamId={selectedTeam?.team.id}
                />
              </div>

              {selectedTeam && (
                <div className="lg:col-span-4">
                  <TeamStats team={selectedTeam} />
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

