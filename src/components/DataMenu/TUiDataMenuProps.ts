import { RefObject } from "react"
import { Menu as AntdMenu, MenuProps } from "antd"

export interface TItem {
  id: string
  url?: string
  title: string
  icon?: Object
  disabled?: boolean
  hidden?: boolean
  children?: Array<TItem>
}

export interface TMenuProps {
  ref?: RefObject<AntdMenu>
  dataSource: Array<TItem>
}

export type TUiDataMenuProps = MenuProps & TMenuProps
