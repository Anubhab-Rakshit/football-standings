import { NextResponse } from "next/server"
import { mockCompetitions } from "@/lib/mock-data"


const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY


const BASE_URL = "https://api.football-data.org/v4"

export async function GET() {
  console.log("API Route: Fetching competitions")
  console.log("API Key available:", !!API_KEY)

  try {
 
    if (!API_KEY) {
      console.log("API Route: No API key provided, using mock data")
      return NextResponse.json(mockCompetitions)
    }

    console.log("API Route: Making request to football-data.org API")

    const response = await fetch(`${BASE_URL}/competitions`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
      next: { revalidate: 3600 }, 
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Route: Football API error (${response.status}): ${errorText}`)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log(`API Route: Successfully fetched ${data.count || 0} competitions`)

  
    return NextResponse.json(data.competitions)
  } catch (error) {
    console.error("API Route: Error fetching competitions:", error)

  
    return NextResponse.json({
      data: mockCompetitions,
      error: error instanceof Error ? error.message : "Unknown error",
      usingMockData: true,
    })
  }
}

