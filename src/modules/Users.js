import { withRouter } from 'react-router-dom'
import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd'
import { CustomTable as Table } from '../common/Table'
import Avatar from '../common/Avatar'

const Users = () => {
  const [data, setData] = useState([
    {
      key: '0',
      '№': 1,
      ФИО: 'John Cena',
      Организация: 'WWE membership',
      Роль: 'Суперадмин',
      Логин: 'johncena',
      Пароль: 'supremexxx',
      Фото: 'фото1',
    },
    {
      key: '1',
      '№': 2,
      ФИО: 'John Snow',
      Организация: 'Bastards',
      Роль: 'Администратор',
      Логин: 'bastardsnow',
      Пароль: 'myloveDaenerys',
      Фото: 'фото2',
    },
  ])
  return (
    <>
      <UserControllers setData={setData} data={data} />
      <Table columns={columns} data={data} setData={setData} />
    </>
  )
}

export default withRouter(Users)

const UserControllers = ({ data, setData }) => {
  const { Option } = Select

  const [form] = Form.useForm()

  const handleAdd = async () => {
    try {
      //putApi
      const row = await form.validateFields()
      setData((data) => [
        ...data,
        {
          key: `${row.role}-${data.length + 1}`,
          '№': data.length + 1,
          ФИО: row.name,
          Организация: row.organization,
          Роль: row.role,
          Логин: row.username,
          Пароль: row.pwd,
          Фото: row.avatar,
        },
      ])
      form.resetFields()
    } catch (err) {
      console.log(err)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <Form
        form={form}
        className='admin-controller Roles_block_style'
        onFinish={handleAdd}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className='Roles_block_style'
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
          name='organization'
          rules={[
            {
              required: true,
              message: `Выберите название организации!`,
            },
          ]}
        >
          <Select placeholder='Организация' allowClear>
            {organizations.map((organization) => (
              <Option key={organization} value={organization}>
                {organization}
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
            {roles.map((role) => (
              <Option key={role} value={role}>
                {role}
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
        <Form.Item
          name='avatar'
          // rules={[
          //   {
          //     required: true,
          //     message: `Введите картинку пользователя!`,
          //   },
          // ]}
        >
          <Avatar />
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

//hardcoded data

const roles = [
  'Суперадмин',
  'Администратор',
  'Оператор индикаторов',
  'Оператор карты ремонтных дорог',
]

const organizations = ['организация 1', 'организация 2', 'организация 3']

const columns = [
  {
    title: '№',
    dataIndex: '№',
  },
  {
    title: 'ФИО',
    dataIndex: 'ФИО',

    editable: true,
  },
  {
    title: 'Организация',
    dataIndex: 'Организация',

    type: 'select',
    placeholder: 'Организации',
    data: organizations,
    editable: true,
  },
  {
    title: 'Роль',
    dataIndex: 'Роль',

    type: 'select',
    placeholder: 'Роли',
    data: roles,
    editable: true,
  },
  {
    title: 'Логин',
    dataIndex: 'Логин',
  },
  {
    title: 'Пароль',
    dataIndex: 'Пароль',
    editable: true,
  },
  {
    title: 'Фото',
    dataIndex: 'Фото',
    editable: true,
  },
]
