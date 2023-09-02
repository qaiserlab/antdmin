import { RefObject } from "react"
import { BreadcrumbProps } from 'antd'

export interface TBreadcrumbProps {
  ref?: RefObject<HTMLInputElement>
  icon?: JSX.Element
  url: string
}

export type TUrlBreadcrumbProps = BreadcrumbProps & TBreadcrumbProps

export interface DataSourceItem {
  title: string
  href: string 
}
