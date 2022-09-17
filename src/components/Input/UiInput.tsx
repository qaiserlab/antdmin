import React, { useState, RefObject, FocusEvent } from "react"
import { Input as AntdInput, InputRef} from 'antd'

import { TUiInputProps } from "./TUiInputProps"

export default React.forwardRef((props: TUiInputProps, ref: RefObject<InputRef>) => {
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

