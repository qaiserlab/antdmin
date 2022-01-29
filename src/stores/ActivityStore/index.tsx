import React, {createContext, useState} from 'react'
import useServerSaid from '@hooks/useServerSaid'

const ActivityStore = createContext(null)
const { Provider } = ActivityStore

function ActivityProvider({ children }: any) {
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
