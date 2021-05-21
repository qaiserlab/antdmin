import React, { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { Row, Col, Space, Input, Button, Card } from 'antd';
import { SaveOutlined } from "@ant-design/icons";

import StickArea from '@components/StickArea';
import { PropsInterface } from './schema';

export default function UserManagementForm(props: PropsInterface) {
  const isNew = props.isNew;
  const id = props.id;
  const title = (isNew)?'New':'Edit';

  return (
    <React.Fragment>
      <Head>
        <title>User Management</title>
      </Head>

      <section>
        <Card title={title}>
          <Row gutter={[8, 8]}>
            <Col xs={24} lg={3}>
              First Name
            </Col>
            <Col xs={24} lg={21}>
              <Input />
            </Col>

            <Col xs={24} lg={3}>
              Last Name
            </Col>
            <Col xs={24} lg={21}>
              <Input />
            </Col>

            <Col xs={24} lg={3}>
              Username
            </Col>
            <Col xs={24} lg={21}>
              <Input />
            </Col>

            <Col xs={24} lg={3}>
              Email
            </Col>
            <Col xs={24} lg={21}>
              <Input />
            </Col>

            <Col xs={24} lg={3}>
              Phone Number
            </Col>
            <Col xs={24} lg={21}>
              <Input />
            </Col>
          </Row>
        </Card>        

        <StickArea>
          <Space>
            <Button 
              icon={<SaveOutlined />}
              type={'primary'} 
              shape={'circle'} 
              size={'large'}
            />
          </Space>
        </StickArea>
      </section>
    </React.Fragment>
  )
}