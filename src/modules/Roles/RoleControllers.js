import React, { useCallback } from 'react'
import { Form, Button, Select, Tag, Input } from 'antd'
import { useDispatch } from 'react-redux'

import { postRoleModules } from '../../features/roles/rolesSlice'

//UI: render form controllers
const RoleControllers = ({ options }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  //post запрос данных по новой роли
  const onAdd = useCallback(async () => {
    try {
      let row = await form.validateFields()

      let ids = [] // переменная массива ids модулей для отправки на сервер
      let modules = [] //переменная наименовании модулей для отрисовки на клиенте

      //заполняем вышеуказанные переменные
      options.forEach((i) => {
        if (row['permitted-modules'].includes(i.value)) {
          ids = [...ids, i.id]
          modules = [...modules, i.value]
        }
      })

      //структура объекта отправки post запроса на сервер
      let post_new_role_module = { ...row, 'permitted-modules': ids } // post object
      dispatch(
        postRoleModules({ post_new_role_module, record_new_role_module: row })
      )

      form.resetFields()
    } catch (err) {
      console.log(err)
    }
  }, [form, options, dispatch])

  return (
    <Form form={form} className=' Roles_create'>
      {/* форма поля ввода наименования новой роли*/}
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
      {/* форма выбора мультиселекта модулей*/}
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

//вспомогательная функция для отрисовки мультиселекта
function tagRender(props) {
  const { label, closable, onClose } = props

  return (
    <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}
