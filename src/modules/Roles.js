import React, { useMemo, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Select, Tag, Input } from 'antd'
import {
  getRoles,
  getModules,
  getRoleModules,
  resetModules,
  resetRoleModules,
  resetRoles,
} from '../features/admin/adminSlice'

import { setRoleColumns, setRoleDataSource } from '../utils/table'
import { CustomTable as Table } from '../common/Table'

const Roles = () => {
  const dispatch = useDispatch()
  const { modules, roles, role_modules } = useSelector((state) => state.admin)
  const [data, setData] = useState()

  useEffect(() => {
    dispatch(getRoles())
    dispatch(getModules())

    return () => {
      dispatch(resetRoles())
      dispatch(resetModules())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getRoleModules(roles.data))

    return () => dispatch(resetRoleModules())
  }, [roles, dispatch])

  useEffect(() => {
    setData(setRoleDataSource(role_modules.data))
  }, [role_modules])

  let options = useMemo(() => {
    return modules.data.map((i) => ({ value: i.name, id: i.id }))
  }, [modules])

  return (
    <>
      {<RoleControllers options={options} />}
      {/* <Table columns={columns} data={dataSource} setData={setDataSource} /> */}
      {
        <Table
          columns={setRoleColumns(options)}
          data={data}
          setData={setData}
          loading={role_modules.status === 'success' ? false : true}
        />
      }
    </>
  )
}

export default withRouter(Roles)

const RoleControllers = ({ options }) => {
  const [form] = Form.useForm()

  const handleAdd = async () => {
    try {
      //putApi
      // const row = await form.validateFields()
      // setDataSource((data) => [
      //   ...data,
      //   {
      //     key: `${row.role}-${data.length + 1}`,
      //     Роль: row.role,
      //     Модуль: row.modules,
      //   },
      // ])
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
            message: `Введите роль пользователя!`,
          },
        ]}
      >
        <Input placeholder='Роли' allowClear style={{ width: '60%' }} />
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

// const columns = [
//   {
//     title: 'Роль',
//     dataIndex: 'Роль',
//     width: '30%',
//     editable: true,
//     type: 'select',
//     placeholder: 'Роли',
//     data: roles,
//   },
//   {
//     title: 'Модуль',
//     dataIndex: 'Модуль',
//     type: 'multi-select',
//     editable: true,
//     data: options,
//     render: (tags) => (
//       <span>
//         {tags.map((tag) => {
//           let color = tag.length > 5 ? 'geekblue' : 'green'
//           if (tag === 'loser') {
//             color = 'volcano'
//           }
//           return (
//             <Tag color={color} key={tag} style={{ margin: '5px 5px' }}>
//               {tag.toUpperCase()}
//             </Tag>
//           )
//         })}
//       </span>
//     ),
//   },
// ]
