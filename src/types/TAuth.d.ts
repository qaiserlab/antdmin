interface TAuthInfo {
  accessToken: string
  refreshToken: string
  isLogin: boolean
}

interface TAuthState {
  authInfo: TAuthInfo
  userInfo: TUserRecord
}