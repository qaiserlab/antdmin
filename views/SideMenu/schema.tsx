import { DashboardOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";

export const menus = [
  { 
    key: '/',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
  },
  { 
    title: 'User',
    icon: <TeamOutlined />,
    children: [
      { title: 'User Management', key: '/user' },
      { title: 'User Privileges', key: '/user/privileges' },
    ]
  },
  { 
    title: 'Account', 
    icon: <UserOutlined />,
    children: [
      { title: 'Profile', key: '/account' },
      { title: 'Logout', key: '/account/logout' },
    ]
  },
];