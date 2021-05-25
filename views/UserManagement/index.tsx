import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Space, Table, Button, Modal, notification } from 'antd';
import { FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { api } from '@helpers/Api';
import StickArea from '@components/StickArea';
import { UserRecordInterface } from './schema';

export default function UserManagement() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const handleDelete = (id: string) => {
    alert('delete: ' + id);
  };

  const handleNew = () => {
    router.push('/user/new');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: UserRecordInterface) => {
        return (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => router.push(`/user/edit/${record.id}`)} />
            <Button 
              icon={<DeleteOutlined />} 
              onClick={
                () => modal.confirm({
                  title: 'Confirm',
                  content: <p>Delete {record.fullName} data?</p>, 
                  onOk: () => handleDelete(record.id),
                })
              } 
            />
          </Space>
        );
      },
    }
  ];

  useEffect(() => {
    (async function componentDidMount() {
      setIsLoading(true);

      const response = await api.get('/user');
      const result = await response.json();

      if (response.ok) {
        setRecords(result);
      }
      else {
        setRecords([]);
        notification.error({
          message: 'Error',
          description: result.message,
        });
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <React.Fragment>
      {contextHolder}

      <Head>
        <title>User Management</title>
      </Head> 
      <section>
        <Table 
          loading={isLoading} 
          columns={columns} 
          dataSource={records} 
          rowKey={(record) => record.id}
        />

        <StickArea>
          <Space>
            <Button 
              icon={<FileTextOutlined />}
              type={'primary'} 
              shape={'circle'} 
              size={'large'} 
              onClick={handleNew}
            />
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  );
}