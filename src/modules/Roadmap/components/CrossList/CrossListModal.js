import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import { useDispatch } from 'react-redux'

import {
  postIntersections,
  setCurrent,
  resetCrossListMapData,
} from '../../features/roadmap/roadmapSlice'
import { AddCrossWorks } from './form/AddCrossWorks'
import { CustomYandexMap as YandexMap } from '../../common'

export const CrossListModal = () => {
  const [visible, setVisible] = useState()
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          dispatch(setCurrent(1))
          setVisible(true)
        }}
        style={{ marginBottom: 10 }}
      >
        Добавить пересечение
      </Button>
      <Modal
        title='Форма ввода данных по пересечению работ'
        visible={visible}
        onCancel={() => {
          dispatch(resetCrossListMapData())
          form.resetFields()
          setVisible(false)
        }}
        width={'80%'}
        footer={[
          <Button key='back' onClick={() => setVisible(false)}>
            Отменить
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={async () => {
              let data = await form.validateFields()
              const ob = Object.values(data)
              const ids = ob.filter((i) => typeof i !== 'string')
              data = { 'roadwork-ids': ids, 'intersection-area': data.area }
              dispatch(postIntersections(data))
              dispatch(resetCrossListMapData())
              form.resetFields()
              setVisible(false)
            }}
          >
            Сохранить
          </Button>,
        ]}
      >
        <Form form={form}>
          <AddCrossWorks />
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <YandexMap />
          </div>
        </Form>
      </Modal>
    </>
  )
}
