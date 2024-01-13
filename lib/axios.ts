import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { parseCookies } from "nookies"

type ExtendedAxiosRequestConfig = {
  _retry?: boolean
} & AxiosRequestConfig

export const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
})

api.interceptors.request.use(async (config) => {
  try {
    const accessToken = parseCookies().access_token

    console.log(accessToken)

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  } catch (error) {
    console.error("Error attaching token to request:", error)
    throw error
  }
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  }
)

export default api
