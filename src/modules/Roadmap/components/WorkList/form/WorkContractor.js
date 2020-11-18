import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { Input, Form } from 'antd'

// const { TextArea } = Input

export const WorkContractor = () => {
  const [phone, setPhone] = useState()
  return (
    <>
      <Form.Item name='lot-name'>
        <Input placeholder='Наименование проекта (№ лота)' />
      </Form.Item>
      <Form.Item name='company-name'>
        <Input placeholder='Наименование компании' />
      </Form.Item>
      <Form.Item name='supervisor-name'>
        <Input placeholder='ФИО руководителя' />
      </Form.Item>
      <Form.Item name='contacts'>
        <PhoneInput
          country={'kz'}
          value={phone}
          onChange={(phone) => setPhone({ phone })}
        />
      </Form.Item>

      <Form.Item name='warranty-period'>
        <Input placeholder='Гарантийный период' />
      </Form.Item>
      {/* <Form.Item
        name='contractor-comment-textarea'
        rules={[{ required: true }]}
      >
        <TextArea style={{ height: 90 }} placeholder='Комментарий' />
      </Form.Item> */}
    </>
  )
}
