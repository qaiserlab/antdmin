import React, {createContext, useReducer} from 'react'
import { AuthStateInterface, AuthActionInterface, initialState } from './schema'

const AuthStore = createContext({ state: initialState, dispatch: (payload: any) => {} })
const { Provider } = AuthStore

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer((state: AuthStateInterface, action: AuthActionInterface) => {
    switch (action.type) {
      case 'login':

        const accessToken = action.payload.authInfo.accessToken
        // const refreshToken = action.payload.authInfo.refreshToken
        const userInfo = action.payload.userInfo

        const isLogin = true
        
        sessionStorage.setItem('accessToken', accessToken)
        // sessionStorage.setItem('refreshToken', refreshToken)

        return {
          authInfo: {
            ...state.authInfo,
            accessToken,
            // refreshToken,
            isLogin,
          },
          userInfo: {
            ...state.userInfo,
            ...userInfo,
          }
        }

      case 'refresh':
        console.log({
          authInfo: {
            ...state.authInfo,
            accessToken: sessionStorage.accessToken,
            // refreshToken: sessionStorage.refreshToken,
            isLogin: true,
          },
          userInfo: {
            ...state.userInfo,
            ...action.payload.userInfo,
          }
        })
        return {
          authInfo: {
            ...state.authInfo,
            accessToken: sessionStorage.accessToken,
            // refreshToken: sessionStorage.refreshToken,
            isLogin: true,
          },
          userInfo: {
            ...state.userInfo,
            ...action.payload.userInfo,
          }
        }
      case 'logout':
        sessionStorage.setItem('accessToken', '')
        // sessionStorage.setItem('refreshToken', '')
        
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
