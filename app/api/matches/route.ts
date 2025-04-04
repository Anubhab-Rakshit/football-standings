import { NextResponse } from "next/server"
import { mockRecentMatches } from "@/lib/mock-data"


const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY


const BASE_URL = "https://api.football-data.org/v4"

export async function GET(request: Request) {
  console.log("API Route: Fetching matches")
  console.log("API Key available:", !!API_KEY)

  // Get query parameters
  const url = new URL(request.url)
  const dateFrom = url.searchParams.get("dateFrom")
  const dateTo = url.searchParams.get("dateTo")
  const competitionId = url.searchParams.get("competitionId")
  const teamId = url.searchParams.get("teamId")
  const status = url.searchParams.get("status")

  try {

    if (!API_KEY) {
      console.log("API Route: No API key provided, using mock data")
      return NextResponse.json(mockRecentMatches)
    }

 
    let apiUrl = `${BASE_URL}/matches`

 
    if (competitionId) {
      apiUrl = `${BASE_URL}/competitions/${competitionId}/matches`
    } else if (teamId) {
    
      apiUrl = `${BASE_URL}/teams/${teamId}/matches`
    }

 
    const queryParams = new URLSearchParams()
    if (dateFrom) queryParams.append("dateFrom", dateFrom)
    if (dateTo) queryParams.append("dateTo", dateTo)
    if (status) queryParams.append("status", status)

  
    if (queryParams.toString()) {
      apiUrl += `?${queryParams.toString()}`
    }

    console.log(`API Route: Making request to: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
      next: { revalidate: 900 }, 
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Route: Football API error (${response.status}): ${errorText}`)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log(`API Route: Successfully fetched ${data.count || 0} matches`)

    return NextResponse.json(data.matches || [])
  } catch (error) {
    console.error("API Route: Error fetching matches:", error)

  
    return NextResponse.json({
      data: mockRecentMatches,
      error: error instanceof Error ? error.message : "Unknown error",
      usingMockData: true,
    })
  }
}

