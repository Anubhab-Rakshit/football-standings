import { NextResponse } from "next/server"

const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY
const BASE_URL = "https://api.football-data.org/v4"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const competitionId = params.id
  console.log(`API Route: Fetching teams for competition ${competitionId}`)
  console.log("API Key available:", !!API_KEY)

  try {
    if (!API_KEY) {
      console.log("API Route: No API key provided")
      return NextResponse.json({ error: "API key not configured" }, { status: 401 })
    }

    console.log(`API Route: Making request to football-data.org API for teams in competition ${competitionId}`)

    const response = await fetch(`${BASE_URL}/competitions/${competitionId}/teams`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
      next: { revalidate: 86400 },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API Route: Football API error (${response.status}): ${errorText}`)
      return NextResponse.json({ error: `API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    console.log(`API Route: Successfully fetched ${data.count || 0} teams for competition ${competitionId}`)

    return NextResponse.json(data.teams || [])
  } catch (error) {
    console.error(`API Route: Error fetching teams for competition ${competitionId}:`, error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}