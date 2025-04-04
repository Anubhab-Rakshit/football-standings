import { Suspense } from "react"
import { Loader } from "@/components/loader"
import { HeroSection } from "@/components/hero-section"
import CompetitionExplorer from "@/components/competition-explorer"
import { RecentMatches } from "@/components/recent-matches"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <section className="relative z-10 bg-gradient-to-b from-[#0e1e25] to-[#0a1014] py-20" id="competitions">
        <div className="container mx-auto px-4">
          {/* Recent Matches Section */}
          <div className="mb-16">
          <Suspense fallback={<Loader />}>
            <CompetitionExplorer />
          </Suspense>
          
            <Suspense fallback={<Loader />}>
              <RecentMatches />
            </Suspense>
          </div>

          
        </div>
      </section>
    </main>
  )
}

