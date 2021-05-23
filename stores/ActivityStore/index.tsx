import React, {createContext, useState} from 'react';
// import { AuthStateInterface, AuthActionInterface } from './schema';

const ActivityStore = createContext(null);
const { Provider } = ActivityStore;

function ActivityProvider({ children }: any) {
  const [serverResult, setServerResult] = useState({
    code: -1,
    message: '',
    errors: {},
  });
  
  return (
    <Provider value={{ 
      serverResult, 
      setServerResult,
    }}>
      {children}
    </Provider>
  );
}

export { ActivityStore, ActivityProvider }
