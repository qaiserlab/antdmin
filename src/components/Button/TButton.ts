import { RefObject } from 'react'
import { ButtonProps } from 'antd'

export interface TUiButtonProps {
  ref?: RefObject<HTMLInputElement>
}

export type TButtonProps = ButtonProps & TUiButtonProps
