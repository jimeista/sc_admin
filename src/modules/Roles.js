import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Select, Tag } from 'antd'
import { useDispatch } from 'react-redux'
import { getRoles } from '../features/admin/adminSlice'

// import { CustomTable as Table } from '../common/Table'

const Roles = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      Роль: 'Суперадмин',
      Модуль: ['ДТП'],
    },
    {
      key: '1',
      Роль: 'Суперадмин',
      Модуль: ['ЧС', 'ДТП'],
    },
    {
      key: '2',
      Роль: 'Суперадмин',
      Модуль: ['Образование'],
    },
    {
      key: '3',
      Роль: 'Администратор',
      Модуль: ['Covid-19', 'Образование'],
    },
  ])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch])

  return (
    <>
      <RoleControllers setDataSource={setDataSource} />
      {/* <Table columns={columns} data={dataSource} setData={setDataSource} /> */}
    </>
  )
}

export default withRouter(Roles)

const RoleControllers = ({ setDataSource }) => {
  const { Option } = Select

  const [form] = Form.useForm()

  const handleAdd = async () => {
    try {
      //putApi
      const row = await form.validateFields()
      setDataSource((data) => [
        ...data,
        {
          key: `${row.role}-${data.length + 1}`,
          Роль: row.role,
          Модуль: row.modules,
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
    <Form
      form={form}
      className=' Roles_create'
      onFinish={handleAdd}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='role'
        rules={[
          {
            required: true,
            message: `Выберите роль пользователя!`,
          },
        ]}
      >
        <Select style={{ width: '60%' }} placeholder='Роли' allowClear>
          {roles.map((role) => (
            <Option key={`${role}- roles`} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='modules'
        rules={[
          {
            required: true,
            message: `Выберите модули доступа пользователя!`,
          },
        ]}
      >
        <Select
          placeholder='Модули'
          mode='multiple'
          tagRender={tagRender}
          style={{ width: '60%' }}
          options={options}
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='standard_btn_admin'>
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

function tagRender(props) {
  const { label, closable, onClose } = props

  return (
    <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}

//hardcoded data

const roles = [
  'Суперадмин',
  'Администратор',
  'Оператор индикаторов',
  'Оператор карты ремонтных дорог',
]

const options = [
  { value: 'Мониторинг цен' },
  { value: 'Общественная безопастность' },
  { value: 'ДТП' },
  { value: 'ЧС' },
  { value: 'Общественный транспорт' },
  { value: 'Образование' },
  { value: 'Covid-19' },
]

const columns = [
  {
    title: 'Роль',
    dataIndex: 'Роль',
    width: '30%',
    editable: true,
    type: 'select',
    placeholder: 'Роли',
    data: roles,
  },
  {
    title: 'Модуль',
    dataIndex: 'Модуль',
    type: 'multi-select',
    editable: true,
    data: options,
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag} style={{ margin: '5px 5px' }}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
]
