import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Space, Table, Button, Modal, notification } from 'antd';
import { FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { api } from '@helpers/Api';
import StickArea from '@components/StickArea';
import { ActivityStore } from '@stores/ActivityStore';
import { UserRecordInterface } from './schema';

export default function UserManagement() {
  const router = useRouter();

  const { setConfirmBox } = useContext(ActivityStore);
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);

  const handleDelete = (id: number) => {
    alert('delete: ' + id);
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
                () => setConfirmBox({ 
                  message: `Delete ${record.fullName} data?`, 
                  isVisible: true,
                  onOk: () => handleDelete(record.id)
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

      const response = await api.get('/api/users');
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
            />
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  );
}