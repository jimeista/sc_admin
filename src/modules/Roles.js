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

const Roles = () => {
  const dispatch = useDispatch()
  const { modules, roles, role_modules } = useSelector((state) => state.admin)
  const [data, setData] = useState([])

  useEffect(() => {
    dispatch(getRoles())
    dispatch(getModules())

    return () => {
      dispatch(resetRoles())
      dispatch(resetModules())
    }
  }, [dispatch])

  useEffect(() => {
    roles.status === 'success' && dispatch(getRoleModules(roles.data))

    return () => dispatch(resetRoleModules())
  }, [roles, dispatch])

  useEffect(() => {
    role_modules.status === 'success' &&
      setData(setRoleDataSource(role_modules.data))
  }, [role_modules])

  let options = useMemo(() => {
    return modules.data.map((i) => ({ value: i.name, id: i.id }))
  }, [modules])

  return (
    <>
      {<RoleControllers options={options} dispatch={dispatch} />}
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

const RoleControllers = ({ options, dispatch }) => {
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

      let row = await form.validateFields()
      // row = {
      //   ...row,
      //   'permitted-modules': getModuleIds(row['permitted-modules'], options),
      // }

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
      onFinish={handleAdd}
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
