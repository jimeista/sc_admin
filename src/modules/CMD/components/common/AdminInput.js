import React from 'react'
import { Input } from 'antd'

export const AdminInput = ({
  placeholder = 'Новый элемент',
  defaultValue = '',
  required = true,

  inptRef,
}) => {
  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      required={required}
      allowClear
      ref={inptRef}
      className='AdminInput_style'
    />
  )
}
