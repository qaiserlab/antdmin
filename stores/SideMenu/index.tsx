import { 
  DashboardOutlined, 
  DatabaseOutlined, 
  StockOutlined,
  ReadOutlined,
} from "@ant-design/icons";

export const menus = [
  { 
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    key: '/',
  },
  { 
    title: 'Master',
    icon: <DatabaseOutlined />,
    key: '/master',
    children: [
      { title: 'Inventory Data', key: '/master' },
    ]
  },
  { 
    title: 'Transaction', 
    icon: <StockOutlined />,
    key: '/transaction',
    children: [
      { title: 'Sales Transaction', key: '/transaction' },
    ]
  },
  { 
    title: 'Report', 
    icon: <ReadOutlined />,
    key: '/report',
    children: [
      { title: 'Sales Report', key: '/report' },
    ]
  },
];