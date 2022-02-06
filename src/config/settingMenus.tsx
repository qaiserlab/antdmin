import { 
  UserOutlined,
  TeamOutlined, 
  LogoutOutlined,
} from "@ant-design/icons"

export default [
  { 
    id: '77117331-e96b-4d27-93cd-043fa8131815',
    title: 'My Account', 
    icon: <UserOutlined />,
    url: '/my-account',
  },
  { 
    id: 'e7bb53f3-1fd5-4fed-8df6-1ddc6662a131',
    title: 'User',
    icon: <TeamOutlined />,
    url: '/user',
    children: [
      { 
        id: '2faa6a64-9dda-41ba-84c1-835fe1f3444b',
        title: 'User Management', 
        url: '/user', 
      },
      { 
        id: 'aa877741-d766-43f9-abd2-e14a783a37a7',
        title: 'User Privileges', 
        url: '/user/privileges', 
      },
    ]
  },
  { 
    id: '23d0d575-e1dd-4ac3-9b7b-9f43c69fbac7',
    title: 'Logout', 
    icon: <LogoutOutlined />,
    url: '/logout',
  },
]