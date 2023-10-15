import { useState } from "react"
import { apiV1 } from "@helpers/ApiHelper"

export default function useUser() {
  const [fetching, setFetching] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageActive, setPageActive] = useState(1)
  const [pageSize, setPageSize] = useState<number>()
  const [pageNum, setPageNum] = useState<number>()
  const [count, setCount] = useState<number>()
  const [users, setUsers] = useState<TUserRecord[]>([])
  const [user, setUser] = useState<TUserRecord>()

  const fetchPaginateUsers = (page: number = 1, params?: object) => {
    setFetching(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .get<TPagingResponse & { users: TUserRecord[] }>("/users", {
          params: {
            ...params,
            page,
          },
        })
        .then((response) => {
          const data = response.data

          setUsers(data.users)
          setPageActive(data.page)
          setPageSize(data.pageSize)
          setPageNum(data.pageNum)
          setCount(data.count)

          resolve(data.message)
        })
        .catch((error) => {
          const data = error?.response?.data
          reject(data?.message)
        })
        .finally(() => setFetching(false))
    })
  }

  const fetchUserById = (id: string) => {
    setFetching(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .get<{ message: string; user: TUserRecord }>(`/users/${id}`)
        .then((response) => {
          const data = response.data
          setUser(data.user)
          resolve(data.message)
        })
        .catch((error) => {
          const data = error?.response?.data
          reject(data?.message)
        })
        .finally(() => setFetching(false))
    })
  }

  const deleteUserById = (id: string) => {
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

  const createUser = (formData: Partial<TUserRecord>) => {
    setLoading(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .post<{ id: string; message: string }>("/users", formData)
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

  const updateUser = (id: string, formData: Partial<TUserRecord>) => {
    setLoading(true)
    return new Promise<string>((resolve, reject) => {
      apiV1
        .put<{ message: string }>(`/users/${id}`, formData)
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
    fetching,
    loading,
    pageActive,
    pageSize,
    pageNum,
    count,
    users,
    user,
    fetchPaginateUsers,
    fetchUserById,
    deleteUserById,
    createUser,
    updateUser,
  }
}
