import React, { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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

// боковая панель навигации
const SideNavMenu = ({ width }) => {
  const [state, setState] = useState({
    collapsed: false,
    btnheight: 50,
  })

  const { authorities } = useSelector((state) => state.admin)

  // адаптивность боковой панели
  useEffect(() => {
    width < 600 &&
      setState((state) => ({
        ...state,
        disabled: true,
        collapsed: false,
      }))
  }, [width])

  // кнопка открытия закрытия панели
  const toggleCollapsed = () => {
    setState((state) => ({ ...state, collapsed: !state.collapsed }))
  }

  // список меню навигации панели
  const menu = useMemo(() => {
    let permitted_modules = {} //переменная списка доступных модулей авторизованного пользователя

    // заполняем модули
    authorities.data.forEach((i) => {
      i.data.forEach((m) => {
        permitted_modules = {
          ...permitted_modules,
          [m['permitted-module']]: m['permitted-module'],
        }
      })
    })

    // подгоняем под структуру меню ant menu
    let menu_ = setSideNavMenu(Object.values(permitted_modules))

    // рендерим меню
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
  }, [authorities])

  // рендерин панели
  return (
    <div
      style={{ width: width < 600 ? '100%' : state.collapsed ? 80 : 350 }}
      className='SideNavMenu_style'
    >
      {/* кнопка переключения пенели */}
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
      {/* меню */}
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={[
          'Управление пользователями',
          'Управление мастер-данными',
          'Управление информационной панелью',
        ]}
        mode='inline'
        inlineCollapsed={width < 600 ? false : state.collapsed}
        style={{ height: '100%' }}
      >
        {menu}
      </Menu>
    </div>
  )
}

export default React.memo(SideNavMenu)
