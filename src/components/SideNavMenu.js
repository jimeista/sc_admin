import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'

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

const { SubMenu } = Menu

export const SideNavMenu = ({ width }) => {
  const [state, setState] = useState({
    collapsed: false,
    btnheight: 50,
  })

  const toggleCollapsed = () => {
    setState((state) => ({ ...state, collapsed: !state.collapsed }))
  }

  useEffect(() => {
    width < 600 &&
      setState((state) => ({
        ...state,
        disabled: true,
        collapsed: false,
      }))
  }, [width])

  const menu = useMemo(() => {
    return sidenavmenu.map((ob, index) => (
      <SubMenu
        key={ob.submenu}
        icon={index % 2 === 0 ? <MailOutlined /> : <ContainerOutlined />}
        title={ob.submenu}
        className='SideNavMenu_style_sub_menu'
      >
        {ob.menuitems.map((menuitem) => (
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

const sidenavmenu = [
  {
    submenu: 'Управление мастер-данными',
    menuitems: [
      'Справочники',
      'Аналитические индикаторы',
      'Показатели индикаторов',
      'Карта ремонтных работ',
    ],
  },
  {
    submenu: 'Управление информационной панелью',
    // menuitems: ['Руководители', 'Инфопанели'],
    menuitems: ['Руководители'],
  },
  // {
  //   submenu: 'Управление открытыми данными',
  //   menuitems: [],
  // },
  // {
  //   submenu: 'Аудирование данных',
  //   menuitems: ['Контроль', 'Аудит и сверка'],
  // },
  // {
  //   submenu: 'Управление информационными данными',
  //   menuitems: [],
  // },
  {
    submenu: 'Управление пользователями',
    menuitems: ['Роли', 'Пользователи'],
  },
]
