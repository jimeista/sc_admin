import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Input, Space, Button, Form } from 'antd'

import { setSelected } from '../../features/dictionary/dictionarySlice'

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

  const formComponent = useMemo(() => {
    if (selected && selected !== 'Все справочники') {
      if (selected === 'Сфера' || selected === 'Стратегия 2050') {
        return (
          <Form form={form} style={{ display: 'flex', marginBottom: 40 }}>
            <Space direction={'vertical'} style={{ width: '100%' }}>
              <>
                <Form.Item style={{ width: '60%', marginRight: 20 }}>
                  <Input placeholder={'Введите название новой сферы'} />
                </Form.Item>
                <Button type={'primary'}>Добавить Сферу</Button>
              </>
              <>
                <Form.Item style={{ width: '60%', marginRight: 20 }}>
                  <Select placeholder={'Сделайте выбор'}>
                    {options.map((name, index) => (
                      <Option key={`${name}-${index}`} value={name}>
                        {name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item style={{ width: '60%', marginRight: 20 }}>
                  <Input placeholder={'Введите название нового отрасля'} />
                </Form.Item>
                <Button type={'primary'}>Добавить Отрасль</Button>
              </>
            </Space>
          </Form>
        )
      } else {
        return (
          <Form form={form} style={{ display: 'flex', marginBottom: 40 }}>
            <Form.Item style={{ width: '60%', marginRight: 20 }}>
              <Input placeholder={'Добавить новый элемент'} />
            </Form.Item>
            <Button>Добавить</Button>
          </Form>
        )
      }
    } else {
      return null
    }
  }, [selected, form, options])

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
      {formComponent}
    </Space>
  )
}

export default React.memo(DictionaryControllers)
