import { RefObject } from "react"
import { Menu as AntdMenu} from "antd"

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
  ref?: RefObject<AntdMenu>
  dataSource: Array<TItem>
}