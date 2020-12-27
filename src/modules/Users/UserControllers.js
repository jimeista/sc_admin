import React from 'react'
import { Form, Input, Button, Select, Tag } from 'antd'
import { useDispatch } from 'react-redux'

import { postNewUser } from '../../features/users/usersSlice'
import { onRequest } from '../../utils/users_helper'

//компонента управления формы пользователи
//данная компонента делает post запрос
const UserControllers = ({ roles, organisations, modules }) => {
  const [form] = Form.useForm()
  const { Option } = Select

  const dispatch = useDispatch()

  //post запрос данных для нового пользователя
  const onAdd = async () => {
    let record = await form.validateFields()
    if (typeof record.roles === 'undefined') {
      record = { ...record, roles: [] }
    }

    // delete record.password
    let ob = onRequest(record, roles, organisations, modules)

    dispatch(postNewUser(ob))
    form.resetFields()
  }

  return (
    <Form form={form} className='admin-controller Roles_block_style'>
      {/*поле ФИО пользователя  */}
      <Form.Item
        name='name'
        style={{ width: '60%' }}
        rules={[
          {
            required: true,
            message: `Введите имя пользователя!`,
          },
        ]}
      >
        <Input placeholder='ФИО' />
      </Form.Item>
      {/*селект списка ораганизации*/}
      <Form.Item
        name='organisation'
        style={{ width: '60%' }}
        rules={[
          {
            required: true,
            message: `Выберите название организации!`,
          },
        ]}
      >
        <Select placeholder='Организация' allowClear>
          {organisations.map((o) => (
            <Option key={o.value}>{o.value}</Option>
          ))}
        </Select>
      </Form.Item>
      {/*селект списка роли*/}
      <Form.Item
        name='roles'
        style={{ width: '60%' }}
        // rules={[
        //   {
        //     required: true,
        //     message: `Выберите роль пользователя!`,
        //   },
        // ]}
      >
        <Select
          placeholder='Роли'
          allowClear
          mode='multiple'
          tagRender={tagRender}
          options={roles}
        />
      </Form.Item>
      {/*поле логин пользователя  */}
      <Form.Item
        name='username'
        style={{ width: '60%' }}
        rules={[
          {
            required: true,
            message: `Введите логин`,
          },
        ]}
      >
        <Input placeholder='Логин' />
      </Form.Item>
      {/*поле пароль пользователя  */}
      <Form.Item
        name='password'
        style={{ width: '60%' }}
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
          // className='standard_btn_admin'
          onClick={onAdd}
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(UserControllers)

function tagRender(props) {
  const { label, closable, onClose } = props

  return (
    <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}
