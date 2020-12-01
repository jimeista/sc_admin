import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Button } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

import { logout } from '../features/admin/adminSlice'

export const MainContentWrapper = ({ children }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = () => {
    localStorage.removeItem('user')
    history.push('/авторизация')
    dispatch(logout())
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
        <div className='MainContent_style_header'>
          <QuestionOutlined style={{ marginRight: '1rem' }} />
          <span
            style={{ margin: '0 1rem' }}
            className='MainContent_style_header_fio'
          >
            ФИО/Организация
          </span>
          <Button onClick={onLogout}>Выйти</Button>
        </div>
      </div>
      <div className='main-content-wrapper MainContent_style_body'>
        {children}
      </div>
    </div>
  )
}
