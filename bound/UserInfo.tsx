import React, { useState, useEffect, useContext } from 'react';
import { Spin, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { api } from '@helpers/Api';
import { AuthStore } from '@stores/AuthStore';

export default function UserInfo() {
  const { state, dispatch } = useContext(AuthStore);
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    if (!state.authInfo.isLogin && localStorage.accessToken) {
      setIsLoading(true);
  
      const response = await api.get('/profile');
      const result = await response.json();
      
      if (response.ok) {
        dispatch({
          type: 'refresh',
          payload: {
            userInfo: result.data,
          }
        });

        setIsLoading(false);
      }
    }
    else {
      // force logout here
    }
  };

  useEffect(() => {
    (refreshData)();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Space>
        <UserOutlined />
        <span>
          {state.userInfo.firstName}&nbsp;
          {state.userInfo.lastName}
        </span>
      </Space>
    </Spin>
  )
}