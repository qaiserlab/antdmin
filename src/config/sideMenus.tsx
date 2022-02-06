import { 
  DashboardOutlined, 
  DatabaseOutlined, 
  StockOutlined,
  ReadOutlined,
} from "@ant-design/icons"

export default [
  { 
    id: 'ed054dd1-78f6-4be9-b9bb-4fc6c790b1c8',
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    url: '/',
  },
  { 
    id: '47a70a1c-037e-475b-b97c-344ff0bc2346',
    title: 'Master',
    icon: <DatabaseOutlined />,
    url: '/master',
    children: [
      { 
        id: '9869f599-4709-4734-9c4e-636844698c3b',
        title: 'Inventory Data', 
        url: '/master', 
      },
    ]
  },
  { 
    id: 'c94a1b81-8959-47a5-a812-d165e29430d9',
    title: 'Transaction', 
    icon: <StockOutlined />,
    url: '/transaction',
    children: [
      { 
        id: '876e91c4-2380-4db2-8b61-f292fe520d77',
        title: 'Sales Transaction', 
        url: '/transaction', 
      },
    ]
  },
  { 
    id: '020cab35-e93c-47d7-9ad9-a1b3ca3d9664',
    title: 'Report', 
    icon: <ReadOutlined />,
    url: '/report',
    children: [
      { 
        id: 'f8c05393-e067-47db-a3eb-2f20be527532',
        title: 'Sales Report', 
        url: '/report', 
      },
    ]
  },
]