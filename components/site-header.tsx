"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">AutoSearch</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="#" className="transition-colors hover:text-foreground/80">
            Buy a car
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80">
            Sell your car
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80">
            Car finance
          </Link>
          <Link href="#" className="transition-colors hover:text-foreground/80">
            About us
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Register</Button>
        </div>
      </div>
    </header>
  )
}

