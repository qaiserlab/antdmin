export interface TItem {
  id: string
  url?: string
  title: string
  icon?: Object
  disabled?: boolean
  hidden?: boolean
  children?: Array<TItem>
}

export interface TProps {
  dataSource: Array<TItem>
  mode?: any
  theme?: any
  defaultOpenKeys?: Array<string>,
  defaultSelectedKeys?: Array<string>,
  onSelect?: (event: any) => void
}