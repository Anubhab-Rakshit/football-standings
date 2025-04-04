// Competition type
export interface Competition {
  id: string
  name: string
  code: string
  type?: string
  emblemUrl?: string
  plan?: string
  area: {
    id?: number
    name: string
    code?: string
    flag?: string
    ensignUrl?: string
  }
  currentSeason?: {
    id?: number
    startDate: string
    endDate: string
    currentMatchday?: number
    winner?: Team
  }
  seasons?: Season[]
  numberOfAvailableSeasons?: number
  lastUpdated?: string
}

// Season type
export interface Season {
  id: number
  startDate: string
  endDate: string
  currentMatchday?: number
  winner?: Team
}

// Team type
export interface Team {
  id: string
  name: string
  shortName?: string
  tla?: string
  crest?: string
  crestUrl?: string // For backward compatibility
  address?: string
  website?: string
  founded?: number
  clubColors?: string
  venue?: string
  coach?: Coach
  squad?: Player[]
  lastUpdated?: string
}

// Coach type
export interface Coach {
  id?: number
  name: string
  dateOfBirth?: string
  nationality?: string
  contract?: {
    start?: string
    until?: string
  }
}

// Player type
export interface Player {
  id: number
  name: string
  position?: string
  dateOfBirth?: string
  nationality?: string
  shirtNumber?: number
}

// Standing type
export interface Standing {
  position: number
  team: Team
  playedGames: number
  form?: string
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
}

// TeamStats extends Standing with additional fields
export interface TeamStats extends Standing {
  // Additional fields for team stats
}

// Match type
export interface Match {
  id: number
  utcDate: string
  status: string
  matchday?: number
  stage?: string
  group?: string
  lastUpdated: string
  homeTeam: {
    id: number
    name: string
    shortName?: string
    tla?: string
    crest?: string
  }
  awayTeam: {
    id: number
    name: string
    shortName?: string
    tla?: string
    crest?: string
  }
  score: {
    winner?: string
    duration?: string
    fullTime: {
      home: number | null
      away: number | null
    }
    halfTime?: {
      home: number | null
      away: number | null
    }
    extraTime?: {
      home: number | null
      away: number | null
    }
    penalties?: {
      home: number | null
      away: number | null
    }
  }
  referees?: Referee[]
}

// Referee type
export interface Referee {
  id: number
  name: string
  type?: string
  nationality?: string
}

// Scorer type
export interface Scorer {
  player: {
    id: number
    name: string
    dateOfBirth?: string
    nationality?: string
    position?: string
    shirtNumber?: number
  }
  team: {
    id: number
    name: string
    shortName?: string
    tla?: string
    crest?: string
  }
  playedMatches: number
  goals: number
  assists?: number
  penalties?: number
}

// API Response types
export interface CompetitionsResponse {
  count: number
  filters: Record<string, any>
  competitions: Competition[]
}

export interface StandingsResponse {
  filters: Record<string, any>
  competition: Competition
  season: Season
  standings: {
    stage: string
    type: string
    group?: string
    table: Standing[]
  }[]
}

export interface TeamsResponse {
  count: number
  filters: Record<string, any>
  competition: Competition
  season: Season
  teams: Team[]
}

export interface MatchesResponse {
  count: number
  filters: Record<string, any>
  competition?: Competition
  matches: Match[]
}

export interface ScorersResponse {
  count: number
  filters: Record<string, any>
  competition: Competition
  season: Season
  scorers: Scorer[]
}

