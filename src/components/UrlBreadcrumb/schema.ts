import { RefObject } from "react"

export interface TProps {
  ref?: RefObject<HTMLInputElement>
  icon?: JSX.Element
  url: string
}