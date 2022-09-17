import { RefObject } from 'react'
import { ButtonProps } from 'antd'

export interface TButtonProps {
  ref?: RefObject<HTMLInputElement>
}

export type TUiButtonProps = ButtonProps & TButtonProps
