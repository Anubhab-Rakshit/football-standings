import type { Competition, Standing, Team, Match, Scorer, Player } from "./types"

// Mock data for competitions
export const mockCompetitions: Competition[] = [
  {
    id: "PL",
    name: "Premier League",
    code: "PL",
    emblemUrl: "https://crests.football-data.org/PL.png",
    area: { name: "England", ensignUrl: "https://crests.football-data.org/770.svg" },
    currentSeason: { startDate: "2023-08-11", endDate: "2024-05-19" },
  },
  {
    id: "PD",
    name: "La Liga",
    code: "PD",
    emblemUrl: "https://crests.football-data.org/PD.png",
    area: { name: "Spain", ensignUrl: "https://crests.football-data.org/760.svg" },
    currentSeason: { startDate: "2023-08-11", endDate: "2024-05-26" },
  },
  {
    id: "BL1",
    name: "Bundesliga",
    code: "BL1",
    emblemUrl: "https://crests.football-data.org/BL1.png",
    area: { name: "Germany", ensignUrl: "https://crests.football-data.org/759.svg" },
    currentSeason: { startDate: "2023-08-18", endDate: "2024-05-18" },
  },
  {
    id: "SA",
    name: "Serie A",
    code: "SA",
    emblemUrl: "https://crests.football-data.org/SA.png",
    area: { name: "Italy", ensignUrl: "https://crests.football-data.org/784.svg" },
    currentSeason: { startDate: "2023-08-19", endDate: "2024-05-26" },
  },
  {
    id: "FL1",
    name: "Ligue 1",
    code: "FL1",
    emblemUrl: "https://crests.football-data.org/FL1.png",
    area: { name: "France", ensignUrl: "https://crests.football-data.org/773.svg" },
    currentSeason: { startDate: "2023-08-11", endDate: "2024-05-19" },
  },
  {
    id: "CL",
    name: "UEFA Champions League",
    code: "CL",
    emblemUrl: "https://crests.football-data.org/CL.png",
    area: { name: "Europe", ensignUrl: "https://crests.football-data.org/EUR.svg" },
    currentSeason: { startDate: "2023-09-19", endDate: "2024-06-01" },
  },
  {
    id: "DED",
    name: "Eredivisie",
    code: "DED",
    emblemUrl: "https://crests.football-data.org/DED.png",
    area: { name: "Netherlands", ensignUrl: "https://crests.football-data.org/8601.svg" },
    currentSeason: { startDate: "2023-08-11", endDate: "2024-05-19" },
  },
  {
    id: "PPL",
    name: "Primeira Liga",
    code: "PPL",
    emblemUrl: "https://crests.football-data.org/PPL.png",
    area: { name: "Portugal", ensignUrl: "https://crests.football-data.org/765.svg" },
    currentSeason: { startDate: "2023-08-11", endDate: "2024-05-19" },
  },
  {
    id: "BSA",
    name: "Campeonato Brasileiro Série A",
    code: "BSA",
    emblemUrl: "https://crests.football-data.org/BSA.png",
    area: { name: "Brazil", ensignUrl: "https://crests.football-data.org/764.svg" },
    currentSeason: { startDate: "2023-04-15", endDate: "2023-12-03" },
  },
  {
    id: "ELC",
    name: "Championship",
    code: "ELC",
    emblemUrl: "https://crests.football-data.org/ELC.png",
    area: { name: "England", ensignUrl: "https://crests.football-data.org/770.svg" },
    currentSeason: { startDate: "2023-08-04", endDate: "2024-05-04" },
  },
]

