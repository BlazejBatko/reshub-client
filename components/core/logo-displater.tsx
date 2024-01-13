import React from "react"

import { cn } from "@/lib/utils"

type Props = {
  size: "sm" | "md" | "lg"
}

const LogoDisplayer = ({ size }: Props) => {
  return (
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
  )
}

export default LogoDisplayer
