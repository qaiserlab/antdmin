import React, { useState, useEffect, useRef } from "react"

import style from './UiStickAreaStyle.module.scss'
import { TUiStickProps } from "./TUiStickProps"

const StickArea = (props: TUiStickProps) => {
  const rootRef = useRef()

  let [sectionClassName, setSectionClassName] = useState(style.init)

  useEffect(() => {
    if (props.align === 'left' && props.valign === 'top') {
      setSectionClassName(style.lt)
    }
    else if (props.align === 'right' && props.valign === 'top') {
      setSectionClassName(style.rt)
    }
    else if (props.align === 'center' && props.valign === 'top') {
      setSectionClassName(style.ct)
    }
    else if (props.align === 'left' && props.valign === 'center') {
      setSectionClassName(style.lc)
    }
    else if (props.align === 'right' && props.valign === 'center') {
      setSectionClassName(style.rc)
    }
    else if (props.align === 'center' && props.valign === 'center') {
      setSectionClassName(style.cc)
    }
    else if (props.align === 'left' && props.valign === 'bottom') {
      setSectionClassName(style.lb)
    }
    else if (props.align === 'right' && props.valign === 'bottom') {
      setSectionClassName(style.rb)
    }
    else if (props.align === 'center' && props.valign === 'bottom') {
      setSectionClassName(style.cb)
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
  }, [sectionClassName])

  return (
    <section ref={rootRef} className={sectionClassName}>
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