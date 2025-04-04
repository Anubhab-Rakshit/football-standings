"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { useMatches } from "@/hooks/use-football-api"
import { Calendar, Clock, RefreshCw } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function RecentMatches() {
  const today = new Date()
  const threeDaysAgo = new Date(today)
  threeDaysAgo.setDate(today.getDate() - 3)
  const twoDaysAhead = new Date(today)
  twoDaysAhead.setDate(today.getDate() + 2)

 
  const dateFrom = threeDaysAgo.toISOString().split("T")[0]
  const dateTo = twoDaysAhead.toISOString().split("T")[0]

  const [refreshKey, setRefreshKey] = useState(0)

 
  const { matches, loading, error } = useMatches({
    dateFrom,
    dateTo,
  })

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }


  const matchesByDate = matches.reduce(
    (acc, match) => {
      const date = new Date(match.utcDate).toLocaleDateString()
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(match)
      return acc
    },
    {} as Record<string, typeof matches>,
  )


  const sortedDates = Object.keys(matchesByDate).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime()
  })

  return (
    <Card className="overflow-hidden" id="recent-matches">
      <CardHeader className="bg-primary/5 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-2xl flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Recent & Upcoming Matches
          </CardTitle>
          <CardDescription>Live scores and upcoming fixtures from top competitions</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} className="h-8 px-2">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">Error loading matches: {error.message}</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-muted-foreground">No matches found for the selected period.</p>
          </div>
        ) : (
          <div>
            {sortedDates.map((date) => (
              <div key={date} className="border-b last:border-b-0">
                <div className="bg-muted/30 px-4 py-2 sticky top-0">
                  <h3 className="font-medium text-sm">
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                </div>
                <div className="divide-y">
                  {matchesByDate[date].map((match) => (
                    <MatchRow key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MatchRow({ match }: { match: any }) {
  const matchTime = new Date(match.utcDate)
  const isToday = new Date().toDateString() === matchTime.toDateString()

  // Format match time
  const formattedTime = matchTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  // Get status badge
  const getStatusBadge = () => {
    switch (match.status) {
      case "FINISHED":
        return <Badge variant="secondary">Finished</Badge>
      case "IN_PLAY":
        return (
          <Badge variant="default" className="bg-green-500">
            Live
          </Badge>
        )
      case "PAUSED":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Halftime
          </Badge>
        )
      case "SCHEDULED":
        return isToday ? (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Today
          </Badge>
        ) : (
          <Badge variant="outline">{formatDistanceToNow(matchTime, { addSuffix: true })}</Badge>
        )
      case "POSTPONED":
        return <Badge variant="destructive">Postponed</Badge>
      case "SUSPENDED":
        return <Badge variant="destructive">Suspended</Badge>
      case "CANCELED":
        return <Badge variant="destructive">Canceled</Badge>
      default:
        return <Badge variant="outline">{match.status}</Badge>
    }
  }

  return (
    <motion.div
      className="px-4 py-3 hover:bg-muted/20 transition-colors"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 min-w-[120px]">
          {getStatusBadge()}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {formattedTime}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-[1fr,auto,1fr] gap-2 items-center">
         
          <div className="flex items-center justify-end">
            <span className="font-medium text-right mr-2">{match.homeTeam.name}</span>
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={match.homeTeam.crest || "/placeholder.svg"}
                alt={match.homeTeam.name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=20&width=20"
                }}
              />
            </div>
          </div>

       
          <div className="text-center font-bold">
            {match.status === "SCHEDULED" ? (
              <span className="text-sm text-muted-foreground">vs</span>
            ) : (
              <span>
                {match.score.fullTime.home ?? "-"} : {match.score.fullTime.away ?? "-"}
              </span>
            )}
          </div>


          <div className="flex items-center">
            <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center overflow-hidden mr-2">
              <img
                src={match.awayTeam.crest || "/placeholder.svg"}
                alt={match.awayTeam.name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=20&width=20"
                }}
              />
            </div>
            <span className="font-medium">{match.awayTeam.name}</span>
          </div>
        </div>

       
        <div className="hidden md:block text-xs text-muted-foreground min-w-[100px] text-right">
          {match.competition?.name || match.stage || match.group || ""}
        </div>
      </div>
    </motion.div>
  )
}

