import React, { useState, useContext } from "react"
import { useRouter } from "next/router"
import { Spin, Space } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { ActivityStore } from "@stores/ActivityStore"

export default function MyAccount() {
  const router = useRouter()

  const { isLoggedIn, myAccount } = useContext(ActivityStore)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Spin spinning={isLoading}>
      <Space>
        <UserOutlined />
        <span>
          {isLoggedIn?(
            myAccount?.fullName
          ):(
            "Loading..."
          )}
        </span>
      </Space>
    </Spin>
  )
}
