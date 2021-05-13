import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Space, Table, Button, notification } from 'antd';
import { FileTextOutlined } from "@ant-design/icons";

import { api } from '@helpers/Api';
import StickArea from '@components/StickArea';

export default function UserManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  
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
        />

        <StickArea>
          <Space>
            <Button type={'primary'} shape={'circle'} size={'large'}>
              <FileTextOutlined />
            </Button>
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  );
}