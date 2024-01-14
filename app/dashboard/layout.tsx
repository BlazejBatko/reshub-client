"use client"

import "@/styles/global.css"

import { useEffect } from "react"

import { checkIfAccessTokenPresent } from "@/lib/cookies"
import useAuth from "@/hooks/useAuth"
import { SiteHeader } from "@/components/site-header"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const auth = useAuth()

  useEffect(() => {
    if (!auth.user && checkIfAccessTokenPresent()) {
      auth.obtainUser()
    }
  }, [auth.user])

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container my-5 flex-1">{children}</div>
    </div>
  )
}
