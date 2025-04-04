import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { InteractiveBackground } from "@/components/interactive-background"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})



export const metadata = {
  title: "FootballVerse | Global Football Standings",
  description: "Explore football standings from top competitions around the world in an immersive experience",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <InteractiveBackground />
          <div className="relative min-h-screen">
            <Navbar />
            {children}
            <Footer />
            <Toaster />
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

