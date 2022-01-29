import React from "react"
import style from './style'

import { TProps } from "./schema"

export default class StickArea extends React.Component<TProps> {

  public static defaultProps: Partial<TProps> = {
    // left, right, center
    align: 'right',
    // top, bottom, center
    valign: 'bottom',
  }
  rootRef: React.RefObject<HTMLDivElement>
  
  constructor(props: TProps) {
    super(props)
    this.rootRef = React.createRef()
  }

  componentDidMount() {
    const rootCurrent = Object(this.rootRef.current)
    
    if (this.props.align === 'center' && this.props.valign === 'center') {
      rootCurrent.style.marginTop = -(rootCurrent.offsetHeight / 2) + 'px'
      rootCurrent.style.marginLeft = -(rootCurrent.offsetWidth / 2) + 'px'
    }
    else if (
      this.props.align === 'center' && (
        this.props.valign === 'top' ||
        this.props.valign === 'bottom'
      )
    ) {
      rootCurrent.style.marginLeft = -(rootCurrent.offsetWidth / 2) + 'px'
    }
    else if (
      (this.props.align === 'left' && this.props.valign === 'center') ||
      (this.props.align === 'right' && this.props.valign === 'center')
    ) {
      rootCurrent.style.marginTop = -(rootCurrent.offsetHeight / 2) + 'px'
    }
  }

  render() {
    let sectionStyle

    if (this.props.align === 'left' && this.props.valign === 'top') {
      sectionStyle = style.lt
    }
    else if (this.props.align === 'right' && this.props.valign === 'top') {
      sectionStyle = style.rt
    }
    else if (this.props.align === 'center' && this.props.valign === 'top') {
      sectionStyle = style.ct
    }
    else if (this.props.align === 'left' && this.props.valign === 'center') {
      sectionStyle = style.lc
    }
    else if (this.props.align === 'right' && this.props.valign === 'center') {
      sectionStyle = style.rc
    }
    else if (this.props.align === 'center' && this.props.valign === 'center') {
      sectionStyle = style.cc
    }
    else if (this.props.align === 'left' && this.props.valign === 'bottom') {
      sectionStyle = style.lb
    }
    else if (this.props.align === 'right' && this.props.valign === 'bottom') {
      sectionStyle = style.rb
    }
    else if (this.props.align === 'center' && this.props.valign === 'bottom') {
      sectionStyle = style.cb
    }

    return (
      <section ref={this.rootRef} style={sectionStyle}>
        {this.props.children}
      </section>
    )
  }
}
