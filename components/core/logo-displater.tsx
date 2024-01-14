import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type Props = {
  size: "sm" | "md" | "lg"
  homeLink?: boolean
}

const LogoDisplayer = ({ size, homeLink }: Props) => {
  return (
    <>
      {homeLink ? (
        <Link href="/dashboard" className="flex items-center space-x-2">
          <LogoDisplayer size="sm" />
        </Link>
      ) : (
        <span
          className={cn(
            "",
            size === "lg" ? "text-7xl" : size === "md" ? "text-2xl" : "text-lg"
          )}
        >
          <span className="font-thin">Res</span>
          <span
            className={cn(
              "inline-block rounded-md border-dashed border-accent-foreground font-semibold"
            )}
          >
            hub
          </span>
        </span>
      )}
    </>
  )
}

export default LogoDisplayer
