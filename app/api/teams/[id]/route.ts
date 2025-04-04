import { NextResponse } from "next/server"


const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY


const BASE_URL = "https://api.football-data.org/v4"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const teamId = params.id
  console.log(`API Route: Fetching team details for team ${teamId}`)
  console.log("API Key available:", !!API_KEY)

  try {
  
    if (!API_KEY) {
      console.log("API Route: No API key provided")
      return NextResponse.json({ error: "API key not configured" }, { status: 401 })
    }

    console.log(`API Route: Making request to football-data.org API for team ${teamId}`)

  
    const response = await fetch(`${BASE_URL}/teams/${teamId}`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
      next: { revalidate: 3600 }, 
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Route: Football API error (${response.status}): ${errorText}`)
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    console.log(`API Route: Successfully fetched team details for ${data.name || teamId}`)

    return NextResponse.json(data)
  } catch (error) {
    console.error(`API Route: Error fetching team details for team ${teamId}:`, error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}

