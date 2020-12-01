import React, { useEffect } from 'react'
import { Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { getAuth } from '../../features/admin/adminSlice'

import './SignInForm.css'

export const SignInForm = () => {
  const [form] = Form.useForm()
  const history = useHistory()

  const { auth } = useSelector((state) => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.status === 'success') {
      message.success('Авторизация прошла успешно')
    } else if (auth.status === 'failed') {
      message.error('Ошибка авторизации')
    }

    return () => {
      history.push('/')
    }
  }, [auth, history])

  const onCancel = () => {
    form.resetFields()
  }

  const onSubmit = async () => {
    const record = await form.validateFields()
    const auth = `Basic ${btoa(`${record.username}:${record.password}`)}`

    const config = { headers: { Authorization: auth } }

    dispatch(getAuth({ config, user: config }))
  }

  return (
    <div className={'Form_main_style'}>
      <div className={`Form_style_wrapper`}>
        <div className={`title_back`}>
          Панель андминистратора <br />
          Ситуационного Центра Города Алматы
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
            <div>
              <span onClick={onCancel}>сбросить</span>
            </div>
            <div>
              <span onClick={onSubmit}>применить</span>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
