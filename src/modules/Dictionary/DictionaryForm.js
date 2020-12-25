import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Space, Input, Select, Button, message } from 'antd'

import { postDictionary } from '../../features/dictionary/dictionarySlice'

const { Option } = Select

//данная компонента реализует логику post запроса
//в зависимости выбранной сферы
const DictionaryForm = ({ form }) => {
  const { data, selected } = useSelector((state) => state.dictionary)
  const [options, setOptions] = useState([]) //опции для формы по отрослям

  const dispatch = useDispatch()

  //если выбранна определенная сфера
  //сохрани отрасли в состояние options
  useEffect(() => {
    if (selected === 'Сфера' || selected === 'Стратегия 2050') {
      let ob = data.find((i) => i.name === selected)
      setOptions(ob.options.map((i) => i.name))
    }
  }, [selected, data])

  //post запрос данных по сфере и отраслям
  const onFieldSubmit = async () => {
    let record = await form.validateFields()
    let ob = data.find((i) => i.name === selected)

    //валидация формы
    if (record['selected'] === undefined) {
      message.warning('Выберите сферу')
    } else if (record['unique_name'] === undefined) {
      message.warning('Введите название сферы')
    } else {
      //находим id выбранного отрасля
      ob = ob.options.find((i) => i.name === record['selected'])

      //структура отправки данных на сервер
      ob = {
        tag: 'Отрасль',
        'parent-id': ob.id,
        name: record['unique_name'],
      }

      dispatch(postDictionary(ob))
      form.resetFields()
    }
  }

  //post запрос данных по сфере
  const onSubmit = async () => {
    let record = await form.validateFields()
    //находим id выбранной сферы
    let ob = data.find((i) => i.name === selected)

    //обозначение названия ключа формы для record
    let name =
      selected === 'Сфера' || selected === 'Стратегия 2050'
        ? 'field_name'
        : 'name'

    //валидация формы
    if (record[name] === undefined) {
      message.warning('Введите название сферы')
    } else {
      //структура отправки данных на сервер
      ob = { tag: ob.name, 'parent-id': ob.id, name: record[name] }

      dispatch(postDictionary(ob))
      form.resetFields()
    }
  }

  //отрисовка формы сферы и отрасля
  if (selected === 'Сфера' || selected === 'Стратегия 2050') {
    return (
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <>
          <Form.Item
            style={{ width: '60%', marginRight: 20 }}
            name={'field_name'}
          >
            <Input placeholder={'Введите название новой сферы'} />
          </Form.Item>
          <Button type={'primary'} onClick={onSubmit}>
            Добавить Сферу
          </Button>
        </>
        <>
          <Form.Item
            style={{ width: '60%', marginRight: 20 }}
            name={'selected'}
          >
            <Select placeholder={'Сделайте выбор'}>
              {/* отрисовка списка отраслей */}
              {options.map((name) => (
                <Option key={name} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            style={{ width: '60%', marginRight: 20 }}
            name={'unique_name'}
          >
            <Input placeholder={'Введите название нового отрасля'} />
          </Form.Item>
          <Button type={'primary'} onClick={onFieldSubmit}>
            Добавить Отрасль
          </Button>
        </>
      </Space>
    )
  }

  //отрисовка формы по сфере
  if (
    selected !== 'Все справочники' &&
    selected !== 'Сфера' &&
    selected !== 'Стратегия 2050'
  ) {
    return (
      <>
        <Form.Item style={{ width: '60%', marginRight: 20 }} name={'name'}>
          <Input placeholder={'Добавить новый элемент'} />
        </Form.Item>
        <Button onClick={onSubmit} type={'primary'}>
          Добавить
        </Button>
      </>
    )
  }

  //форма недоступна при выборе всех справочников
  return null
}

export default React.memo(DictionaryForm)
