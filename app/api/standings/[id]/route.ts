import { NextResponse } from "next/server"
import { mockStandings } from "@/lib/mock-data"


const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY


const BASE_URL = "https://api.football-data.org/v4"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const competitionId = params.id
  console.log(`API Route: Fetching standings for competition ${competitionId}`)
  console.log("API Key available:", !!API_KEY)

  try {

    if (!API_KEY) {
      console.log("API Route: No API key provided, using mock data")
      return NextResponse.json(mockStandings)
    }

    console.log(`API Route: Making request to football-data.org API for competition ${competitionId}`)


    const response = await fetch(`${BASE_URL}/competitions/${competitionId}/standings`, {
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


    if (!data.standings || !data.standings[0] || !data.standings[0].table) {
      console.error("API Route: Invalid standings data structure:", data)
      throw new Error("Invalid standings data structure")
    }

    console.log(`API Route: Successfully fetched ${data.standings[0].table.length || 0} standings entries`)

    
    return NextResponse.json(data.standings[0].table)
  } catch (error) {
    console.error(`API Route: Error fetching standings for competition ${competitionId}:`, error)

    return NextResponse.json({
      data: mockStandings,
      error: error instanceof Error ? error.message : "Unknown error",
      usingMockData: true,
    })
  }
}

