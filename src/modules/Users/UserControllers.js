import React from 'react'
import { Form, Input, Button, Select } from 'antd'

const UserControllers = ({ roles, organisations }) => {
  const { Option } = Select
  const [form] = Form.useForm()

  return (
    <div>
      <Form form={form} className='admin-controller Roles_block_style'>
        <Form.Item
          name='name'
          rules={[
            {
              required: true,
              message: `Введите имя пользователя!`,
            },
          ]}
        >
          <Input placeholder='ФИО' />
        </Form.Item>
        <Form.Item
          name='organisation'
          rules={[
            {
              required: true,
              message: `Выберите название организации!`,
            },
          ]}
        >
          <Select placeholder='Организация' allowClear>
            {organisations.map((i) => (
              <Option key={i.abbreviation} value={i.abbreviation}>
                {i.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='role'
          rules={[
            {
              required: true,
              message: `Выберите роль пользователя!`,
            },
          ]}
        >
          <Select placeholder='Роли' allowClear>
            {roles.map((i) => (
              <Option key={i.value} value={i.value}>
                {i.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='username'>
          <Input placeholder='Логин' type={'email'} />
        </Form.Item>
        <Form.Item
          name='pwd'
          rules={[
            {
              required: true,
              message: `Введите пароль пользователя!`,
            },
          ]}
        >
          <Input
            placeholder='Пароль'
            type={'password'}
            className='password_style_user'
          />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className='standard_btn_admin'
          >
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default React.memo(UserControllers)
