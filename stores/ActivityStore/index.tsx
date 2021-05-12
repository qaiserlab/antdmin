import React, {createContext, useState} from 'react';
// import { AuthStateInterface, AuthActionInterface } from './schema';

const ActivityStore = createContext(null);
const { Provider } = ActivityStore;

function ActivityProvider({ children }: any) {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </Provider>
  );
}

export { ActivityStore, ActivityProvider }
