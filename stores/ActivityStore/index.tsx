import React, {createContext, useState} from 'react';
// import { AuthStateInterface, AuthActionInterface } from './schema';

const ActivityStore = createContext(null);
const { Provider } = ActivityStore;

function ActivityProvider({ children }: any) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  return (
    <Provider value={{ 
      errorMessage, 
      setErrorMessage,
      isConfirmVisible,
      setIsConfirmVisible,
    }}>
      {children}
    </Provider>
  );
}

export { ActivityStore, ActivityProvider }
