"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Standing } from "@/lib/types"
import { Search, ArrowUpDown, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StandingsTableProps {
  standings: Standing[]
  onSelectTeam?: (team: Standing) => void
  selectedTeamId?: string
}

export function StandingsTable({ standings, onSelectTeam, selectedTeamId }: StandingsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
    key: "position",
    direction: "asc",
  })

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    })
  }

  const sortedStandings = [...standings].sort((a, b) => {
    // @ts-ignore
    const aValue = a[sortConfig.key]
    // @ts-ignore
    const bValue = b[sortConfig.key]

    if (sortConfig.direction === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const filteredStandings = sortedStandings.filter((team) =>
    team.team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search teams..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="w-full min-w-[800px]">
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("position")}
                >
                  Pos
                  {sortConfig.key === "position" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="w-[250px]">Team</TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("playedGames")}
                >
                  MP
                  {sortConfig.key === "playedGames" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("won")}
                >
                  W
                  {sortConfig.key === "won" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("draw")}
                >
                  D
                  {sortConfig.key === "draw" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("lost")}
                >
                  L
                  {sortConfig.key === "lost" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("goalsFor")}
                >
                  GF
                  {sortConfig.key === "goalsFor" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("goalsAgainst")}
                >
                  GA
                  {sortConfig.key === "goalsAgainst" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("goalDifference")}
                >
                  GD
                  {sortConfig.key === "goalDifference" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-12">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 -ml-3 font-medium"
                  onClick={() => handleSort("points")}
                >
                  Pts
                  {sortConfig.key === "points" && (
                    <ArrowUpDown className={`ml-1 h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`} />
                  )}
                </Button>
              </TableHead>
              <TableHead className="text-center w-[120px]">Form</TableHead>
              <TableHead className="w-10">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Click on a team to see detailed stats</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStandings.length > 0 ? (
              filteredStandings.map((team, index) => (
                <motion.tr
                  key={team.team.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`team-row cursor-pointer ${getPositionClass(team.position)} ${
                    selectedTeamId === team.team.id ? "bg-primary/10" : ""
                  }`}
                  onClick={() => onSelectTeam && onSelectTeam(team)}
                >
                  <TableCell className="font-medium">{team.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {team.team.crestUrl && (
                        <div className="w-8 h-8 mr-2 bg-white/10 rounded-full p-1 flex items-center justify-center">
                          <img
                            src={team.team.crestUrl || "/placeholder.svg"}
                            alt={team.team.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg?height=24&width=24"
                            }}
                          />
                        </div>
                      )}
                      <span className="font-medium">{team.team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.playedGames}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.draw}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center">{team.goalDifference}</TableCell>
                  <TableCell className="text-center font-bold">{team.points}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex gap-1 justify-center flex-wrap">
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
                  </TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Search className="h-8 w-8 text-muted-foreground" />
                    <p>No teams found matching your search.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>Champions League</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>Europa League</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
            <span>Conference League</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span>Relegation</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function getPositionClass(position: number): string {
  
  if (position <= 4) {
    return "border-l-4 border-green-500" 
  } else if (position <= 6) {
    return "border-l-4 border-blue-500" 
  } else if (position <= 7) {
    return "border-l-4 border-yellow-500" 
  } else if (position >= 18) {
    return "border-l-4 border-red-500" 
  }
  return ""
}

