import React, {createContext, useReducer} from 'react';
import { AuthStateInterface, AuthActionInterface } from './schema';

const initialState = {
  authInfo: {
    accessToken: '',
    refreshToken: '',
    isLogin: false,
  },
  userInfo: {
    userName: '',
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  },
};
const AuthStore = createContext({ state: initialState, dispatch: (payload: any) => {} });
const { Provider } = AuthStore;

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer((state: AuthStateInterface, action: AuthActionInterface) => {
    switch (action.type) {
      case 'login':

        const accessToken = action.payload.authInfo.accessToken;
        const refreshToken = action.payload.authInfo.refreshToken;
        const userInfo = action.payload.userInfo;

        const isLogin = true;
        
        localStorage.accessToken = accessToken;
        localStorage.refreshToken = refreshToken;
        localStorage.isLogin = isLogin;

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
        };
      case 'logout':
        localStorage.accessToken = '';
        localStorage.refreshToken = '';
        localStorage.isLogin = '';

        return initialState;
      default:
        throw new Error();
    }
  }, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
}

export { AuthStore, AuthProvider }
