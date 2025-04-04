import type { Competition, Standing, Team, Match, Scorer } from "./types"

// Enhanced API client for football-data.org
export class FootballApiClient {
  private static instance: FootballApiClient
  private baseUrl = "/api"

  private constructor() {}

  public static getInstance(): FootballApiClient {
    if (!FootballApiClient.instance) {
      FootballApiClient.instance = new FootballApiClient()
    }
    return FootballApiClient.instance
  }

  // Fetch all competitions
  public async getCompetitions(): Promise<Competition[]> {
    try {
      console.log("API Client: Fetching competitions")
      const response = await fetch(`${this.baseUrl}/competitions`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Check if we got an error response with mock data
      if (data.usingMockData) {
        console.warn("API Client: Using mock competition data due to API error:", data.error)
        return data.data
      }

      return data
    } catch (error) {
      console.error("API Client: Error fetching competitions:", error)
      throw error
    }
  }

  // Fetch competition details
  public async getCompetition(competitionId: string): Promise<Competition> {
    try {
      console.log(`API Client: Fetching competition details for ${competitionId}`)
      const response = await fetch(`${this.baseUrl}/competitions/${competitionId}`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Client: Error fetching competition details for ${competitionId}:`, error)
      throw error
    }
  }

  // Fetch standings for a competition
  public async getStandings(competitionId: string): Promise<Standing[]> {
    try {
      console.log(`API Client: Fetching standings for competition ${competitionId}`)
      const response = await fetch(`${this.baseUrl}/standings/${competitionId}`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Check if we got an error response with mock data
      if (data.usingMockData) {
        console.warn(
          `API Client: Using mock standings data for competition ${competitionId} due to API error:`,
          data.error,
        )
        return data.data
      }

      return data
    } catch (error) {
      console.error(`API Client: Error fetching standings for competition ${competitionId}:`, error)
      throw error
    }
  }

  // Fetch teams for a competition
  public async getTeams(competitionId: string): Promise<Team[]> {
    try {
      console.log(`API Client: Fetching teams for competition ${competitionId}`)
      const response = await fetch(`${this.baseUrl}/competitions/${competitionId}/teams`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Client: Error fetching teams for competition ${competitionId}:`, error)
      throw error
    }
  }

  // Fetch team details
  public async getTeam(teamId: string): Promise<Team> {
    try {
      console.log(`API Client: Fetching team details for ${teamId}`)
      const response = await fetch(`${this.baseUrl}/teams/${teamId}`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Client: Error fetching team details for ${teamId}:`, error)
      throw error
    }
  }

  // Fetch matches with optional filters
  public async getMatches(
    options: {
      dateFrom?: string
      dateTo?: string
      competitionId?: string
      teamId?: string
      status?: "SCHEDULED" | "LIVE" | "IN_PLAY" | "PAUSED" | "FINISHED" | "POSTPONED" | "SUSPENDED" | "CANCELED"
    } = {},
  ): Promise<Match[]> {
    try {
      console.log(`API Client: Fetching matches with options:`, options)

      // Build query parameters
      const params = new URLSearchParams()
      if (options.dateFrom) params.append("dateFrom", options.dateFrom)
      if (options.dateTo) params.append("dateTo", options.dateTo)
      if (options.competitionId) params.append("competitionId", options.competitionId)
      if (options.teamId) params.append("teamId", options.teamId)
      if (options.status) params.append("status", options.status)

      const queryString = params.toString() ? `?${params.toString()}` : ""

      const response = await fetch(`${this.baseUrl}/matches${queryString}`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Client: Error fetching matches:`, error)
      throw error
    }
  }

  // Fetch top scorers for a competition
  public async getScorers(competitionId: string, limit = 10): Promise<Scorer[]> {
    try {
      console.log(`API Client: Fetching top scorers for competition ${competitionId}`)
      const response = await fetch(`${this.baseUrl}/competitions/${competitionId}/scorers?limit=${limit}`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API Client: Error fetching scorers for competition ${competitionId}:`, error)
      throw error
    }
  }

  // Check API status
  public async checkApiStatus(): Promise<{
    isConnected: boolean
    message: string
    timestamp: string
  }> {
    try {
      console.log("API Client: Checking API status")
      const response = await fetch(`${this.baseUrl}/status`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Client: Error checking API status:", error)
      return {
        isConnected: false,
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      }
    }
  }

  // Get debug information
  public async getDebugInfo(): Promise<any> {
    try {
      console.log("API Client: Getting debug information")
      const response = await fetch(`${this.baseUrl}/debug`, {
        method: "GET",
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Client: Error getting debug information:", error)
      throw error
    }
  }
}

// Export a singleton instance
export const footballApi = FootballApiClient.getInstance()

