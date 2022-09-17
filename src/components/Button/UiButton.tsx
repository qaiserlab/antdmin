import React, { RefObject } from "react"
import { Button as AntdButton } from 'antd'

import { TUiButtonProps } from "./TUiButtonProps"

export default React.forwardRef((props: TUiButtonProps, ref: RefObject<HTMLInputElement>) => {
  return (
    <AntdButton 
      ref={ref}
      {...props}
    />
  )
})

