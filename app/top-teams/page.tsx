import { Suspense } from "react"
import { TopTeamsSection } from "@/components/top-teams-section"
import { Loader } from "@/components/loader"

export default function TopTeamsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0e1e25] to-[#0a1014] py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Top Football Teams</h1>
            <p className="text-muted-foreground">The best performing teams from top leagues around the world</p>
          </div>

          <Suspense fallback={<Loader />}>
            <TopTeamsSection />
          </Suspense>
        </div>
      </div>
    </main>
  )
}

