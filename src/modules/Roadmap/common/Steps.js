import React, { useEffect } from 'react'
import { Steps, Button, Form } from 'antd'

import { CustomYandexMap as YandexMap } from './YandexMap'

const { Step } = Steps

// форма этапов post и put запросов по ремонту дорог
export const CustomSteps = ({
  steps,
  dispatch,
  current,
  setCurrent,
  formValidate,
  form,
  callback,
}) => {
  useEffect(() => {
    // сбрасываем форму при загрузке компоненты
    form.resetFields()
  }, [form])

  // переключение на след форму
  const next = () => {
    dispatch(setCurrent(current + 1))
  }

  // переключение на пред форму
  const prev = () => {
    dispatch(setCurrent((state) => state - 1))
    dispatch(setCurrent(current - 1))
  }

  // проверка валидации на заполнение обязательных полей до переключение а след форму
  const validate = async () => {
    try {
      const data = await form.validateFields()

      if (data['end-date'] || data['start-date']) {
        data['end-date'] = data['end-date']['_i']
        data['start-date'] = data['start-date']['_i']
      }

      dispatch(formValidate(data))

      next()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div style={{ width: '100%' }}>
      {/* рендер ползунка этапа по форме */}
      <Steps current={current} size='small'>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {/* рендер формы и карты */}
      <div className='steps-content'>
        <Form form={form} name='roadwork-form'>
          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: '50%' }}>{steps[current].content}</div>
            <div style={{ width: '50%', paddingLeft: 10 }}>
              <YandexMap />
            </div>
          </div>
        </Form>
      </div>
      {/* переключение между формами */}
      <div className='steps-action'>
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Назад
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type='primary' onClick={validate}>
            Далее
          </Button>
        )}
        {current === 3 && (
          <Button key='submit' type='primary' onClick={() => callback()}>
            Отправить
          </Button>
        )}
      </div>
    </div>
  )
}
