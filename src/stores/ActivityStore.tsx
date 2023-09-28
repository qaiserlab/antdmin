import React, {createContext, useState} from 'react'
import useAuth from '@stores/useAuth'
import useServerSaid from '@stores/useServerSaid'

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
    serverSaid, 
    setServerSaid, 
    clearServerSaid,
  } = useServerSaid()
  
  return (
    <Provider value={{ 
      // Auth
      saveAuth,
      dropAuth,
      isLoggedIn,
      myAccount,
      // Server Said
      serverSaid, 
      setServerSaid,
      clearServerSaid,
    }}>
      {children}
    </Provider>
  )
}

export { ActivityStore, ActivityProvider }
