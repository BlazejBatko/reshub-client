import { LoginDto, RegisterDto, UserSchema } from "@/types"

import api from "./axios"

export const login = async (data: LoginDto) => {
  const response = await api.post("/auth/login", {
    ...data,
  })

  try {
    const data = UserSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const register = async (data: RegisterDto) => {
  const response = await api.post("/auth/signup", {
    ...data,
  })

  try {
    const data = UserSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getMe = async () => {
  const response = await api.get("/users/me")

  try {
    const data = UserSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const logout = async () => {
  await api.post("/auth/logout")
}
