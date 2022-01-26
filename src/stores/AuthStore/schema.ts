export interface TAuthInfo {
  accessToken: string
  // refreshToken: string
  isLogin: boolean
}

export interface TUserInfo {
  id: string,
  userName: string
  fullName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface TAuthState {
  authInfo: TAuthInfo
  userInfo: TUserInfo
}

export interface TAuthAction {
  type: string
  payload?: any
}

export const initialState = {
  authInfo: {
    accessToken: '',
    // refreshToken: '',
    isLogin: false,
  },
  userInfo: {
    id: '',
    userName: '',
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
}