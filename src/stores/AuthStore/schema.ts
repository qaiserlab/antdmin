export interface AuthInfoInterface {
  accessToken: string
  // refreshToken: string
  isLogin: boolean
}

export interface UserInfoInterface {
  id: string,
  userName: string
  fullName: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface AuthStateInterface {
  authInfo: AuthInfoInterface
  userInfo: UserInfoInterface
}

export interface AuthActionInterface {
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