import TUserRecord from "./TUserRecord"

export interface TAuthInfo {
  accessToken: string
  // refreshToken: string
  isLogin: boolean
}

export interface TAuthState {
  authInfo: TAuthInfo
  userInfo: TUserRecord
}