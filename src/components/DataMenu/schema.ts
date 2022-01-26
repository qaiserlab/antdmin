export interface ItemInterface {
  key?: string
  title: string
  icon?: Object
  disabled?: boolean
  hidden?: boolean
  children?: Array<ItemInterface>
}

export interface TProps {
  dataSource: Array<ItemInterface>
  mode?: any
  theme?: any
  defaultOpenKeys?: Array<string>,
  defaultSelectedKeys?: Array<string>,
  onSelect?: (event: any) => void
}