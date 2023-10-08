import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Space, Table, Pagination } from "antd"
import Swal from "sweetalert2"
import {
  FileTextOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons"

import useFilterable from "@hooks/useFilterable"
import useUser from "@hooks/useUser"
import StickArea from "@components/StickArea/StickArea"
import Button from "@components/Button/Button"
import UserForm from "./UserForm"

export default function UserList() {
  const router = useRouter()
  const {
    users,
    fetchPaginateUsers,
    deleteUserById,
    pageActive,
    pageSize,
    count,
    loading,
  } = useUser()

  const [toggle, setToggle] = useState<{
    display: boolean
    isNew?: boolean
    id?: string
  }>()

  const handleRefresh = async (page?: number, params?: object) => {
    fetchPaginateUsers(page, params).catch((message: string) => {
      Swal.fire("Error", message, "error")
    })
  }

  const handleFilter = (dataIndex: string, keyword: string) => {
    handleRefresh(1, { [dataIndex]: keyword })
  }

  const handleNew = () => setToggle({ display: true, isNew: true })
  const handleDetail = (id: string) => router.push(`/user/detail/${id}`)
  const handleEdit = (id: string) => setToggle({ display: true, id })

  const handleDelete = async (id: string) => {
    Swal.fire({
      icon: "question",
      title: "Confirm",
      text: "Delete this data?",
      showCancelButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUserById(id)
          .then((message: string) => {
            Swal.fire("Success", message, "success")
            handleRefresh(pageActive)
          })
          .catch((message: string) => Swal.fire("Error", message, "error"))
      }
    })
  }

  const columns: any = [
    useFilterable({
      title: "Name",
      dataIndex: "firstName",
      onFilter: handleFilter,
    }),
    useFilterable({
      title: "Username",
      dataIndex: "username",
      onFilter: handleFilter,
    }),
    useFilterable({
      title: "Email",
      dataIndex: "email",
      onFilter: handleFilter,
    }),
    useFilterable({
      title: "Phone Number",
      dataIndex: "phoneNumber",
      onFilter: handleFilter,
    }),
    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, record: TUserRecord) => {
        return (
          <Space>
            <Button
              icon={<EyeOutlined />}
              onClick={() => handleDetail(record.id)}
            />
            <Button
              icon={<EditOutlined />}
              onClick={() => handleEdit(record.id)}
            />
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.id)}
            />
          </Space>
        )
      },
    },
  ]

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <>
      <Head>
        <title>User Management</title>
      </Head>
      <section>
        <Space direction={"vertical"} style={{ width: "100%" }}>
          <Table
            loading={loading}
            columns={columns}
            dataSource={users}
            rowKey={(user) => user.id}
            pagination={false}
          />

          {count > pageSize && (
            <Pagination
              onChange={(page: number) => handleRefresh(page)}
              pageSize={pageSize}
              total={count}
              current={pageActive}
            />
          )}
        </Space>

        <StickArea>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              shape={"circle"}
              size={"large"}
              onClick={() => handleRefresh()}
            />

            <Button
              icon={<FileTextOutlined />}
              type={"primary"}
              shape={"circle"}
              size={"large"}
              onClick={handleNew}
            />
          </Space>
        </StickArea>
      </section>

      <UserForm toggle={toggle} onClose={() => setToggle({ display: false })} />
    </>
  )
}