// Mock data for standings
export const mockStandings: Standing[] = [
  {
    position: 1,
    team: { id: "1", name: "Arsenal FC", crestUrl: "https://crests.football-data.org/57.png" },
    playedGames: 38,
    won: 28,
    draw: 6,
    lost: 4,
    points: 90,
    goalsFor: 85,
    goalsAgainst: 29,
    goalDifference: 56,
    form: "WWDWW",
  },
  {
    position: 2,
    team: { id: "2", name: "Manchester City FC", crestUrl: "https://crests.football-data.org/65.png" },
    playedGames: 38,
    won: 27,
    draw: 7,
    lost: 4,
    points: 88,
    goalsFor: 94,
    goalsAgainst: 35,
    goalDifference: 59,
    form: "WWWWW",
  },
  {
    position: 3,
    team: { id: "3", name: "Liverpool FC", crestUrl: "https://crests.football-data.org/64.png" },
    playedGames: 38,
    won: 24,
    draw: 10,
    lost: 4,
    points: 82,
    goalsFor: 85,
    goalsAgainst: 41,
    goalDifference: 44,
    form: "WDWLW",
  },
  {
    position: 4,
    team: { id: "4", name: "Aston Villa FC", crestUrl: "https://crests.football-data.org/58.png" },
    playedGames: 38,
    won: 22,
    draw: 7,
    lost: 9,
    points: 73,
    goalsFor: 76,
    goalsAgainst: 51,
    goalDifference: 25,
    form: "LWWDW",
  },
  {
    position: 5,
    team: { id: "5", name: "Tottenham Hotspur FC", crestUrl: "https://crests.football-data.org/73.png" },
    playedGames: 38,
    won: 20,
    draw: 6,
    lost: 12,
    points: 66,
    goalsFor: 74,
    goalsAgainst: 61,
    goalDifference: 13,
    form: "WLWDL",
  },
  {
    position: 6,
    team: { id: "6", name: "Manchester United FC", crestUrl: "https://crests.football-data.org/66.png" },
    playedGames: 38,
    won: 18,
    draw: 8,
    lost: 12,
    points: 62,
    goalsFor: 57,
    goalsAgainst: 58,
    goalDifference: -1,
    form: "WLWDW",
  },
  {
    position: 7,
    team: { id: "7", name: "Newcastle United FC", crestUrl: "https://crests.football-data.org/67.png" },
    playedGames: 38,
    won: 16,
    draw: 9,
    lost: 13,
    points: 57,
    goalsFor: 85,
    goalsAgainst: 59,
    goalDifference: 26,
    form: "WDWLW",
  },
  {
    position: 8,
    team: { id: "8", name: "Chelsea FC", crestUrl: "https://crests.football-data.org/61.png" },
    playedGames: 38,
    won: 16,
    draw: 9,
    lost: 13,
    points: 57,
    goalsFor: 77,
    goalsAgainst: 63,
    goalDifference: 14,
    form: "WWWLL",
  },
  {
    position: 9,
    team: { id: "9", name: "West Ham United FC", crestUrl: "https://crests.football-data.org/563.png" },
    playedGames: 38,
    won: 13,
    draw: 9,
    lost: 16,
    points: 48,
    goalsFor: 54,
    goalsAgainst: 69,
    goalDifference: -15,
    form: "LWDLW",
  },
  {
    position: 10,
    team: { id: "10", name: "Brighton & Hove Albion FC", crestUrl: "https://crests.football-data.org/397.png" },
    playedGames: 38,
    won: 12,
    draw: 12,
    lost: 14,
    points: 48,
    goalsFor: 53,
    goalsAgainst: 65,
    goalDifference: -12,
    form: "DLDWL",
  },
  {
    position: 11,
    team: { id: "11", name: "Crystal Palace FC", crestUrl: "https://crests.football-data.org/354.png" },
    playedGames: 38,
    won: 12,
    draw: 11,
    lost: 15,
    points: 47,
    goalsFor: 49,
    goalsAgainst: 58,
    goalDifference: -9,
    form: "WLWWL",
  },
  {
    position: 12,
    team: { id: "12", name: "Brentford FC", crestUrl: "https://crests.football-data.org/402.png" },
    playedGames: 38,
    won: 11,
    draw: 11,
    lost: 16,
    points: 44,
    goalsFor: 54,
    goalsAgainst: 59,
    goalDifference: -5,
    form: "LWDLD",
  },
  {
    position: 13,
    team: { id: "13", name: "Fulham FC", crestUrl: "https://crests.football-data.org/63.png" },
    playedGames: 38,
    won: 11,
    draw: 8,
    lost: 19,
    points: 41,
    goalsFor: 49,
    goalsAgainst: 65,
    goalDifference: -16,
    form: "LLDWL",
  },
  {
    position: 14,
    team: { id: "14", name: "Wolverhampton Wanderers FC", crestUrl: "https://crests.football-data.org/76.png" },
    playedGames: 38,
    won: 11,
    draw: 7,
    lost: 20,
    points: 40,
    goalsFor: 46,
    goalsAgainst: 68,
    goalDifference: -22,
    form: "WLLWL",
  },
  {
    position: 15,
    team: { id: "15", name: "AFC Bournemouth", crestUrl: "https://crests.football-data.org/1044.png" },
    playedGames: 38,
    won: 10,
    draw: 9,
    lost: 19,
    points: 39,
    goalsFor: 46,
    goalsAgainst: 71,
    goalDifference: -25,
    form: "LWLLL",
  },
  {
    position: 16,
    team: { id: "16", name: "Everton FC", crestUrl: "https://crests.football-data.org/62.png" },
    playedGames: 38,
    won: 11,
    draw: 9,
    lost: 18,
    points: 36,
    goalsFor: 40,
    goalsAgainst: 52,
    goalDifference: -12,
    form: "WLWDL",
  },
  {
    position: 17,
    team: { id: "17", name: "Nottingham Forest FC", crestUrl: "https://crests.football-data.org/65.png" },
    playedGames: 38,
    won: 8,
    draw: 10,
    lost: 20,
    points: 34,
    goalsFor: 49,
    goalsAgainst: 72,
    goalDifference: -23,
    form: "WDLWL",
  },
  {
    position: 18,
    team: { id: "18", name: "Burnley FC", crestUrl: "https://crests.football-data.org/328.png" },
    playedGames: 38,
    won: 5,
    draw: 8,
    lost: 25,
    points: 23,
    goalsFor: 33,
    goalsAgainst: 79,
    goalDifference: -46,
    form: "LLLWL",
  },
  {
    position: 19,
    team: { id: "19", name: "Sheffield United FC", crestUrl: "https://crests.football-data.org/356.png" },
    playedGames: 38,
    won: 3,
    draw: 7,
    lost: 28,
    points: 16,
    goalsFor: 35,
    goalsAgainst: 104,
    goalDifference: -69,
    form: "LLLLL",
  },
  {
    position: 20,
    team: { id: "20", name: "Luton Town FC", crestUrl: "https://crests.football-data.org/389.png" },
    playedGames: 38,
    won: 3,
    draw: 6,
    lost: 29,
    points: 15,
    goalsFor: 30,
    goalsAgainst: 89,
    goalDifference: -59,
    form: "LLLLL",
  },
]

