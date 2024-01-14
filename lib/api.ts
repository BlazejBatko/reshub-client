import { LoginDto, RegisterDto, UserSchema } from "@/types"

import {
  ResidentionPayload,
  ResidentionPayloadSchema,
  ResidentionSchema,
  ResidentionsSchema,
} from "@/types/residention"

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

export const getResidentions = async () => {
  const response = await api.get("/residention")

  try {
    const data = ResidentionsSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const getResidentionDetails = async (id: number) => {
  const response = await api.get(`/residention/${id}`)

  try {
    const data = ResidentionSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const addResidention = async (data: ResidentionPayload) => {
  const response = await api.post("/residention", {
    ...data,
  })

  try {
    const data = ResidentionSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const updateResidention = async (
  id: number,
  data: ResidentionPayload
) => {
  const response = await api.put(`/residention/${id}`, {
    ...data,
  })

  try {
    const data = ResidentionSchema.parse(response.data)

    return data
  } catch (error) {
    console.log(error)
  }
}

export const deleteResidention = async (id: number) => {
  await api.delete(`/residention/${id}`)
}
