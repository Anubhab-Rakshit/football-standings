"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

import { Trophy, Menu, X, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ApiStatusIndicator } from "@/components/api-status-indicator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
        
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", repeatDelay: 5 }}
            >
              <Trophy className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">
              Football<span className="text-primary">Verse</span>
            </span>
          </Link>

         
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <Link href="#competitions" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Competitions
            </Link>
            <Link href="/#recent-matches" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Recent-Matches
            </Link>
            
          </div>

         
          <div className="hidden md:flex items-center space-x-4">
            <ApiStatusIndicator />

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-[200px] bg-background/50 border-muted focus:border-primary"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[300px]">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Premier League Update</span>
                    <span className="text-sm text-muted-foreground">
                      Manchester City vs. Arsenal match results are in!
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">New Competition Added</span>
                    <span className="text-sm text-muted-foreground">Copa Libertadores is now available</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

           

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary">U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Favorites</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

 
          <div className="flex md:hidden items-center space-x-4">
            <ApiStatusIndicator />
          
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 w-full bg-background/50" />
              </div>

              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  className="text-foreground/80 hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#competitions"
                  className="text-foreground/80 hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Competitions
                </Link>
                <Link
                  href="#teams"
                  className="text-foreground/80 hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teams
                </Link>
                <Link
                  href="#stats"
                  className="text-foreground/80 hover:text-primary transition-colors py-2 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Stats
                </Link>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary">U</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">User</span>
                </div>
                <Button variant="outline" size="sm">
                  Log In
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

