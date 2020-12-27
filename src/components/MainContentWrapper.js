import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { logout } from '../features/admin/adminSlice'

// обертка для модулей
const MainContentWrapper = ({ children }) => {
  const { auth } = useSelector((state) => state.admin)
  const dispatch = useDispatch()
  const history = useHistory()

  // выйти из аккаунта
  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
    history.push('/авторизация')
  }

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      className='MainContent_style'
    >
      <div className='header header-user-wrapper MainContent_style_header'>
        <div className='MainContent_style_href'>
          {/* <a href='#'>ru</a> | <a href='#'>kaz</a> */}
        </div>
        {/* шапка модулей */}
        <div className='MainContent_style_header'>
          <Avatar icon={<UserOutlined />} />
          <span
            style={{ margin: '0 1rem' }}
            className='MainContent_style_header_fio'
          >
            {auth.status === 'success' &&
              `${auth.data.name}/${auth.data.organisation.abbreviation}-${auth.data.organisation['full-name']}`}
          </span>
          <Button onClick={onLogout}>Выйти</Button>
        </div>
      </div>
      {/* модули */}
      <div className='main-content-wrapper MainContent_style_body'>
        {children}
      </div>
    </div>
  )
}

export default React.memo(MainContentWrapper)
