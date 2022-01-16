import React, {createContext, useState} from 'react'
// import { AuthStateInterface, AuthActionInterface } from './schema'

const ActivityStore = createContext(null)
const { Provider } = ActivityStore

function ActivityProvider({ children }: any) {
  const SAID_NOTHING = {
    code: -1,
    message: '',
    errors: {},
  }
  const [serverSaid, setServerSaid] = useState(SAID_NOTHING)
  const clearServerSaid = () => setServerSaid(SAID_NOTHING)
  
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
