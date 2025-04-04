import Link from "next/link"
import { Github, Twitter, Mail, Trophy, Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">
                Football<span className="text-primary">Verse</span>
              </span>
            </div>
            <p className="text-muted-foreground">
              Your immersive source for football standings from top competitions around the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#competitions" className="text-muted-foreground hover:text-primary transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="#teams" className="text-muted-foreground hover:text-primary transition-colors">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="#stats" className="text-muted-foreground hover:text-primary transition-colors">
                  Stats
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Top Leagues</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Premier League
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  La Liga
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Bundesliga
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Serie A
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Ligue 1
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Champions League
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <a
                  href="mailto:info@footballverse.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@footballverse.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-muted/30 border border-border rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="bg-primary text-primary-foreground px-4 rounded-r-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} FootballVerse. All rights reserved.</p>
          <p className="mt-2">
            Powered by{" "}
            <a
              href="https://www.football-data.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              football-data.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

