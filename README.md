# FootballVerse - Football Standings & Stats Platform

<img width="1510" alt="image" src="https://github.com/user-attachments/assets/825d57b5-80a9-4050-9fea-82bde2b2428d" />


## Overview

FootballVerse is a modern, interactive web application that provides real-time football standings, match results, and team statistics from top leagues around the world. Built with Next.js and powered by the football-data.org API, it offers a seamless and engaging experience for football enthusiasts.

## Features

### Core Features

- **Live Standings**
  - Real-time league tables from top football competitions
  - Sortable columns for points, goals, and other statistics
  - Color-coded positions (Champions League, Europa League, relegation)
  - Team filtering and search functionality

- **Recent Matches**
  - View recent and upcoming matches with live scores
  - Match status indicators (scheduled, in-play, finished)
  - Organized by date with time information
  - Auto-refreshing data

- **Top Teams Explorer**
  - Explore the best performing teams across different leagues
  - Tabbed interface for browsing by league or viewing all top teams
  - Performance metrics and form indicators
  - Quick access to detailed team statistics

- **Team Statistics**
  - Detailed stats and performance metrics for each team
  - Win/loss/draw breakdown with visualizations
  - Goal analysis (scored vs. conceded)
  - Form indicators and position history
  - Interactive charts and data visualizations

### UI/UX Features

- **Interactive UI**
  - Smooth animations and transitions using Framer Motion
  - Responsive design for all devices (mobile, tablet, desktop)
  - Interactive elements with hover and click effects
  - Loading states and error handling

- **3D Elements**
  - Interactive 3D football visualizations using Three.js
  - 3D stadium model and rotating football
  - Particle effects and interactive backgrounds
  - Performance-optimized rendering

- **Theme Support**
  - Toggle between dark and light themes
  - Persistent theme preference storage
  - Automatic system theme detection
  - Consistent styling across themes

## Screenshots

<img width="1507" alt="image" src="https://github.com/user-attachments/assets/4cf87183-b7da-42a2-b3b3-77141dc88b23" />

<img width="1511" alt="image" src="https://github.com/user-attachments/assets/cddd8d8b-059b-4334-9e8c-f40f1759df31" />


<img width="1499" alt="image" src="https://github.com/user-attachments/assets/bd96c028-15aa-4cc5-a943-45dc0ebbb4ef" />



## Tech Stack

