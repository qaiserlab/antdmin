import { RefObject } from 'react'
import { InputRef, InputProps } from 'antd'

export interface TInputProps {
  ref: RefObject<InputRef>
}

export type TUiInputProps = InputProps & TInputProps
