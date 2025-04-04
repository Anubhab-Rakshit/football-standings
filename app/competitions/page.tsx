import { Suspense } from "react"
import CompetitionSelector from "@/components/competition-selector"
import { StandingsTableSkeleton } from "@/components/standings-table-skeleton"

export default function CompetitionsPage({ searchParams }: { searchParams: { id?: string } }) {
 
  const competitionId = searchParams.id || null

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl w-full mx-auto grid gap-2 mb-8">
          <h1 className="font-semibold text-3xl">Football Competitions</h1>
          <p className="text-muted-foreground">Browse and explore football competitions from around the world</p>
        </div>

        <CompetitionSelector initialCompetitionId={competitionId} />
        <Suspense fallback={<StandingsTableSkeleton />}></Suspense>
      </div>
    </main>
  )
}

