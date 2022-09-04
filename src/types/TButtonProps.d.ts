import { RefObject } from 'react'
import { ButtonProps} from 'antd'

interface TButtonProps extends ButtonProps {
  ref?: RefObject<HTMLInputElement>
}

