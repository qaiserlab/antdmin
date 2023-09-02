import React, { RefObject } from "react"
import { Button as AntdButton } from 'antd'

import { TButtonProps } from "./TButton"

export default React.forwardRef((props: TButtonProps, ref: RefObject<HTMLInputElement>) => {
  return (
    <AntdButton 
      ref={ref}
      {...props}
    />
  )
})

