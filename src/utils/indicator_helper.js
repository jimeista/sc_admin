import React from 'react'
import { Form, Select } from 'antd'

const { Option } = Select

//возвращает массив select эллементов каждого справочника
export const renderControllerSelects = (data, name) => {
  return (
    <Form.Item name={name} key={name} style={{ marginRight: 10, width: '32%' }}>
      <Select
        placeholder={name === 'Стратегия 2050' ? 'Сфера' : name} //переименуй название "Стратегия 2050" в "Сфера"
        allowClear
      >
        {getDictionaryOptions(data, name).map((value) => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    </Form.Item>
  )
}

//возвращает массив наименовании справочников и отраслей по ключу key
//принимает объект dictionaries и наименование справочника key
const getDictionaryOptions = (dictionaries, key) => {
  if (dictionaries.status === 'success') {
    //если ключ равняется "Отрасль"
    //выведи все наименования отраслей из Сферы и Старетигии 2050
    //в противном случае, выведи только наименование справочников
    if (key === 'Отрасль') {
      let field = dictionaries.data.find((i) => i.name === 'Сфера')
      let strategy = dictionaries.data.find((i) => i.name === 'Стратегия 2050')

      let arr = []

      field.options.forEach((i) => {
        arr = [...arr, ...i.options]
      })

      strategy.options.forEach((i) => {
        arr = [...arr, ...i.options]
      })

      return arr.map((i) => i.name)
    } else {
      let dictionary = dictionaries.data.find((i) => i.name === key)
      return dictionary.options.map((o) => o.name)
    }
  }
  return []
}

//возвращает id указанного названия отрасля
//принимает объект справочников и наименование отрасля
export const findOptionId = (dictionaries, key) => {
  //Этапы реализации:
  //найти объекты справочников которые имеют опции Отрасли, тоесть "Сфера" и "Стратегия 2050"
  //создать переменную options для сбора всех отраслей
  //вернуть id отрасля по ключи key

  let fields = dictionaries.data.find((i) => i.name === 'Сфера').options
  let strategy = dictionaries.data.find((i) => i.name === 'Стратегия 2050')
    .options

  let options = []

  fields.forEach((i) => {
    options = [...options, ...i.options]
  })

  strategy.forEach((i) => {
    options = [...options, ...i.options]
  })

  return options.find((i) => i.name === key).id
}

//базовый список наименовании справочников, который далее дополняется Сферой или же Стратегией 2050 в компоненте ...Controllers
//можно переиспользовать в других компонентах, при необходимости
//главная плюс этого подхода, отподает необходимость ожидание выгрузки get запроса при рендеринге компонент
export const dictionaries_ = [
  'Государственная программа',
  'Единица измерения',
  'Источник информации',
  'Ответственный орган',
  'Отрасль',
  'Периодичность обновления',
]
