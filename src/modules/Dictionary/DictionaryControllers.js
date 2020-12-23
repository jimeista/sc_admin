import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Input, Space, Button, Form, message } from 'antd'

import {
  setSelected,
  postDictionary,
} from '../../features/dictionary/dictionarySlice'

const { Option } = Select

const DictionaryControllers = () => {
  const { data, status, selected } = useSelector((state) => state.dictionary)
  const [dictionaries, setDictionaries] = useState([])
  const [options, setOptions] = useState([])

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'success') {
      setDictionaries([
        'Все справочники',
        ...data.filter((i) => i.name !== 'Тип').map((i) => i.name),
      ])
    }
  }, [data, status])

  useEffect(() => {
    if (selected === 'Сфера' || selected === 'Стратегия 2050') {
      let ob = data.find((i) => i.name === selected)
      setOptions(ob.options.map((i) => i.name))
    }
  }, [selected, data])

  const onFieldSubmit = useCallback(async () => {
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
  }, [form, data, selected, dispatch])

  const onSubmit = useCallback(async () => {
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
  }, [form, data, selected, dispatch])

  const formComponent = useMemo(() => {
    if (selected !== 'Все справочники') {
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
                  {options.map((name, index) => (
                    <Option key={`${name}-${index}`} value={name}>
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
      } else {
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
    } else {
      return null
    }
  }, [selected, options, onSubmit, onFieldSubmit])

  const onChange = (value) => {
    dispatch(setSelected(value))
  }

  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      <Select
        style={{ width: '30%', margin: '15px 0' }}
        placeholder={'Справочники'}
        onChange={onChange}
      >
        {dictionaries.sort().map((option, index) => (
          <Option value={option} key={`${option}-${index}`}>
            {option}
          </Option>
        ))}
      </Select>
      <Form form={form} style={{ display: 'flex', marginBottom: 40 }}>
        {formComponent}
      </Form>
    </Space>
  )
}

export default React.memo(DictionaryControllers)
