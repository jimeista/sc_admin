import React, { useMemo, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Select, Tag, Input } from 'antd'
import {
  getRoles,
  getModules,
  getRoleModules,
  postRoleModules,
  resetModules,
  resetRoleModules,
  resetRoles,
} from '../features/admin/adminSlice'

import { setRoleColumns, setRoleDataSource } from '../utils/table'
import { CustomTable as Table } from '../common/Table'

//main roles module
const Roles = () => {
  const dispatch = useDispatch()
  const { modules, roles, role_modules } = useSelector((state) => state.admin)

  const [data, setData] = useState([])

  useEffect(() => {
    //TASK:request all available roles and modules for form options
    dispatch(getRoles())
    dispatch(getModules())

    return () => {
      dispatch(resetRoles())
      dispatch(resetModules())
    }
  }, [dispatch])

  useEffect(() => {
    //TASK: request all available role's modules
    roles.status === 'success' && dispatch(getRoleModules(roles.data))

    return () => dispatch(resetRoleModules())
  }, [roles, dispatch])

  useEffect(() => {
    //TASK: if role's modules are ready show them on table
    //LOGIC: set table datasource state
    role_modules.status === 'success' &&
      setData(setRoleDataSource(role_modules.data))
  }, [role_modules])

  let options = useMemo(() => {
    //TASK: if modules are rdy, prepare options to display on select form item
    return modules.data.map((i) => ({ value: i.name, id: i.id }))
  }, [modules])

  return (
    <>
      {<RoleControllers options={options} dispatch={dispatch} />}
      {
        <Table
          columns={setRoleColumns(options)} //options as props to show available options on row edit
          data={data}
          setData={setData}
          loading={role_modules.status === 'success' ? false : true}
        />
      }
    </>
  )
}

export default withRouter(Roles)

const RoleControllers = ({ options, dispatch }) => {
  const [form] = Form.useForm()

  //TASK: add new role's modules on put request (redux side)
  const onAdd = async () => {
    try {
      let row = await form.validateFields()
      dispatch(postRoleModules({ row, arr: options }))

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
      onFinish={onAdd}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name='repr'
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
        name='permitted-modules'
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
