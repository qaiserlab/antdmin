import { useState } from "react"

export default function useServerSaid() {
  const SAID_NOTHING = {
    code: -1,
    message: '',
    errors: {},
  }
  const [serverSaid, setServerSaid] = useState(SAID_NOTHING)
  const clearServerSaid = () => setServerSaid(SAID_NOTHING)
  
  return {
    serverSaid,
    setServerSaid,
    clearServerSaid,
  }
}