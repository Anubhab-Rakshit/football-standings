import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Globe, Database, Code } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight">About Football Standings</h1>
            <p className="text-xl text-muted-foreground">
              Your ultimate destination for football league tables and statistics
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              Football Standings was created with a simple mission: to provide football fans with a clean, intuitive way
              to access up-to-date standings from leagues around the world. We believe that accessing sports data should
              be simple, fast, and enjoyable.
            </p>
            <p className="text-muted-foreground">
              Our platform aggregates data from reliable sources and presents it in a user-friendly format, allowing you
              to quickly find the information you need about your favorite teams and leagues.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Trophy className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Comprehensive Coverage</CardTitle>
                  <CardDescription>Access standings from major leagues worldwide</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We cover all major football competitions including Premier League, La Liga, Bundesliga, Serie A, Ligue
                  1, and many more from around the globe.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Database className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Real-time Updates</CardTitle>
                  <CardDescription>Stay current with the latest standings</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our platform regularly syncs with official data sources to ensure you always have access to the most
                  up-to-date standings and statistics.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Fan-Focused</CardTitle>
                  <CardDescription>Built by fans, for fans</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We're passionate football supporters ourselves, and we've designed this platform with the fan
                  experience in mind, focusing on what matters most to you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Globe className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Global Reach</CardTitle>
                  <CardDescription>Football from every corner of the world</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  From the biggest European leagues to competitions in South America, Asia, and beyond, we aim to be
                  your one-stop destination for football standings worldwide.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Technology</h2>
            <p className="text-muted-foreground">
              Football Standings is built using modern web technologies to ensure a fast, responsive experience across
              all devices. We leverage the power of Next.js, React, and Tailwind CSS on the frontend, with a robust API
              integration on the backend.
            </p>
            <div className="flex items-center justify-center py-6">
              <Code className="h-16 w-16 text-primary opacity-50" />
            </div>
            <p className="text-muted-foreground">
              Our data is sourced from the football-data.org API, which provides comprehensive, accurate information
              about football competitions, teams, and matches.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <p className="text-muted-foreground">
              Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to us at
              <a href="mailto:contact@footballstandings.com" className="text-primary hover:underline ml-1">
                contact@footballstandings.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

