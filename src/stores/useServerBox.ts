import { useState } from "react"

export default function useServerBox() {
  const SAID_NOTHING = <TServerBox>{
    code: -1,
    message: '',
    errors: {},
  }

  const [serverBox, setServerBox] = useState<TServerBox>(SAID_NOTHING)
  const resetServerBox = () => setServerBox(SAID_NOTHING)
  
  return {
    serverBox,
    setServerBox,
    resetServerBox,
  }
}