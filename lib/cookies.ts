import { parseCookies, setCookie } from "nookies"

export const isAuthorized = !!parseCookies().access_token

export const setAccessToken = (token: string) => {
  setCookie(null, "access_token", token, {
    path: "/",
  })
}

export const clearTokens = () => {
  setCookie(null, "access_token", "", {
    path: "/",
  })
}

export const checkIfAccessTokenPresent = () => {
  return !!parseCookies().access_token
}
