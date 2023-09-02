import React, { RefObject } from "react"
import Link from "next/link"
import { Breadcrumb as AntdBreadcrumb } from 'antd'

import { TUrlBreadcrumbProps, DataSourceItem } from "./TUrlBreadcrumb"

export default React.forwardRef((props: TUrlBreadcrumbProps, ref: RefObject<HTMLInputElement>) => {

  const getDataSource = () => {
    const urlArray = props.url.split("/")

    if (props.url.substr(0, 1) === '/') {
      urlArray.shift()
    }
    else if (props.url.substr(0, 4) === 'http') {
      urlArray.shift()
      urlArray.shift()
      urlArray.shift()
    }

    return urlArray.map((item: string, index: number) => {
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
  
  return (
    <React.Fragment>
      <AntdBreadcrumb
        ref={ref}
        {...props}
      >
        <AntdBreadcrumb.Item>
          <Link href={'/'}>
            <a>{(props.icon)?props.icon:'Home'}</a>
          </Link>
        </AntdBreadcrumb.Item>

        {getDataSource().map((item: DataSourceItem, index: number) => {
          return (
            <AntdBreadcrumb.Item key={index}>
              <Link href={item.href}>
                <a>{item.title.toTitleCase()}</a>
              </Link>
            </AntdBreadcrumb.Item>
          )
        })}
      </AntdBreadcrumb>
    </React.Fragment>
  )

})

