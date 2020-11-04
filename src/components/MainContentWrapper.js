import React from 'react'

import { Button } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'

export const MainContentWrapper = ({ children }) => {
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
          <Button className='MainContent_style_header_btn'>Выйти</Button>
        </div>
      </div>
      <div className='main-content-wrapper MainContent_style_body'>
        {children}
      </div>
    </div>
  )
}
