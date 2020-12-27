import React, { useState } from 'react'
import { Select, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setIntersectionsMapData } from '../../../../../features/roadmap/roadmapSlice'

const { Option } = Select

// данная компонента динамтчно рендерит группу двух селектов категорию и id работы
const SelectGroup = ({ order, form }) => {
  const [options, setOptions] = useState([]) //состояние списка id работ

  const { categories, data, intersectionsMapData } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()

  //наименования категории
  let arr =
    categories.status === 'success' ? categories.data.map((r) => r.name) : []

  //дананя функция затирает рисовку координат при изменении работы в селекте
  const onChangeWorkId = (id) => {
    dispatch(
      setIntersectionsMapData([
        ...intersectionsMapData,
        {
          type: 'polygon',
          coordinates: data.find((i) => i.id === id).geometries.coordinates,
        },
      ])
    )
  }

  //дананя функция заменяет список id работ показываемых в селекте id работы
  const onChangeCategory = (value) => {
    setOptions(data.filter((i) => i.category === value).map((i) => i.id))
    form.setFieldsValue({ [`roadwork-${order}`]: '' })
  }

  return (
    <Form.Item style={{ marginRight: 20 }}>
      {/* селект категории */}
      <Form.Item
        name={`category-${order}`}
        rules={[{ required: true, message: 'Заполните поле' }]}
      >
        <Select
          placeholder={'Категория работ'}
          style={{ width: 320 }}
          onChange={onChangeCategory}
        >
          {arr.map((i) => (
            <Option value={i} key={i}>
              {i}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* селект id работ */}
      {options.length > 0 && (
        <Form.Item
          name={`roadwork-${order}`}
          rules={[{ required: true, message: 'Заполните поле' }]}
          key={`roadwork-${order}`}
        >
          <Select
            placeholder={`Работа ${order}`}
            style={{ width: 320 }}
            onChange={onChangeWorkId}
          >
            {options.map((i) => (
              <Option value={i} key={i}>
                {i}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </Form.Item>
  )
}

export default React.memo(SelectGroup)
