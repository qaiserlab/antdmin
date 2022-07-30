import React, { useState, useEffect, useRef } from "react"

import style from './style'
import { TProps } from "./schema"

const StickArea = (props: TProps) => {
  const rootRef = useRef()

  let [sectionStyle, setSectionStyle] = useState<Object>({ visibility: 'hidden' })

  useEffect(() => {
    if (props.align === 'left' && props.valign === 'top') {
      setSectionStyle(style.lt)
    }
    else if (props.align === 'right' && props.valign === 'top') {
      setSectionStyle(style.rt)
    }
    else if (props.align === 'center' && props.valign === 'top') {
      setSectionStyle(style.ct)
    }
    else if (props.align === 'left' && props.valign === 'center') {
      setSectionStyle(style.lc)
    }
    else if (props.align === 'right' && props.valign === 'center') {
      setSectionStyle(style.rc)
    }
    else if (props.align === 'center' && props.valign === 'center') {
      setSectionStyle(style.cc)
    }
    else if (props.align === 'left' && props.valign === 'bottom') {
      setSectionStyle(style.lb)
    }
    else if (props.align === 'right' && props.valign === 'bottom') {
      setSectionStyle(style.rb)
    }
    else if (props.align === 'center' && props.valign === 'bottom') {
      setSectionStyle(style.cb)
    }
  }, [props])

  useEffect(() => {
    const rootCurrent = Object(rootRef.current)
    
    if (props.align === 'center' && props.valign === 'center') {
      rootCurrent.style.marginTop = -(rootCurrent.offsetHeight / 2) + 'px'
      rootCurrent.style.marginLeft = -(rootCurrent.offsetWidth / 2) + 'px'
    }
    else if (
      props.align === 'center' && (
        props.valign === 'top' ||
        props.valign === 'bottom'
      )
    ) {
      rootCurrent.style.marginLeft = -(rootCurrent.offsetWidth / 2) + 'px'
    }
    else if (
      (props.align === 'left' && props.valign === 'center') ||
      (props.align === 'right' && props.valign === 'center')
    ) {
      rootCurrent.style.marginTop = -(rootCurrent.offsetHeight / 2) + 'px'
    }
  }, [sectionStyle])

  return (
    <section ref={rootRef} style={sectionStyle}>
      {props.children}
    </section>
  )
}

StickArea.defaultProps = {
  // left, right, center
  align: 'right',
  // top, bottom, center
  valign: 'bottom',
}

export default StickArea