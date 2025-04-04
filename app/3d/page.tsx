import { FootballScene } from "@/components/3d-football-scene"

export default function ThreeDPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">3D Football Experience</h1>
            <p className="text-muted-foreground">Explore our interactive 3D football visualizations</p>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <FootballScene />
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">Interactive 3D Visualization</h2>
            <p className="text-muted-foreground">
              This 3D scene demonstrates how we can create immersive football experiences. You can rotate, zoom, and
              explore the virtual stadium or toggle to view a rotating football. This is just a sample of what's
              possible with 3D visualization in sports data applications.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

