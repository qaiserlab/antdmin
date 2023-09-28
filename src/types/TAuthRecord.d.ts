interface TAuthRecord {
  accessToken: string
  refreshToken?: string
  duration: string
  iat: number
  exp: number
}