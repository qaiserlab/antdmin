import React, { useState, RefObject, FocusEvent } from "react"
import { Input as AntdInput, InputProps, InputRef} from 'antd'

import { TProps } from "./schema"
type TInputProps = InputProps & TProps

export default React.forwardRef((props: TInputProps, ref: RefObject<InputRef>) => {
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
      onFocus={(event: FocusEvent<HTMLInputElement>) => {
        setStyle({
          ...props.style, 
          ...styleActive, 
        })

        if (props.onFocus) props.onFocus(event)
      }}
      onBlur={(event: FocusEvent<HTMLInputElement>) => {
        setStyle({
          ...props.style, 
          ...stylePassive,
        })

        if (props.onBlur) props.onBlur(event)
      }}
    />
  )
})

