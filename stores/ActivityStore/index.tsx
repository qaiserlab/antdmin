import React, {createContext, useState} from 'react';
// import { AuthStateInterface, AuthActionInterface } from './schema';

const ActivityStore = createContext(null);
const { Provider } = ActivityStore;

function ActivityProvider({ children }: any) {
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmBox, setConfirmBox] = useState({
    message: '',
    isVisible: false,
    onOk: () => {},
  });
  
  return (
    <Provider value={{ 
      errorMessage, 
      setErrorMessage,
      confirmBox,
      setConfirmBox,
    }}>
      {children}
    </Provider>
  );
}

export { ActivityStore, ActivityProvider }
