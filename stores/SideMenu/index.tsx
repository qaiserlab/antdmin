import { DashboardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

export const menus = [
  { 
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    key: '/',
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
    title: 'Account', 
    icon: <UserOutlined />,
    key: '/account',
    children: [
      { title: 'Profile', key: '/account' },
      { title: 'Logout', key: '/account/logout' },
    ]
  },
];