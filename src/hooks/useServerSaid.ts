import TServerSaid from "@types/TServerSaid"
import { useState } from "react"

export default function useServerSaid() {
  const SAID_NOTHING = <TServerSaid>{
    code: -1,
    message: '',
    errors: {},
  }

  const [serverSaid, setServerSaid] = useState<TServerSaid>(SAID_NOTHING)
  const clearServerSaid = () => setServerSaid(SAID_NOTHING)
  
  return {
    serverSaid,
    setServerSaid,
    clearServerSaid,
  }
}