import { DashboardOutlined, PoweroffOutlined } from "@ant-design/icons";

export const menus = [
  { 
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    children: [
      { title: 'Save', hidden: true },
      { title: 'Save As', key: '/save-as', disabled: true },
      { title: 'Exit', icon: <PoweroffOutlined /> },
    ]
  },
  { title: 'Settings', hidden: false },
  { 
    title: 'Account', 
    children: [
      { title: 'Profile', key: '/profile' },
      { title: 'Logout' },
    ]
  },
];