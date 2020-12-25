import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Space, Form } from 'antd'

import { setSelected } from '../../features/dictionary/dictionarySlice'
import DictionaryForm from './DictionaryForm'

const { Option } = Select

//компонента управления формы справочника
//данная компонента влияет на отрисовку таблицы от выбранного значения справочника
const DictionaryControllers = () => {
  const { data, status } = useSelector((state) => state.dictionary)
  const [dictionaries, setDictionaries] = useState([]) //состояние списка справочников

  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    //задаем состояние справочников
    //добавляем кастомную опцию отображения всех справочников
    if (status === 'success') {
      setDictionaries([
        'Все справочники',
        ...data.filter((i) => i.name !== 'Тип').map((i) => i.name),
      ])
    }
  }, [data, status])

  //пробрасываем выбранную опцию справочника в редакс
  const onChange = (value) => {
    dispatch(setSelected(value))
  }

  return (
    <Space direction={'vertical'} style={{ width: '100%' }}>
      {/* форма выбора справочника */}
      <Select
        style={{ width: '30%', margin: '15px 0' }}
        placeholder={'Справочники'}
        onChange={onChange}
      >
        {/* отрисовка опции при выборе */}
        {dictionaries.sort().map((option, index) => (
          <Option value={option} key={`${option}-${index}`}>
            {option}
          </Option>
        ))}
      </Select>
      {/* форма добавления новых справочников */}
      <Form form={form} style={{ display: 'flex', marginBottom: 40 }}>
        <DictionaryForm form={form} />
      </Form>
    </Space>
  )
}

export default React.memo(DictionaryControllers)
