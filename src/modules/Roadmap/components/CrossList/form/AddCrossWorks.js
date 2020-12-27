import React, { useState } from 'react'
import { Form, Button, Input } from 'antd'

import SelectGroup from './SelectGroup'

//данная компонента рендерит динамичные селекты которые контролируются кнопками
export const AddCrossWorks = ({ form }) => {
  const [count, setCount] = useState([1, 2]) //подсчет количества динамичных селектов

  return (
    <div style={{ marginBottom: 20 }}>
      {/* рендерим динамичные селекты */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {count.map((key) => (
          <SelectGroup order={key} form={form} />
        ))}
      </div>
      {/* добавляем и удаляем динамичные селекты*/}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 15 }}>
        <div style={{ marginRight: 25 }}>
          <Button
            size='small'
            type='primary'
            shape='circle'
            onClick={() => setCount([...count, count.length + 1])}
          >
            +
          </Button>{' '}
          <span>Добавить еще одну</span>
        </div>
        <>
          <Button
            disabled={count.length === 2}
            size='small'
            type='primary'
            shape='circle'
            onClick={() => {
              setCount([...count.filter((i) => i !== count.length)])
            }}
          >
            -
          </Button>{' '}
          <span style={{ marginLeft: 5 }}>Убрать</span>
        </>
      </div>
      {/* поле ввода наименования пересечения улиц*/}
      <Form.Item name='area'>
        <Input
          placeholder={'Участок пересечения'}
          style={{ width: '30%', marginTop: 15 }}
        />
      </Form.Item>
    </div>
  )
}
