import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Button, Form } from 'antd'

import { postIndicator } from '../../features/indicator/indicatorSlice'
import {
  renderControllerSelects,
  dictionaries_,
  findOptionId,
} from '../../utils/indicator_helper'

//компонента управления формы индикатора
//данная компонента реализует post запрос формы
const IndicatorControllers = ({ dictionary }) => {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const { dictionaries } = useSelector((state) => state.indicator)

  //post запрос данных по новому индикатору
  const onSubmit = async () => {
    let id = dictionary === 'Сфера' ? 227 : 229 //указываем Тип индикатора по пропсу dictionary
    let record = await form.validateFields()

    //структура объекта на обновление клиентской части
    let client = {
      name: record.name,
      dictionaries: { Тип: dictionary === 'Сфера' ? 'Индикатор' : 'Стратегия' },
    }
    //структура объекта отправки post запроса на сервер
    let server = {
      name: record.name,
      dictionaries: [id],
    }

    //подготовка отправки post запроса
    //находим id выбранных справочников
    Object.keys(record).forEach((key) => {
      if (key !== 'name' && key !== 'Отрасль' && record[key] !== undefined) {
        //заполняем объект клиента наименованием справочника
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //поиск объекта нужного справочника
        let dictionary_ = dictionaries.data.find((i) => i.name === key)
        //находим id справочника
        let id = dictionary_.options.find((o) => o.name === record[key]).id
        //заполняем объект сервера id справочника
        server = { ...server, dictionaries: [...server.dictionaries, id] }
      } else if (key === 'Отрасль' && record[key] !== undefined) {
        //поиск id отрасля по наименованию отрасля
        let id = findOptionId(dictionaries, record[key])

        //заполняем объект клиента наименованием отрасля
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //заполняем объект сервера id отрасля
        server = {
          ...server,
          dictionaries: [...server.dictionaries, id],
        }
      }
    })

    dispatch(postIndicator({ client, server }))
    form.resetFields()
  }

  return (
    <Form form={form} style={{ margin: '30px auto' }}>
      {/* форма ввода наименования индикатора */}
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
      {/*форма выбора наименования справочников по селекту,
         отрисовка вложенностей селекта реализуется спомогательной функцией */}
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
