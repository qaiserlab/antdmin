import React, { RefObject } from "react"
import Link from "next/link"
import { Breadcrumb as AntdBreadcrumb, BreadcrumbProps} from 'antd'

import { Textman } from "@helpers/Textman"
import { TProps } from "./schema"

type TBreadcrumbProps = BreadcrumbProps & TProps

export default React.forwardRef((props: TBreadcrumbProps, ref: RefObject<HTMLInputElement>) => {

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

        {getDataSource().map((item: any, index: number) => {
          return (
            <AntdBreadcrumb.Item key={index}>
              <Link href={item.href}>
                <a>{Textman.toTitleCase(item.title)}</a>
              </Link>
            </AntdBreadcrumb.Item>
          )
        })}
      </AntdBreadcrumb>
    </React.Fragment>
  )

})

