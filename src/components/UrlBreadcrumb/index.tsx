import React from 'react'
import Link from 'next/link'
import { Breadcrumb } from 'antd'
import { TProps } from './schema'

export default class RouterBreadcrumb extends React.Component<
  TProps
> {
  
  constructor(props: TProps) {
    super(props)
  }

  getDataSource() {
    const urlArray = this.props.url.split("/")

    if (this.props.url.substr(0, 1) === '/') {
      urlArray.shift()
    }
    else if (this.props.url.substr(0, 4) === 'http') {
      urlArray.shift()
      urlArray.shift()
      urlArray.shift()
    }

    return urlArray.map((item: any, index: number) => {
      const title = item
      let href = ""

      for (let i = 0; i <= index; i++) {
        href += `/${urlArray[i]}`
      }

      return {
        index,
        title,
        href,
      }
    })
  }

  mkTitleCase(text: string) {
    const sentence = text.toLowerCase().split(' ')

    for(let i = 0; i < sentence.length; i++) {
      if (sentence[i].length > 0) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
      }
    }
    
    return sentence.join(' ')
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link href={'/'}>
              <a>{(this.props.icon)?this.props.icon:'Home'}</a>
            </Link>
          </Breadcrumb.Item>

          {this.getDataSource().map((item: any, index: number) => {
            return (
              <Breadcrumb.Item key={index}>
                <Link href={item.href}>
                  <a>{this.mkTitleCase(item.title)}</a>
                </Link>
              </Breadcrumb.Item>
            )
          })}
        </Breadcrumb>
      </React.Fragment>
    )
  }
}