### Frontend

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: 
  - [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
  - [shadcn/ui](https://ui.shadcn.com/) for accessible UI components
- **State Management**: React Hooks and Context API
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) for smooth animations
  - CSS animations and transitions
- **3D Rendering**: 
  - [Three.js](https://threejs.org/) for 3D graphics
  - [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) for React integration
  - [@react-three/drei](https://github.com/pmndrs/drei) for Three.js helpers
- **Data Visualization**: 
  - [Recharts](https://recharts.org/) for charts and graphs
  - Custom canvas-based visualizations

### Backend & Data

- **API**: [football-data.org](https://www.football-data.org/) for football data
- **API Integration**: Custom Next.js API routes with error handling
- **Caching**: SWR for data fetching and caching
- **Mock Data**: Fallback data for development and API outages

### DevOps & Infrastructure

- **Deployment**: [Vercel](https://vercel.com/) for hosting and CI/CD
- **Version Control**: Git and GitHub
- **Package Management**: npm/yarn/pnpm
- **Linting & Formatting**: ESLint and Prettier

## Architecture

### Data Flow Architecture

![data-flow-architecture](https://github.com/user-attachments/assets/88b0ccb4-b3bd-45e3-a86d-7e9077fc6fdc)

## Component Architecture

![component-architecture](https://github.com/user-attachments/assets/930044da-cbc3-4d3f-b19a-1a214ee3f2d7)

## API Integration Flow

![api-integration-flow](https://github.com/user-attachments/assets/dee285fe-41f5-49c2-8870-6d4f114db563)

## State Management Flow

![state-management-flow](https://github.com/user-attachments/assets/8e327b71-cece-43ed-90b4-b101aa2f9a5e)



The application uses a layered approach to fetch and display data:

1. **Client Components** request data through custom hooks (`useCompetitions`, `useStandings`, etc.)
2. **API Client** (`lib/api.ts` and `lib/api-client.ts`) provides standardized methods to fetch data
3. **Next.js API Routes** act as a middleware, adding the API key and handling errors
4. **football-data.org API** provides the actual football data
5. **Mock Data** serves as a fallback when the API is unavailable or for development



## Project Structure

The project follows a well-organized structure to maintain code clarity and separation of concerns:
```
football-standings/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── competitions/     # Competition endpoints
│   │   │   ├── route.ts      # GET all competitions
│   │   │   ├── [id]/         # Competition by ID
│   │   │   │   ├── route.ts  # GET competition details
│   │   │   │   ├── teams/    # Teams in competition
│   │   │   │   └── scorers/  # Top scorers in competition
│   │   ├── matches/          # Matches endpoints
│   │   │   └── route.ts      # GET matches with filters
│   │   ├── standings/        # Standings endpoints
│   │   │   └── [id]/         # Standings by competition ID
│   │   │       └── route.ts  # GET standings
│   │   ├── status/           # API status endpoint
│   │   │   └── route.ts      # GET API status
│   │   ├── teams/            # Teams endpoints
│   │   │   └── [id]/         # Team by ID
│   │   │       └── route.ts  # GET team details
│   │   └── debug/            # Debug endpoints
│   │       └── route.ts      # GET debug info
│   ├── about/                # About page
│   │   └── page.tsx          # About page component
│   ├── competitions/         # Competitions page
│   │   └── page.tsx          # Competitions page component
│   ├── stats/                # Statistics page
│   │   └── page.tsx          # Stats page component
│   ├── top-teams/            # Top teams page
│   │   └── page.tsx          # Top teams page component
│   ├── 3d/                   # 3D visualizations page
│   │   └── page.tsx          # 3D page component
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/               # React components
│   ├── 3d/                   # 3D-related components
│   │   ├── hero-scene.tsx    # 3D hero scene
│   │   └── use-system-font.tsx # Font loader for 3D text
│   ├── ui/                   # UI components (shadcn)
│   │   ├── button.tsx        # Button component
│   │   ├── card.tsx          # Card component
│   │   ├── dialog.tsx        # Dialog component
│   │   ├── input.tsx         # Input component
│   │   ├── table.tsx         # Table component
│   │   ├── tabs.tsx          # Tabs component
│   │   ├── toast.tsx         # Toast component
│   │   └── ...               # Other UI components
│   ├── standings-table.tsx   # Standings table component
│   ├── standings-table-skeleton.tsx # Loading skeleton
│   ├── team-details-dialog.tsx # Team details modal
│   ├── team-stats.tsx        # Team statistics component
│   ├── recent-matches.tsx    # Recent matches component
│   ├── competition-explorer.tsx # Competition explorer
│   ├── competition-selector.tsx # Competition selector
│   ├── hero-section.tsx      # Hero section component
│   ├── top-teams-section.tsx # Top teams component
│   ├── footer.tsx            # Footer component
│   ├── navbar.tsx            # Navigation bar
│   ├── mode-toggle.tsx       # Theme toggle
│   ├── api-status-indicator.tsx # API status indicator
│   ├── api-debug-panel.tsx   # API debug panel
│   ├── loader.tsx            # Loading spinner
│   ├── analytics.tsx         # Analytics component
│   ├── football-particles.tsx # Interactive particles
│   ├── 3d-football-scene.tsx # 3D football scene
│   ├── 3d-football-card.tsx  # 3D football card
│   ├── interactive-background.tsx # Interactive background
│   └── theme-provider.tsx    # Theme provider
├── hooks/                    # Custom React hooks
│   ├── use-football-api.ts   # Hook for API calls
│   ├── use-mobile.tsx        # Mobile detection hook
│   └── use-toast.ts          # Toast notification hook
├── lib/                      # Utility functions and types
│   ├── api.ts                # API client functions
│   ├── api-client.ts         # Enhanced API client
│   ├── api-status.ts         # API status checker
│   ├── mock-data.ts          # Mock data for fallback
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
│   ├── leagues/              # League logos
│   │   ├── premier-league.png # Premier League logo
│   │   ├── la-liga.png       # La Liga logo
│   │   ├── bundesliga.png    # Bundesliga logo
│   │   ├── serie-a.png       # Serie A logo
│   │   └── ligue-1.png       # Ligue 1 logo
│   ├── screenshots/          # Application screenshots
│   ├── football-logo.png     # App logo
│   ├── football-icon.png     # Football icon
│   ├── stadium-bg.png       # Stadium background
│   └── ...                   # Other assets
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
├── .env.example              # Example environment variables
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
├── LICENSE                   # License file
└── README.md                 # Project documentation

```


## API Integration

### API Workflow

1. **Client Components** request data through custom hooks (`useCompetitions`, `useStandings`, etc.)
2. **API Client** (`lib/api.ts` and `lib/api-client.ts`) provides standardized methods to fetch data
3. **Next.js API Routes** act as a middleware, adding the API key and handling errors
4. **football-data.org API** provides the actual football data
5. **Mock Data** serves as a fallback when the API is unavailable or for development

### API Endpoints



| Endpoint | Description | Parameters |
|----------|-------------|------------|
| `/api/competitions` | Get all competitions | None |
| `/api/competitions/:id` | Get competition details | `id`: Competition ID |
| `/api/competitions/:id/teams` | Get teams in a competition | `id`: Competition ID |
| `/api/competitions/:id/scorers` | Get top scorers in a competition | `id`: Competition ID, `limit`: Number of scorers |
| `/api/standings/:id` | Get standings for a competition | `id`: Competition ID |
| `/api/teams/:id` | Get team details | `id`: Team ID |
| `/api/matches` | Get matches | `dateFrom`, `dateTo`, `competitionId`, `teamId`, `status` |
| `/api/status` | Check API status | None |
| `/api/debug` | Get debug information | None |

### API Key Management

The application uses the `NEXT_PUBLIC_FOOTBALL_DATA_API_KEY` environment variable to authenticate with the football-data.org API. This key is securely passed through the Next.js API routes.

### Error Handling

The API integration includes comprehensive error handling:

1. **API Unavailability**: Falls back to mock data
2. **Rate Limiting**: Handles 429 errors with appropriate messaging
3. **Authentication Errors**: Provides clear feedback for API key issues
4. **Network Errors**: Graceful degradation with offline support
5. **Data Validation**: Ensures data integrity before rendering

## Installation and Setup

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- Git

### Step 1: Clone the repository

```bash
git clone https://github.com/yourusername/football-standings.git
cd football-standings
```

### Step 2: Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

###Step 3: Set up environment variables
```
Create a .env.local file in the root directory:
NEXT_PUBLIC_FOOTBALL_DATA_API_KEY=your_api_key_here
You can obtain an API key from football-data.org.
```
### Step 4: Run the development server
```
npm run dev
# or
yarn dev
# or
pnpm dev
```
### Step 5: Open http://localhost:3000 in your browser

## Development Workflow

# Code Style and Linting
The project uses ESLint and Prettier for code quality and formatting:\
```
# Run linting
npm run lint
# Format code
npm run format
```
# Building for Production
```
# Create production build
npm run build
# Start production server
npm start
```


## Deployment
The application is configured for easy deployment on Vercel:
Fork the repository on GitHub
Create a new project on Vercel
Connect your GitHub repository
Add the required environment variables
Deploy
For other platforms, build the application and deploy the .next directory according to the platform's documentation.

## Common Issues and Troubleshooting
### API Key Issues
Problem: "API key not configured" error Solution: Ensure you've added the ```NEXT_PUBLIC_FOOTBALL_DATA_API_KEY``` to your ```.env.local``` file and restarted the development server.
### Build Errors
Problem: TypeScript errors during build Solution: Run ```npm run lint``` to identify and fix type issues.
### Data Not Loading
Problem: Competitions or standings not loading Solution: Check the API status indicator. If the API is down, the application will use mock data. You can also check the browser console for specific error messages.
3D Rendering Issues
Problem: 3D elements not rendering correctly Solution: Ensure your browser supports WebGL. Try updating your graphics drivers or using a different browser.

## Roadmap

### Short-term Goals
- Add user authentication for personalized experiences
- Implement favorites system for teams and competitions
- Add more detailed player statistics
- Enhance 3D visualizations with more interactive elements
- Implement PWA features for offline support
### Medium-term Goals
- Add match predictions based on historical data
- Implement social sharing features
- Create a notification system for match updates
- Add more leagues and competitions
- Develop a mobile app using React Native

### Long-term Vision
- Create a community platform for discussions
- Implement fantasy football features
- Develop advanced analytics and visualizations
- Add multi-language support
- Integrate with more data sources for comprehensive coverage
 
## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Getting Started
Fork the repository
- Create your feature branch ```(git checkout -b feature/amazing-feature)```
- Commit your changes ```(git commit -m 'Add some amazing feature')```
- Push to the branch ```(git push origin feature/amazing-feature)```
- Open a Pull Request
  
## Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting a PR





