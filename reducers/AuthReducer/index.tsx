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
const authStore = createContext({ state: {}, dispatch: (payload: any) => {} });
const { Provider } = authStore;

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer((state: AuthStateInterface, action: AuthActionInterface) => {
    switch (action.type) {
      case 'login':

        const token = action.payload.token;
        const userInfo = action.payload.userInfo;

        const isLogin = true;

        localStorage.token = token;
        localStorage.isLogin = isLogin;

        return {
          authInfo: {
            ...state.authInfo,
            token,
            isLogin,
          },
          userInfo: {
            ...state.userInfo,
            ...userInfo,
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
