import React, {createContext, useReducer} from 'react'
import jwt from 'jsonwebtoken'

import { initialState } from './schema'

const AuthStore = createContext({ state: initialState, dispatch: (payload: any) => {} })
const { Provider } = AuthStore

function AuthProvider({ children }: TWrapperProps) {
  const [state, dispatch] = useReducer((state: TAuthState, action: TAction) => {
    const API_ACCESS_KEY = process.env.API_ACCESS_KEY 

    switch (action.type) {
      case 'login':

        const accessToken = action.payload.authInfo.accessToken
        const refreshToken = action.payload.authInfo.refreshToken
        const userInfo = jwt.verify(accessToken, API_ACCESS_KEY)

        const isLogin = true
        
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)

        return {
          authInfo: {
            ...state.authInfo,
            accessToken,
            refreshToken,
            isLogin,
          },
          userInfo: {
            ...state.userInfo,
            ...userInfo,
          }
        }

      case 'refresh':
        const newUserInfo = jwt.verify(localStorage.accessToken, API_ACCESS_KEY)
        
        return {
          authInfo: {
            ...state.authInfo,
            accessToken: localStorage.accessToken,
            refreshToken: localStorage.refreshToken,
            isLogin: true,
          },
          // userInfo: {
          //   ...state.userInfo,
          //   ...action.payload.userInfo,
          // }
          userInfo: {
            ...newUserInfo,
          }
        }
      case 'logout':
        localStorage.setItem('accessToken', '')
        localStorage.setItem('refreshToken', '')
        
        return initialState
      default:
        throw new Error()
    }
  }, initialState)

  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  )
}

export { AuthStore, AuthProvider }
