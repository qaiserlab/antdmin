import React, {createContext, useReducer} from 'react';
import { AuthStateInterface, AuthActionInterface } from './schema';

const initialState = {
  authInfo: {
    token: '',
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
const authStore = createContext({ state: {}, dispatch: {} });
const { Provider } = authStore;

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer((state: AuthStateInterface, action: AuthActionInterface) => {
    switch (action.type) {
      case 'login':
        localStorage.token = action.payload.authInfo.token;
        localStorage.isLogin = action.payload.authInfo.isLogin;

        return {
          authInfo: {
            ...state.authInfo,
            ...action.payload.authInfo,
            isLogin: true
          },
          userInfo: {
            ...state.userInfo,
            ...action.payload.userInfo
          }
        };
      case 'logout':
        localStorage.token = '';
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

export { authStore, AuthProvider }
