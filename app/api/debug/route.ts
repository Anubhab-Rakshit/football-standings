import { NextResponse } from "next/server"

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY


  let apiKeyValid = false
  let apiResponse = null

  if (apiKey) {
    try {
      const response = await fetch("https://api.football-data.org/v4/competitions", {
        headers: {
          "X-Auth-Token": apiKey,
        },
      })

      apiKeyValid = response.ok
      if (response.ok) {
        const data = await response.json()
        apiResponse = {
          status: response.status,
          competitionsCount: data.count,
        }
      } else {
        apiResponse = {
          status: response.status,
          statusText: response.statusText,
        }
      }
    } catch (error) {
      apiResponse = {
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  return NextResponse.json({
    apiKeyAvailable: !!apiKey,
    apiKeyFirstChars: apiKey ? `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 3)}` : null,
    apiKeyValid,
    apiResponse,
    env: process.env.NODE_ENV,
  })
}

