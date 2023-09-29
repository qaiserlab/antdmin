import React, { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { Spin, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { ActivityStore } from "@stores/ActivityStore"

export default function MyAccount() {
  const { isLoggedIn, myAccount } = useContext(ActivityStore)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    isLoggedIn()
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Spin spinning={loading}>
      <Space>
        <UserOutlined />
        <span>{loading ? "Loading..." : myAccount?.fullName}</span>
      </Space>
    </Spin>
  )
}
