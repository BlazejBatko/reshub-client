import React from "react"

import LogoDisplayer from "@/components/core/logo-displater"
import { ThemeToggle } from "@/components/theme-toggle"

type Props = {
  children: React.ReactNode
}

const AuthLayout = ({ children }: Props) => {
  return (
    <section className="h-screen">
      <div className="fixed right-5 top-5">
        <ThemeToggle />
      </div>
      <div className=" grid h-full w-full grid-cols-1 md:grid-cols-2">
        <div className="hidden place-content-center border border-r-primary md:grid">
          <LogoDisplayer size="lg" />
        </div>
        <div className="flex w-full items-center justify-center px-3 md:px-10 ">
          {children}
        </div>
      </div>
    </section>
  )
}

export default AuthLayout
