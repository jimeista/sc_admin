import React, { useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getAuth } from '../../features/admin/adminSlice'

import './SignInForm.css'

// форма авторизации
export const SignInForm = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const { auth } = useSelector((state) => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    // валидация на авторизацию
    if (auth.status === 'success') {
      message.success('Авторизация прошла успешно')
    }

    if (auth.status === 'failed') {
      message.error('Ошибка авторизации')
    }

    return () => {
      history.push('/')
    }
  }, [auth, history])

  const onCancel = () => {
    form.resetFields()
  }

  // проверка на авторизацию get запрос
  const onSubmit = async () => {
    const record = await form.validateFields()
    const auth = `Basic ${btoa(`${record.username}:${record.password}`)}` //хэш код

    // записываем конфиг авторизации
    const config = { headers: { Authorization: auth } }

    dispatch(getAuth({ config, user: config }))
  }

  return (
    <div className={'Form_main_style'}>
      <div className={`Form_style_wrapper`}>
        <div className={`title_back`}>
          Панель администратора <br />
          Ситуационного центра города алматы
        </div>
        <Form form={form} className={`Form_style_wrap`}>
          <Form.Item
            name={'username'}
            className={`Form_style`}
            rules={[
              {
                required: true,
                message: `Введите логин`,
              },
            ]}
          >
            <Input placeholder='Логин' className={`Form_style_item login`} />
          </Form.Item>
          <Form.Item
            name={'password'}
            className={`Form_style`}
            rules={[
              {
                required: true,
                message: `Введите пароль`,
              },
            ]}
          >
            <Input
              placeholder='Пароль'
              type={'password'}
              className={`Form_style_item password`}
            />
          </Form.Item>
          <div className={`Form_btn`}>
            <div onClick={onCancel}>
              <span>сбросить</span>
            </div>
            <div onClick={onSubmit}>
              <span>применить</span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
