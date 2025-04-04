import type { Competition, Standing } from "./types"
import { mockCompetitions as initialMockCompetitions, mockStandings as initialMockStandings } from "./mock-data"

// Fetch competitions from our internal API route
export async function fetchCompetitions(): Promise<Competition[]> {
  try {
    console.log("Client: Fetching competitions from internal API route")

    const response = await fetch("/api/competitions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Don't cache the response
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Check if we got an error response with mock data
    if (data.usingMockData) {
      console.warn("Client: Using mock competition data due to API error:", data.error)
      return data.data
    }

    return data
  } catch (error) {
    console.error("Client: Error fetching competitions:", error)
    // Return mock data as fallback
    return initialMockCompetitions
  }
}

// Fetch standings for a specific competition from our internal API route
export async function fetchStandings(competitionId: string): Promise<Standing[]> {
  try {
    console.log(`Client: Fetching standings for competition ${competitionId} from internal API route`)

    const response = await fetch(`/api/standings/${competitionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Don't cache the response
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Check if we got an error response with mock data
    if (data.usingMockData) {
      console.warn(`Client: Using mock standings data for competition ${competitionId} due to API error:`, data.error)
      return data.data
    }

    return data
  } catch (error) {
    console.error(`Client: Error fetching standings for competition ${competitionId}:`, error)
    // Return mock data as fallback
    return initialMockStandings
  }
}

