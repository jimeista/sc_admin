import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Space, Input, Select, Button, message } from 'antd'

import { postDictionary } from '../../features/dictionary/dictionarySlice'

const { Option } = Select

const DictionaryForm = ({ form }) => {
  const { data, selected } = useSelector((state) => state.dictionary)
  const [options, setOptions] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (selected === 'Сфера' || selected === 'Стратегия 2050') {
      let ob = data.find((i) => i.name === selected)
      setOptions(ob.options.map((i) => i.name))
    }
  }, [selected, data])

  const onFieldSubmit = async () => {
    let record = await form.validateFields()
    let ob = data.find((i) => i.name === selected)

    if (record['selected'] === undefined) {
      message.warning('Выберите сферу')
    } else if (record['unique_name'] === undefined) {
      message.warning('Введите название сферы')
    } else {
      ob = ob.options.find((i) => i.name === record['selected'])
      // console.log(ob)

      ob = {
        tag: 'Отрасль',
        'parent-id': ob.id,
        name: record['unique_name'],
      }

      dispatch(postDictionary(ob))
      // console.log(ob)
      form.resetFields()
    }
  }

  const onSubmit = async () => {
    let record = await form.validateFields()
    let ob = data.find((i) => i.name === selected)

    let name =
      selected === 'Сфера' || selected === 'Стратегия 2050'
        ? 'field_name'
        : 'name'

    if (record[name] === undefined) {
      message.warning('Введите название сферы')
    } else {
      ob = { tag: ob.name, 'parent-id': ob.id, name: record[name] }
      // console.log(ob)

      dispatch(postDictionary(ob))
      form.resetFields()
    }
  }

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

  return null
}

export default React.memo(DictionaryForm)
