import React from 'react'
import { Card } from 'antd'

export const AdminCard = (props) => {
  const { title } = props

  return (
    <Card
      title={title}
      bordered={false}
      style={{ width: '100%' }}
      className='AdminCard_style'
    >
      {/* <Space direction='vertical'>{props.children}</Space> */}
      {props.children}
    </Card>
  )
}
