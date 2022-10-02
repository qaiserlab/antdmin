import React, {createContext, useState} from 'react'
import useServerSaid from '@hooks/activity/useServerSaid'

const ActivityStore = createContext(null)
const { Provider } = ActivityStore

interface TProps {
  children: JSX.Element
}

function ActivityProvider({ children }: TProps) {
  const { serverSaid, setServerSaid, clearServerSaid } = useServerSaid()
  
  return (
    <Provider value={{ 
      serverSaid, 
      setServerSaid,
      clearServerSaid,
    }}>
      {children}
    </Provider>
  )
}

export { ActivityStore, ActivityProvider }