// Mock data for teams
export const mockTeams: Team[] = [
  {
    id: "57",
    name: "Arsenal FC",
    shortName: "Arsenal",
    tla: "ARS",
    crest: "https://crests.football-data.org/57.png",
    address: "75 Drayton Park London N5 1BU",
    website: "http://www.arsenal.com",
    founded: 1886,
    clubColors: "Red / White",
    venue: "Emirates Stadium",
    coach: {
      id: 11603,
      name: "Mikel Arteta",
      dateOfBirth: "1982-03-26",
      nationality: "Spain",
    },
  },
  {
    id: "65",
    name: "Manchester City FC",
    shortName: "Man City",
    tla: "MCI",
    crest: "https://crests.football-data.org/65.png",
    address: "SportCity Manchester M11 3FF",
    website: "https://www.mancity.com",
    founded: 1880,
    clubColors: "Sky Blue / White",
    venue: "Etihad Stadium",
    coach: {
      id: 11603,
      name: "Pep Guardiola",
      dateOfBirth: "1971-01-18",
      nationality: "Spain",
    },
  },
  {
    id: "64",
    name: "Liverpool FC",
    shortName: "Liverpool",
    tla: "LIV",
    crest: "https://crests.football-data.org/64.png",
    address: "Anfield Road Liverpool L4 0TH",
    website: "http://www.liverpoolfc.tv",
    founded: 1892,
    clubColors: "Red / White",
    venue: "Anfield",
    coach: {
      id: 9344,
      name: "Jürgen Klopp",
      dateOfBirth: "1967-06-16",
      nationality: "Germany",
    },
  },
  {
    id: "66",
    name: "Manchester United FC",
    shortName: "Man United",
    tla: "MUN",
    crest: "https://crests.football-data.org/66.png",
    address: "Sir Matt Busby Way Manchester M16 0RA",
    website: "http://www.manutd.com",
    founded: 1878,
    clubColors: "Red / White",
    venue: "Old Trafford",
    coach: {
      id: 9594,
      name: "Erik ten Hag",
      dateOfBirth: "1970-02-02",
      nationality: "Netherlands",
    },
  },
  {
    id: "61",
    name: "Chelsea FC",
    shortName: "Chelsea",
    tla: "CHE",
    crest: "https://crests.football-data.org/61.png",
    address: "Fulham Road London SW6 1HS",
    website: "http://www.chelseafc.com",
    founded: 1905,
    clubColors: "Blue / White",
    venue: "Stamford Bridge",
    coach: {
      id: 24550,
      name: "Mauricio Pochettino",
      dateOfBirth: "1972-03-02",
      nationality: "Argentina",
    },
  },
]

