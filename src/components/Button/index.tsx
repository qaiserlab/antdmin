import React from "react"
import { Button as AntdButton, ButtonProps} from 'antd'

import { TProps } from "./schema"
type TButtonProps = ButtonProps & TProps

export default React.forwardRef((props: TButtonProps, ref: any) => {
  return (
    <AntdButton 
      ref={ref}
      {...props}
    />
  )
})

