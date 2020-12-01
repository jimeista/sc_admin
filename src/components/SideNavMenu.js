import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'

import { Menu, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  // AppstoreOutlined,
  // PieChartOutlined,
  // DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  FileOutlined,
} from '@ant-design/icons'

import { setSideNavMenu } from '../utils/menu_helper'

const { SubMenu } = Menu

export const SideNavMenu = ({ width }) => {
  const [state, setState] = useState({
    collapsed: false,
    btnheight: 50,
  })

  useEffect(() => {
    width < 600 &&
      setState((state) => ({
        ...state,
        disabled: true,
        collapsed: false,
      }))
  }, [width])

  const toggleCollapsed = () => {
    setState((state) => ({ ...state, collapsed: !state.collapsed }))
  }

  const menu = useMemo(() => {
    const modules = [
      'Роли',
      'Руководители',
      'Аналитические индикаторы',
      'Справочники',
      'Пользователи',
    ]
    let menu_ = setSideNavMenu(modules)
    // console.log(menu_)
    return menu_.map((i, index) => (
      <SubMenu
        key={i.submenu}
        icon={index % 2 === 0 ? <MailOutlined /> : <ContainerOutlined />}
        title={i.submenu}
        className='SideNavMenu_style_sub_menu'
      >
        {i.menuitems.map((menuitem) => (
          <Menu.Item
            key={menuitem}
            icon={<FileOutlined />}
            className='SideNavMenu_style_menu_item'
          >
            <Link to={`${menuitem}`}>{menuitem}</Link>
          </Menu.Item>
        ))}
      </SubMenu>
    ))
  }, [])

  return (
    <div
      style={{ width: width < 600 ? '100%' : state.collapsed ? 80 : 350 }}
      className='SideNavMenu_style'
    >
      <Button
        type='primary'
        onClick={toggleCollapsed}
        style={{
          height: state.btnheight,
          width: '100%',
        }}
        className='SideNavMenu_style_button'
      >
        {width > 600 && state.collapsed ? (
          <MenuUnfoldOutlined />
        ) : (
          'Панель администратора'
        )}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='inline'
        inlineCollapsed={width < 600 ? false : state.collapsed}
        style={{ height: '100%' }}
      >
        {menu}
      </Menu>
    </div>
  )
}
