import React from 'react'
import { Menu } from 'antd'
import { TProps } from './schema'

const { SubMenu } = Menu

export default class DataMenu extends React.Component<TProps, {}> {
  public static defaultProps: Partial<TProps> = {
    dataSource: [],
    // horizontal, vertical, inline
    mode: 'horizontal',
    // light, dark
    theme: 'light',
    // default keys
    defaultOpenKeys: [],
    defaultSelectedKeys: [],
  }

  constructor(props: TProps) {
    super(props)

    // this.state = {test: true}
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect({ item, key, keyPath, selectedKeys, domEvent }) {
    if (this.props.onSelect) {
      this.props.onSelect({ item, key, keyPath, selectedKeys, domEvent })
    }
  }

  render() {
    return (
      <Menu 
        mode={this.props.mode} 
        theme={this.props.theme} 
        onSelect={this.handleSelect}
        defaultOpenKeys={this.props.defaultOpenKeys}
        defaultSelectedKeys={this.props.defaultSelectedKeys}
      >
        { this.props.dataSource.map((item, itemIndex) => {
          if (!item.hidden) {
            if (!item.children) {
              return (
                <Menu.Item 
                  key={(item.url)?item.url:item.id}
                  icon={item.icon}
                  disabled={item.disabled}
                >
                  {item.title}
                </Menu.Item>
              )
            }
            else {
              return (
                <SubMenu 
                  key={(item.url)?item.url:item.id} 
                  title={item.title}
                  icon={item.icon}
                  disabled={item.disabled}
                >
                  { item.children?.map((subItem, subItemIndex) => {
                    if (!subItem.hidden) {
                      return (
                        <Menu.Item 
                          key={
                            (subItem.url)?subItem.url:subItem.id
                          }
                          icon={subItem.icon}
                          disabled={subItem.disabled}
                        >
                          {subItem.title}
                        </Menu.Item>
                      )
                    }
                  })}
                </SubMenu>
              )
            }
          }
        })}
      </Menu>
    )
  }
}
