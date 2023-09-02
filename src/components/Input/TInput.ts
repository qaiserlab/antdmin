import { RefObject } from 'react'
import { InputRef, InputProps } from 'antd'

export interface TUiInputProps {
  ref: RefObject<InputRef>
}

export type TInputProps = InputProps & TUiInputProps
