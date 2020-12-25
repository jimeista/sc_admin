import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Button, Form } from 'antd'

import {
  renderControllerSelects,
  dictionaries_,
  findOptionId,
} from '../../utils/indicator_helper'
import { postIndicator } from '../../features/indicator/indicatorSlice'

//компонента управления формы post запроса индикатора
const IndicatorControllers = ({ dictionary }) => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const { dictionaries } = useSelector((state) => state.indicator)

  //post запрос данных по новому индикатору
  const onSubmit = async () => {
    let id = dictionary === 'Сфера' ? 227 : 229
    let record = await form.validateFields()
    let client = {
      name: record.name,
      dictionaries: { Тип: dictionary === 'Сфера' ? 'Индикатор' : 'Стратегия' },
    }
    let server = {
      name: record.name,
      dictionaries: [id],
    }

    Object.keys(record).forEach((key) => {
      if (key !== 'name' && key !== 'Отрасль' && record[key] !== undefined) {
        //prepare for client
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //prepare for server post
        let dictionary_ = dictionaries.data.find((i) => i.name === key)
        let id = dictionary_.options.find((o) => o.name === record[key]).id

        server = { ...server, dictionaries: [...server.dictionaries, id] }
      } else if (key === 'Отрасль' && key !== undefined) {
        let id = findOptionId(dictionaries, record[key])

        //client
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        server = {
          ...server,
          dictionaries: [...server.dictionaries, id],
        }
      }
    })

    dispatch(postIndicator({ client, server }))
    form.resetFields()
  }

  //отрисовка формы
  return (
    <Form form={form} style={{ margin: '30px auto' }}>
      <Form.Item
        name={'name'}
        rules={[
          {
            required: true,
            message: `Введите название индикатора`,
          },
        ]}
      >
        <Input
          placeholder={'Введите название индикатора'}
          allowClear
          style={{ width: '30%' }}
        />
      </Form.Item>
      {/* отрисовка селектов */}
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {[...dictionaries_, dictionary].map((name) =>
          renderControllerSelects(dictionaries, name)
        )}
        <Button onClick={onSubmit}>Добавить</Button>
      </div>
    </Form>
  )
}

export default React.memo(IndicatorControllers)
