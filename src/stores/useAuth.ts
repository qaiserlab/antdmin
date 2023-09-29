import { useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import config from "@config/AllConfig"
import { apiV1 } from "@helpers/ApiHelper"

const { ACCESS_KEY } = config.envy

export default function useAuth() {
  const [auth, setAuth] = useState<TAuthRecord>()
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
    apiV1.get("auth/logout").finally(() => {
      setAuth(null)
      dropStorage(localStorage)
      dropStorage(sessionStorage)
    })
  }

  const getAccessToken = () => {
    let accessToken: string

    if (!auth) {
      accessToken = !localStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : localStorage.getItem("accessToken")
    } else {
      accessToken = auth.accessToken
    }

    return accessToken
  }

  const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
      const accessToken = getAccessToken()
      if (!accessToken) reject()
      jwt.verify(accessToken, ACCESS_KEY, (err, decoded: TUserRecord) => {
        if (err) {
          console.log(err)
          return reject()
        }

        resolve(decoded)
      })
    })
  }

  useEffect(() => {
    isLoggedIn().then(({ firstName, lastName, username, email, roleId }) => {
      setMyAccount({
        fullName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        username,
        email,
        roleId,
      })
    })
  }, [auth])

  return {
    saveAuth,
    dropAuth,
    isLoggedIn,
    myAccount,
  }
}
