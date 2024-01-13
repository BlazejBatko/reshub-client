import { createContext, use, useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginDto, RegisterDto, User } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { logout as apiLogout, getMe, login, register } from "@/lib/api"
import { toast } from "@/components/ui/use-toast"

type AuthContext = {
  user: User | null
  loginIsPending: boolean
  registerIsPending: boolean
  obtainMeIsPending: boolean
  isLogoutPending: boolean
  signin: (data: LoginDto) => void
  singup: (data: RegisterDto) => void
  obtainUser: () => void
  logout: () => void
}

type AuthProvider = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: AuthProvider) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  const { mutate: loginMutation, isPending: loginIsPending } = useMutation({
    mutationFn: (payload: LoginDto) => login(payload),
    onSuccess: (data) => {
      if (data) {
        setUser(data)
        router.push("/dashboard")
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error",
        description: error.response?.data.message,
      })
    },
  })

  const { mutate: registerMutation, isPending: registerIsPending } =
    useMutation({
      mutationFn: (payload: RegisterDto) => register(payload),
      onSuccess: (data) => {
        data && setUser(data)
        router.push("/dashboard")
      },
      onError: (error: AxiosError<{ message: string }>) => {
        toast({
          title: "Error",
          description: error.response?.data.message,
        })
        console.log(error)
      },
    })

  const { mutate: getMeMutation, isPending: obtainMeIsPending } = useMutation({
    mutationFn: () => getMe(),
    onSuccess: (data) => {
      data && setUser(data)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error",
        description: error.response?.data.message,
      })
      console.log(error)
      return router.push("/auth/login")
    },
  })

  const { mutate: logoutMutation, isPending: isLogoutPending } = useMutation({
    mutationFn: () => apiLogout(),
    onSuccess: () => {
      setUser(null)
      router.push("/auth/login")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error",
        description: error.response?.data.message,
      })
      console.log(error)
    },
  })

  const singup = useCallback((data: RegisterDto) => {
    registerMutation(data)
  }, [])

  const obtainUser = useCallback(() => {
    getMeMutation()
  }, [])

  const signin = useCallback((data: LoginDto) => {
    loginMutation(data)
  }, [])

  const logout = useCallback(() => {
    logoutMutation()
  }, [])

  const value = useMemo(
    () => ({
      user,
      signin,
      logout,
      singup,
      obtainUser,
      isLogoutPending,
      obtainMeIsPending,
      loginIsPending,
      registerIsPending,
    }),
    [
      user,
      signin,
      singup,
      obtainUser,
      loginIsPending,
      registerIsPending,
      isLogoutPending,
      obtainMeIsPending,
      logout,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
