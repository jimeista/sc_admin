import React, { useCallback } from 'react'
import { Form, Button, Select, Tag, Input } from 'antd'
import { useDispatch } from 'react-redux'

import { postRoleModules } from '../../features/admin/adminSlice'

//UI: render form controllers
const RoleControllers = ({ options }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  // const { modules } = useSelector((state) => state.admin)

  // console.log('loading controllers', options)

  //TASK: add new role's modules on put request (redux side)
  const onAdd = useCallback(async () => {
    try {
      //extract form data to post
      let row = await form.validateFields()

      let ids = [] // request needs module's ids
      let modules = [] //client side needs module names

      //fill above looping through options modules
      options.forEach((i) => {
        if (row['permitted-modules'].includes(i.value)) {
          ids = [...ids, i.id]
          modules = [...modules, i.value]
        }
      })

      let post_new_role_module = { ...row, 'permitted-modules': ids } // post object
      dispatch(postRoleModules({ post_new_role_module, new_role_module: row }))

      form.resetFields()
    } catch (err) {
      console.log(err)
    }
  }, [form, options])

  return (
    <Form form={form} className=' Roles_create'>
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
        <Button
          type='primary'
          htmlType='submit'
          className='standard_btn_admin'
          onClick={onAdd}
        >
          Добавить
        </Button>
      </Form.Item>
    </Form>
  )
}

export default React.memo(RoleControllers)

function tagRender(props) {
  const { label, closable, onClose } = props

  return (
    <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}