// Mock data for players
export const mockPlayers: Player[] = [
  {
    id: 3754,
    name: "Bukayo Saka",
    position: "Attacker",
    dateOfBirth: "2001-09-05",
    nationality: "England",
    shirtNumber: 7,
  },
  {
    id: 3180,
    name: "Martin Ødegaard",
    position: "Midfielder",
    dateOfBirth: "1998-12-17",
    nationality: "Norway",
    shirtNumber: 8,
  },
  {
    id: 3182,
    name: "Gabriel Jesus",
    position: "Attacker",
    dateOfBirth: "1997-04-03",
    nationality: "Brazil",
    shirtNumber: 9,
  },
  {
    id: 3647,
    name: "Erling Haaland",
    position: "Attacker",
    dateOfBirth: "2000-07-21",
    nationality: "Norway",
    shirtNumber: 9,
  },
  {
    id: 3254,
    name: "Kevin De Bruyne",
    position: "Midfielder",
    dateOfBirth: "1991-06-28",
    nationality: "Belgium",
    shirtNumber: 17,
  },
  {
    id: 3318,
    name: "Mohamed Salah",
    position: "Attacker",
    dateOfBirth: "1992-06-15",
    nationality: "Egypt",
    shirtNumber: 11,
  },
  {
    id: 3320,
    name: "Virgil van Dijk",
    position: "Defender",
    dateOfBirth: "1991-07-08",
    nationality: "Netherlands",
    shirtNumber: 4,
  },
  {
    id: 3231,
    name: "Bruno Fernandes",
    position: "Midfielder",
    dateOfBirth: "1994-09-08",
    nationality: "Portugal",
    shirtNumber: 8,
  },
  {
    id: 3492,
    name: "Marcus Rashford",
    position: "Attacker",
    dateOfBirth: "1997-10-31",
    nationality: "England",
    shirtNumber: 10,
  },
  {
    id: 3653,
    name: "Cole Palmer",
    position: "Midfielder",
    dateOfBirth: "2002-05-06",
    nationality: "England",
    shirtNumber: 20,
  },
]

