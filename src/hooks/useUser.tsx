import { useState } from "react"
import { apiV1 } from "@helpers/ApiHelper"

export default function useUser() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<TUserRecord[]>([])
  const [userActive, setUserActive] = useState<TUserRecord>()

  const fetchPaginateUsers = (page: number = 1) => {
    setLoading(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .get<{ message: string; users: TUserRecord[] }>("/users", {
          params: { page },
        })
        .then((response) => {
          const data = response.data
          setUsers(data.users)
          resolve(data.message)
        })
        .catch((error) => {
          const data = error?.response?.data
          reject(data?.message)
        })
        .finally(() => setLoading(false))
    })
  }

  const fetchUserActiveById = (id: number) => {
    setLoading(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .get<{ message: string; user: TUserRecord }>(`/users/${id}`)
        .then((response) => {
          const data = response.data
          setUserActive(data.user)
          resolve(data.message)
        })
        .catch((error) => {
          const data = error?.response?.data
          reject(data?.message)
        })
        .finally(() => setLoading(false))
    })
  }

  const deleteUserActiveById = (id: number) => {
    setLoading(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .delete<{ message: string }>(`/users/${id}`)
        .then((response) => {
          const data = response.data
          resolve(data.message)
        })
        .catch((error) => {
          const data = error?.response?.data
          reject(data?.message)
        })
        .finally(() => setLoading(false))
    })
  }

  return {
    loading,
    users,
    userActive,
    fetchPaginateUsers,
    fetchUserActiveById,
    deleteUserActiveById,
  }
}
