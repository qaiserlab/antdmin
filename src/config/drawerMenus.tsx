import { 
  UserOutlined,
  TeamOutlined, 
  LogoutOutlined,
} from "@ant-design/icons"

export default [
  { 
    title: 'My Account', 
    icon: <UserOutlined />,
    key: '/my-account',
  },
  { 
    title: 'User',
    icon: <TeamOutlined />,
    key: '/user',
    children: [
      { title: 'User Management', key: '/user' },
      { title: 'User Privileges', key: '/user/privileges' },
    ]
  },
  { 
    title: 'Logout', 
    icon: <LogoutOutlined />,
    key: '/logout',
  },
]