// Mock data for matches
export const mockMatches: Match[] = [
  {
    id: 419432,
    utcDate: "2023-08-11T19:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T02:20:25Z",
    homeTeam: {
      id: 402,
      name: "Brentford FC",
      shortName: "Brentford",
      tla: "BRE",
      crest: "https://crests.football-data.org/402.png",
    },
    awayTeam: {
      id: 73,
      name: "Tottenham Hotspur FC",
      shortName: "Tottenham",
      tla: "TOT",
      crest: "https://crests.football-data.org/73.png",
    },
    score: {
      winner: "AWAY_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 1,
        away: 2,
      },
      halfTime: {
        home: 0,
        away: 1,
      },
    },
    referees: [
      {
        id: 11585,
        name: "Robert Jones",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419433,
    utcDate: "2023-08-12T11:30:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T14:20:25Z",
    homeTeam: {
      id: 57,
      name: "Arsenal FC",
      shortName: "Arsenal",
      tla: "ARS",
      crest: "https://crests.football-data.org/57.png",
    },
    awayTeam: {
      id: 351,
      name: "Nottingham Forest FC",
      shortName: "Nottingham",
      tla: "NOT",
      crest: "https://crests.football-data.org/351.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 2,
        away: 1,
      },
      halfTime: {
        home: 2,
        away: 0,
      },
    },
    referees: [
      {
        id: 11580,
        name: "Anthony Taylor",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419434,
    utcDate: "2023-08-12T14:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T17:20:25Z",
    homeTeam: {
      id: 1044,
      name: "AFC Bournemouth",
      shortName: "Bournemouth",
      tla: "BOU",
      crest: "https://crests.football-data.org/1044.png",
    },
    awayTeam: {
      id: 563,
      name: "West Ham United FC",
      shortName: "West Ham",
      tla: "WHU",
      crest: "https://crests.football-data.org/563.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 1,
        away: 0,
      },
      halfTime: {
        home: 0,
        away: 0,
      },
    },
    referees: [
      {
        id: 11575,
        name: "Mike Dean",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419435,
    utcDate: "2023-08-12T14:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T17:20:25Z",
    homeTeam: {
      id: 397,
      name: "Brighton & Hove Albion FC",
      shortName: "Brighton",
      tla: "BHA",
      crest: "https://crests.football-data.org/397.png",
    },
    awayTeam: {
      id: 389,
      name: "Luton Town FC",
      shortName: "Luton Town",
      tla: "LUT",
      crest: "https://crests.football-data.org/389.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 4,
        away: 1,
      },
      halfTime: {
        home: 2,
        away: 1,
      },
    },
    referees: [
      {
        id: 11581,
        name: "Craig Pawson",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419436,
    utcDate: "2023-08-12T14:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T17:20:25Z",
    homeTeam: {
      id: 62,
      name: "Everton FC",
      shortName: "Everton",
      tla: "EVE",
      crest: "https://crests.football-data.org/62.png",
    },
    awayTeam: {
      id: 63,
      name: "Fulham FC",
      shortName: "Fulham",
      tla: "FUL",
      crest: "https://crests.football-data.org/63.png",
    },
    score: {
      winner: "AWAY_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 0,
        away: 1,
      },
      halfTime: {
        home: 0,
        away: 0,
      },
    },
    referees: [
      {
        id: 11585,
        name: "Stuart Attwell",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419437,
    utcDate: "2023-08-12T14:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T17:20:25Z",
    homeTeam: {
      id: 356,
      name: "Sheffield United FC",
      shortName: "Sheffield Utd",
      tla: "SHE",
      crest: "https://crests.football-data.org/356.png",
    },
    awayTeam: {
      id: 354,
      name: "Crystal Palace FC",
      shortName: "Crystal Palace",
      tla: "CRY",
      crest: "https://crests.football-data.org/354.png",
    },
    score: {
      winner: "DRAW",
      duration: "REGULAR",
      fullTime: {
        home: 0,
        away: 0,
      },
      halfTime: {
        home: 0,
        away: 0,
      },
    },
    referees: [
      {
        id: 11580,
        name: "Michael Oliver",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419438,
    utcDate: "2023-08-12T16:30:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-12T19:20:25Z",
    homeTeam: {
      id: 67,
      name: "Newcastle United FC",
      shortName: "Newcastle",
      tla: "NEW",
      crest: "https://crests.football-data.org/67.png",
    },
    awayTeam: {
      id: 58,
      name: "Aston Villa FC",
      shortName: "Aston Villa",
      tla: "AVL",
      crest: "https://crests.football-data.org/58.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 5,
        away: 1,
      },
      halfTime: {
        home: 2,
        away: 1,
      },
    },
    referees: [
      {
        id: 11575,
        name: "Andre Marriner",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419439,
    utcDate: "2023-08-13T13:30:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-13T16:20:25Z",
    homeTeam: {
      id: 66,
      name: "Manchester United FC",
      shortName: "Man United",
      tla: "MUN",
      crest: "https://crests.football-data.org/66.png",
    },
    awayTeam: {
      id: 76,
      name: "Wolverhampton Wanderers FC",
      shortName: "Wolverhampton",
      tla: "WOL",
      crest: "https://crests.football-data.org/76.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 1,
        away: 0,
      },
      halfTime: {
        home: 1,
        away: 0,
      },
    },
    referees: [
      {
        id: 11581,
        name: "Simon Hooper",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419440,
    utcDate: "2023-08-13T16:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-13T19:20:25Z",
    homeTeam: {
      id: 65,
      name: "Manchester City FC",
      shortName: "Man City",
      tla: "MCI",
      crest: "https://crests.football-data.org/65.png",
    },
    awayTeam: {
      id: 328,
      name: "Burnley FC",
      shortName: "Burnley",
      tla: "BUR",
      crest: "https://crests.football-data.org/328.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 3,
        away: 0,
      },
      halfTime: {
        home: 2,
        away: 0,
      },
    },
    referees: [
      {
        id: 11580,
        name: "Craig Pawson",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419441,
    utcDate: "2023-08-14T19:00:00Z",
    status: "FINISHED",
    matchday: 1,
    stage: "REGULAR_SEASON",
    lastUpdated: "2023-08-14T22:20:25Z",
    homeTeam: {
      id: 61,
      name: "Chelsea FC",
      shortName: "Chelsea",
      tla: "CHE",
      crest: "https://crests.football-data.org/61.png",
    },
    awayTeam: {
      id: 64,
      name: "Liverpool FC",
      shortName: "Liverpool",
      tla: "LIV",
      crest: "https://crests.football-data.org/64.png",
    },
    score: {
      winner: "DRAW",
      duration: "REGULAR",
      fullTime: {
        home: 1,
        away: 1,
      },
      halfTime: {
        home: 0,
        away: 1,
      },
    },
    referees: [
      {
        id: 11575,
        name: "Anthony Taylor",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
]

// Mock data for scorers
export const mockScorers: Scorer[] = [
  {
    player: {
      id: 3647,
      name: "Erling Haaland",
      dateOfBirth: "2000-07-21",
      nationality: "Norway",
      position: "Attacker",
      shirtNumber: 9,
    },
    team: {
      id: 65,
      name: "Manchester City FC",
      shortName: "Man City",
      tla: "MCI",
      crest: "https://crests.football-data.org/65.png",
    },
    playedMatches: 35,
    goals: 36,
    assists: 8,
    penalties: 7,
  },
  {
    player: {
      id: 3318,
      name: "Mohamed Salah",
      dateOfBirth: "1992-06-15",
      nationality: "Egypt",
      position: "Attacker",
      shirtNumber: 11,
    },
    team: {
      id: 64,
      name: "Liverpool FC",
      shortName: "Liverpool",
      tla: "LIV",
      crest: "https://crests.football-data.org/64.png",
    },
    playedMatches: 37,
    goals: 24,
    assists: 13,
    penalties: 3,
  },
  {
    player: {
      id: 3754,
      name: "Bukayo Saka",
      dateOfBirth: "2001-09-05",
      nationality: "England",
      position: "Attacker",
      shirtNumber: 7,
    },
    team: {
      id: 57,
      name: "Arsenal FC",
      shortName: "Arsenal",
      tla: "ARS",
      crest: "https://crests.football-data.org/57.png",
    },
    playedMatches: 38,
    goals: 20,
    assists: 14,
    penalties: 5,
  },
  {
    player: {
      id: 3653,
      name: "Cole Palmer",
      dateOfBirth: "2002-05-06",
      nationality: "England",
      position: "Midfielder",
      shirtNumber: 20,
    },
    team: {
      id: 61,
      name: "Chelsea FC",
      shortName: "Chelsea",
      tla: "CHE",
      crest: "https://crests.football-data.org/61.png",
    },
    playedMatches: 34,
    goals: 22,
    assists: 11,
    penalties: 6,
  },
  {
    player: {
      id: 3492,
      name: "Marcus Rashford",
      dateOfBirth: "1997-10-31",
      nationality: "England",
      position: "Attacker",
      shirtNumber: 10,
    },
    team: {
      id: 66,
      name: "Manchester United FC",
      shortName: "Man United",
      tla: "MUN",
      crest: "https://crests.football-data.org/66.png",
    },
    playedMatches: 36,
    goals: 17,
    assists: 5,
    penalties: 0,
  },
  {
    player: {
      id: 3180,
      name: "Martin Ødegaard",
      dateOfBirth: "1998-12-17",
      nationality: "Norway",
      position: "Midfielder",
      shirtNumber: 8,
    },
    team: {
      id: 57,
      name: "Arsenal FC",
      shortName: "Arsenal",
      tla: "ARS",
      crest: "https://crests.football-data.org/57.png",
    },
    playedMatches: 36,
    goals: 15,
    assists: 8,
    penalties: 0,
  },
  {
    player: {
      id: 3254,
      name: "Kevin De Bruyne",
      dateOfBirth: "1991-06-28",
      nationality: "Belgium",
      position: "Midfielder",
      shirtNumber: 17,
    },
    team: {
      id: 65,
      name: "Manchester City FC",
      shortName: "Man City",
      tla: "MCI",
      crest: "https://crests.football-data.org/65.png",
    },
    playedMatches: 25,
    goals: 8,
    assists: 17,
    penalties: 0,
  },
  {
    player: {
      id: 3231,
      name: "Bruno Fernandes",
      dateOfBirth: "1994-09-08",
      nationality: "Portugal",
      position: "Midfielder",
      shirtNumber: 8,
    },
    team: {
      id: 66,
      name: "Manchester United FC",
      shortName: "Man United",
      tla: "MUN",
      crest: "https://crests.football-data.org/66.png",
    },
    playedMatches: 38,
    goals: 10,
    assists: 8,
    penalties: 3,
  },
  {
    player: {
      id: 3182,
      name: "Gabriel Jesus",
      dateOfBirth: "1997-04-03",
      nationality: "Brazil",
      position: "Attacker",
      shirtNumber: 9,
    },
    team: {
      id: 57,
      name: "Arsenal FC",
      shortName: "Arsenal",
      tla: "ARS",
      crest: "https://crests.football-data.org/57.png",
    },
    playedMatches: 28,
    goals: 8,
    assists: 7,
    penalties: 0,
  },
  {
    player: {
      id: 3320,
      name: "Virgil van Dijk",
      dateOfBirth: "1991-07-08",
      nationality: "Netherlands",
      position: "Defender",
      shirtNumber: 4,
    },
    team: {
      id: 64,
      name: "Liverpool FC",
      shortName: "Liverpool",
      tla: "LIV",
      crest: "https://crests.football-data.org/64.png",
    },
    playedMatches: 37,
    goals: 3,
    assists: 1,
    penalties: 0,
  },
]

// Mock data for a single competition with more details
export const mockCompetitionDetails: Competition = {
  id: "PL",
  name: "Premier League",
  code: "PL",
  type: "LEAGUE",
  emblemUrl: "https://crests.football-data.org/PL.png",
  plan: "TIER_ONE",
  area: {
    id: 2072,
    name: "England",
    code: "ENG",
    flag: "https://crests.football-data.org/770.svg",
  },
  currentSeason: {
    id: 1564,
    startDate: "2023-08-11",
    endDate: "2024-05-19",
    currentMatchday: 38,
  },
  seasons: [
    {
      id: 1564,
      startDate: "2023-08-11",
      endDate: "2024-05-19",
      currentMatchday: 38,
    },
    {
      id: 1490,
      startDate: "2022-08-05",
      endDate: "2023-05-28",
      currentMatchday: 38,
      winner: {
        id: "65",
        name: "Manchester City FC",
        shortName: "Man City",
        tla: "MCI",
        crest: "https://crests.football-data.org/65.png",
      },
    },
    {
      id: 1180,
      startDate: "2021-08-13",
      endDate: "2022-05-22",
      currentMatchday: 38,
      winner: {
        id: "65",
        name: "Manchester City FC",
        shortName: "Man City",
        tla: "MCI",
        crest: "https://crests.football-data.org/65.png",
      },
    },
  ],
  numberOfAvailableSeasons: 32,
  lastUpdated: "2023-06-30T10:52:19Z",
}

// Mock data for a single team with more details
export const mockTeamDetails: Team = {
  id: "57",
  name: "Arsenal FC",
  shortName: "Arsenal",
  tla: "ARS",
  crest: "https://crests.football-data.org/57.png",
  address: "75 Drayton Park London N5 1BU",
  website: "http://www.arsenal.com",
  founded: 1886,
  clubColors: "Red / White",
  venue: "Emirates Stadium",
  coach: {
    id: 11603,
    name: "Mikel Arteta",
    dateOfBirth: "1982-03-26",
    nationality: "Spain",
    contract: {
      start: "2019-12-20",
      until: "2025-05-30",
    },
  },
  squad: [
    {
      id: 3754,
      name: "Bukayo Saka",
      position: "Attacker",
      dateOfBirth: "2001-09-05",
      nationality: "England",
      shirtNumber: 7,
    },
    {
      id: 3180,
      name: "Martin Ødegaard",
      position: "Midfielder",
      dateOfBirth: "1998-12-17",
      nationality: "Norway",
      shirtNumber: 8,
    },
    {
      id: 3182,
      name: "Gabriel Jesus",
      position: "Attacker",
      dateOfBirth: "1997-04-03",
      nationality: "Brazil",
      shirtNumber: 9,
    },
    {
      id: 3761,
      name: "William Saliba",
      position: "Defender",
      dateOfBirth: "2001-03-24",
      nationality: "France",
      shirtNumber: 2,
    },
    {
      id: 3764,
      name: "Gabriel Magalhães",
      position: "Defender",
      dateOfBirth: "1997-12-19",
      nationality: "Brazil",
      shirtNumber: 6,
    },
    {
      id: 3766,
      name: "Thomas Partey",
      position: "Midfielder",
      dateOfBirth: "1993-06-13",
      nationality: "Ghana",
      shirtNumber: 5,
    },
    {
      id: 3768,
      name: "Declan Rice",
      position: "Midfielder",
      dateOfBirth: "1999-01-14",
      nationality: "England",
      shirtNumber: 41,
    },
    {
      id: 3770,
      name: "Kai Havertz",
      position: "Attacker",
      dateOfBirth: "1999-06-11",
      nationality: "Germany",
      shirtNumber: 29,
    },
    {
      id: 3772,
      name: "Aaron Ramsdale",
      position: "Goalkeeper",
      dateOfBirth: "1998-05-14",
      nationality: "England",
      shirtNumber: 1,
    },
    {
      id: 3774,
      name: "Ben White",
      position: "Defender",
      dateOfBirth: "1997-10-08",
      nationality: "England",
      shirtNumber: 4,
    },
  ],
  lastUpdated: "2023-06-30T10:52:19Z",
}

// Mock data for recent matches with different statuses
export const mockRecentMatches: Match[] = [
  {
    id: 419432,
    utcDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    status: "FINISHED",
    matchday: 32,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 65,
      name: "Manchester City FC",
      shortName: "Man City",
      tla: "MCI",
      crest: "https://crests.football-data.org/65.png",
    },
    awayTeam: {
      id: 58,
      name: "Aston Villa FC",
      shortName: "Aston Villa",
      tla: "AVL",
      crest: "https://crests.football-data.org/58.png",
    },
    score: {
      winner: "HOME_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 4,
        away: 1,
      },
      halfTime: {
        home: 2,
        away: 0,
      },
    },
    referees: [
      {
        id: 11580,
        name: "Anthony Taylor",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419433,
    utcDate: new Date().toISOString(), // Today
    status: "IN_PLAY",
    matchday: 32,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 57,
      name: "Arsenal FC",
      shortName: "Arsenal",
      tla: "ARS",
      crest: "https://crests.football-data.org/57.png",
    },
    awayTeam: {
      id: 563,
      name: "West Ham United FC",
      shortName: "West Ham",
      tla: "WHU",
      crest: "https://crests.football-data.org/563.png",
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: 2,
        away: 0,
      },
      halfTime: {
        home: 1,
        away: 0,
      },
    },
    referees: [
      {
        id: 11575,
        name: "Mike Dean",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419434,
    utcDate: new Date().toISOString(), // Today
    status: "PAUSED",
    matchday: 32,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 73,
      name: "Tottenham Hotspur FC",
      shortName: "Tottenham",
      tla: "TOT",
      crest: "https://crests.football-data.org/73.png",
    },
    awayTeam: {
      id: 67,
      name: "Newcastle United FC",
      shortName: "Newcastle",
      tla: "NEW",
      crest: "https://crests.football-data.org/67.png",
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: 1,
        away: 1,
      },
      halfTime: {
        home: 1,
        away: 0,
      },
    },
    referees: [
      {
        id: 11581,
        name: "Craig Pawson",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419435,
    utcDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    status: "SCHEDULED",
    matchday: 32,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 64,
      name: "Liverpool FC",
      shortName: "Liverpool",
      tla: "LIV",
      crest: "https://crests.football-data.org/64.png",
    },
    awayTeam: {
      id: 66,
      name: "Manchester United FC",
      shortName: "Man United",
      tla: "MUN",
      crest: "https://crests.football-data.org/66.png",
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: null,
        away: null,
      },
      halfTime: {
        home: null,
        away: null,
      },
    },
    referees: [
      {
        id: 11580,
        name: "Michael Oliver",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419436,
    utcDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    status: "SCHEDULED",
    matchday: 32,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 61,
      name: "Chelsea FC",
      shortName: "Chelsea",
      tla: "CHE",
      crest: "https://crests.football-data.org/61.png",
    },
    awayTeam: {
      id: 62,
      name: "Everton FC",
      shortName: "Everton",
      tla: "EVE",
      crest: "https://crests.football-data.org/62.png",
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: null,
        away: null,
      },
      halfTime: {
        home: null,
        away: null,
      },
    },
    referees: [
      {
        id: 11575,
        name: "Andre Marriner",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419437,
    utcDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    status: "SCHEDULED",
    matchday: 32,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 76,
      name: "Wolverhampton Wanderers FC",
      shortName: "Wolverhampton",
      tla: "WOL",
      crest: "https://crests.football-data.org/76.png",
    },
    awayTeam: {
      id: 354,
      name: "Crystal Palace FC",
      shortName: "Crystal Palace",
      tla: "CRY",
      crest: "https://crests.football-data.org/354.png",
    },
    score: {
      winner: null,
      duration: "REGULAR",
      fullTime: {
        home: null,
        away: null,
      },
      halfTime: {
        home: null,
        away: null,
      },
    },
    referees: [
      {
        id: 11580,
        name: "Michael Oliver",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419438,
    utcDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: "FINISHED",
    matchday: 31,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 328,
      name: "Burnley FC",
      shortName: "Burnley",
      tla: "BUR",
      crest: "https://crests.football-data.org/328.png",
    },
    awayTeam: {
      id: 397,
      name: "Brighton & Hove Albion FC",
      shortName: "Brighton",
      tla: "BHA",
      crest: "https://crests.football-data.org/397.png",
    },
    score: {
      winner: "AWAY_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 1,
        away: 3,
      },
      halfTime: {
        home: 1,
        away: 1,
      },
    },
    referees: [
      {
        id: 11575,
        name: "Andre Marriner",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
  {
    id: 419439,
    utcDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: "FINISHED",
    matchday: 31,
    stage: "REGULAR_SEASON",
    lastUpdated: new Date().toISOString(),
    homeTeam: {
      id: 356,
      name: "Sheffield United FC",
      shortName: "Sheffield Utd",
      tla: "SHE",
      crest: "https://crests.football-data.org/356.png",
    },
    awayTeam: {
      id: 1044,
      name: "AFC Bournemouth",
      shortName: "Bournemouth",
      tla: "BOU",
      crest: "https://crests.football-data.org/1044.png",
    },
    score: {
      winner: "AWAY_TEAM",
      duration: "REGULAR",
      fullTime: {
        home: 0,
        away: 3,
      },
      halfTime: {
        home: 0,
        away: 2,
      },
    },
    referees: [
      {
        id: 11581,
        name: "Simon Hooper",
        type: "REFEREE",
        nationality: "England",
      },
    ],
  },
]

// Update the mockData export to include the recent matches
export const mockData = {
  competitions: mockCompetitions,
  standings: mockStandings,
  teams: mockTeams,
  players: mockPlayers,
  matches: [...mockMatches, ...mockRecentMatches], // Combine both match arrays
  scorers: mockScorers,
  competitionDetails: mockCompetitionDetails,
  teamDetails: mockTeamDetails,
}

