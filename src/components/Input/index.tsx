import React, { useState } from "react"
import { Input as AntdInput, InputProps} from 'antd'

import { TProps } from "./schema"
type TInputProps = InputProps & TProps

export default React.forwardRef((props: TInputProps, ref: any) => {
  const stylePassive = { backgroundColor: '#fff' }
  const styleActive = { backgroundColor: '#e6f7ff' }
  
  const [style, setStyle] = useState(stylePassive)
  
  const newProps = {
    ...props,
    style: {
      ...props.style,
      ...style,
    }
  }

  return (
    <AntdInput 
      ref={ref}
      {...newProps} 
      onFocus={(event: any) => {
        setStyle({
          ...props.style, 
          ...styleActive, 
        })

        if (props.onFocus) props.onFocus(event)
      }}
      onBlur={(event: any) => {
        setStyle({
          ...props.style, 
          ...stylePassive,
        })

        if (props.onBlur) props.onBlur(event)
      }}
    />
  )
})

