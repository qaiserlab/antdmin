import { RefObject } from "react"

export interface TProps {
  ref?: RefObject<HTMLInputElement>
  url: string
  icon?: JSX.Element
}