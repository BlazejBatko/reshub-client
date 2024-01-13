"use client"

import React from "react"
import { AuthProvider } from "@/context/authProvider"

type Props = {
  children: React.ReactNode
}

const AuthProviderWrapper = ({ children }: Props) => {
  return <AuthProvider>{children}</AuthProvider>
}

export default AuthProviderWrapper
