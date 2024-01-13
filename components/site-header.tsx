"use client"

import { siteConfig } from "@/config/site"
import useAuth from "@/hooks/useAuth"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "./ui/button"

export function SiteHeader() {
  const { logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
          <Button variant="link">
            <span className="hidden sm:inline" onClick={logout}>
              log out
            </span>
          </Button>
        </div>
      </div>
    </header>
  )
}
