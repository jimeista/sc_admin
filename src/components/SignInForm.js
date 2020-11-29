import React from 'react'

import { Form, Input } from 'antd'

export const SignInForm = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <Form.Item name={'username'}>
        <Input placeholder='signin' />
      </Form.Item>
      <Form.Item name={'password'}>
        <Input placeholder='signin' type={'password'} />
      </Form.Item>
    </Form>
  )
}
