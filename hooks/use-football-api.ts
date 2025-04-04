"use client"

import { useState, useEffect } from "react"
import { footballApi } from "@/lib/api-client"
import type { Competition, Standing, Team, Match, Scorer } from "@/lib/types"


export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await footballApi.getCompetitions()
        setCompetitions(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { competitions, loading, error }
}


export function useCompetition(competitionId: string) {
  const [competition, setCompetition] = useState<Competition | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!competitionId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await footballApi.getCompetition(competitionId)
        setCompetition(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [competitionId])

  return { competition, loading, error }
}


export function useStandings(competitionId: string) {
  const [standings, setStandings] = useState<Standing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!competitionId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await footballApi.getStandings(competitionId)
        setStandings(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [competitionId])

  return { standings, loading, error }
}


export function useTeams(competitionId: string) {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!competitionId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await footballApi.getTeams(competitionId)
        setTeams(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [competitionId])

  return { teams, loading, error }
}


export function useTeam(teamId: string) {
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!teamId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await footballApi.getTeam(teamId)
        setTeam(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [teamId])

  return { team, loading, error }
}


export function useMatches(
  options: {
    dateFrom?: string
    dateTo?: string
    competitionId?: string
    teamId?: string
    status?: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "SUSPENDED" | "CANCELED"
  } = {},
) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await footballApi.getMatches(options)
        setMatches(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [
    options.dateFrom,
    options.dateTo,
    options.competitionId,
    options.teamId,
    options.status ? JSON.stringify(options.status) : "",
  ])

  return { matches, loading, error }
}


export function useScorers(competitionId: string, limit = 10) {
  const [scorers, setScorers] = useState<Scorer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!competitionId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await footballApi.getScorers(competitionId, limit)
        setScorers(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [competitionId, limit])

  return { scorers, loading, error }
}


export function useApiStatus() {
  const [status, setStatus] = useState<{
    isConnected: boolean
    message: string
    timestamp: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        setLoading(true)
        const data = await footballApi.checkApiStatus()
        setStatus(data)
      } catch (error) {
        console.error("Error checking API status:", error)
        setStatus({
          isConnected: false,
          message: "Error checking API status",
          timestamp: new Date().toISOString(),
        })
      } finally {
        setLoading(false)
      }
    }

    checkStatus()
  }, [])

  return { status, loading }
}


export function useDebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await footballApi.getDebugInfo()
        setDebugInfo(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { debugInfo, loading, error }
}

