import { useEffect, useState } from "react"
import config from "@config/AllConfig"

const { ACCESS_KEY } = config.envy

export default function useAuth() {
  const [auth, setAuth] = useState<TAuthRecord>()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [myAccount, setMyAccount] = useState<Partial<TUserRecord>>()

  const saveAuth = (_auth: TAuthRecord, rememberMe: boolean = true) => {
    setAuth(_auth)
    let storage = rememberMe ? localStorage : sessionStorage

    storage.setItem("accessToken", _auth.accessToken)
    storage.setItem("refreshToken", _auth.refreshToken)
    storage.setItem("duration", _auth.duration)
    storage.setItem("iat", _auth.iat.toString())
    storage.setItem("exp", _auth.exp.toString())
  }

  const dropStorage = (storage: any) => {
    storage.removeItem("accessToken")
    storage.removeItem("refreshToken")
    storage.removeItem("duration")
    storage.removeItem("iat")
    storage.removeItem("exp")
  }

  const dropAuth = () => {
    setAuth(null)
    dropStorage(localStorage)
    dropStorage(sessionStorage)
  }

  useEffect(() => {
    let accessToken: string

    if (!auth) {
      accessToken = !localStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : localStorage.getItem("accessToken")
    } else {
      accessToken = auth.accessToken
    }

    if (accessToken) {
      // Parse Access Token here

      setMyAccount({
        firstName: "Fadlun",
        lastName: "Anaturdasa",
        fullName: "Fadlun Anaturdasa",
      })

      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [auth])

  return {
    saveAuth,
    dropAuth,
    isLoggedIn,
    myAccount,
  }
}
