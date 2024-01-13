"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { checkIfAccessTokenPresent } from "@/lib/cookies"
import useAuth from "@/hooks/useAuth"

export default function IndexPage() {
  const router = useRouter()

  useEffect(() => {
    if (checkIfAccessTokenPresent()) {
      return router.push("/dashboard")
    }

    router.push("/auth/login")
  }, [])
  return <span>loading..</span>
}
