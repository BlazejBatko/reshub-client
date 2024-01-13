import { useContext } from "react"
import { AuthContext } from "@/context/authProvider"

const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return authContext
}

export default useAuth
