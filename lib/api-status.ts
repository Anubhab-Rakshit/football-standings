// API key for football-data.org
const API_KEY = process.env.NEXT_PUBLIC_FOOTBALL_DATA_API_KEY

// Base URL for the football-data.org API
const BASE_URL = "https://api.football-data.org/v4"

export async function checkApiStatus(): Promise<{
  isConnected: boolean
  message: string
  timestamp: string
}> {
  try {
    if (!API_KEY) {
      return {
        isConnected: false,
        message: "API key not configured",
        timestamp: new Date().toISOString(),
      }
    }

    // Use the competitions endpoint to check API status as it's lightweight
    const response = await fetch(`${BASE_URL}/competitions`, {
      headers: {
        "X-Auth-Token": API_KEY,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      const errorText = await response.text()
      return {
        isConnected: false,
        message: `API error: ${response.status} - ${errorText}`,
        timestamp: new Date().toISOString(),
      }
    }

    const data = await response.json()
    const competitionsCount = data.count || 0

    return {
      isConnected: true,
      message: `Connected successfully. Found ${competitionsCount} competitions.`,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      isConnected: false,
      message: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    }
  }
}

