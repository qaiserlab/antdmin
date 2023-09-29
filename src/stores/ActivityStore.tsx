import React, {createContext, useState} from 'react'
import useAuth from '@stores/useAuth'
import useServerBox from '@stores/useServerBox'

const ActivityStore = createContext(null)
const { Provider } = ActivityStore

interface TProps {
  children: JSX.Element
}

function ActivityProvider({ children }: TProps) {
  const {
    saveAuth,
    dropAuth,
    isLoggedIn,
    myAccount,
  } = useAuth()

  const { 
    serverBox, 
    setServerBox, 
    resetServerBox,
  } = useServerBox()
  
  return (
    <Provider value={{ 
      // Auth
      saveAuth,
      dropAuth,
      isLoggedIn,
      myAccount,
      // Server Said
      serverBox, 
      setServerBox,
      resetServerBox,
    }}>
      {children}
    </Provider>
  )
}

export { ActivityStore, ActivityProvider }
