import { useState } from "react";

export default function useAuth() {
  const [auth, setAuth] = useState<TAuthRecord>()

  const saveAuth = (_auth: TAuthRecord, rememberMe: boolean = true) => {
    setAuth(_auth)

    if (rememberMe) {
      localStorage.setItem('accessToken', _auth.accessToken)
    }
    else {
      sessionStorage.setItem('accessToken', _auth.accessToken)
    }
  }

  return {
    saveAuth,
  }
}