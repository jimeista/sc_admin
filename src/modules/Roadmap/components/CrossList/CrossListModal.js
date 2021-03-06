import React, { useState } from 'react'
import { Button, Modal, Form } from 'antd'
import { useDispatch } from 'react-redux'

import {
  postIntersections,
  setCurrent,
  resetIntersectionsMapData,
} from '../../../../features/roadmap/roadmapSlice'
import { AddCrossWorks } from './form/AddCrossWorks'
import { CustomYandexMap as YandexMap } from '../../common'

export const CrossListModal = () => {
  const [visible, setVisible] = useState()
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  const onCancel = () => {
    dispatch(resetIntersectionsMapData())
    form.resetFields()
    setVisible(false)
  }

  const onSave = async () => {
    let data = await form.validateFields()
    const ids = Object.keys(data)
      .filter((key) => key.split('-')[0] === 'roadwork')
      .map((i) => data[i])
    data = { 'roadwork-ids': ids, 'intersection-area': data.area }
    dispatch(postIntersections(data))
    form.resetFields()
    setVisible(false)
  }

  const onAddIntersection = () => {
    dispatch(setCurrent(1))
    setVisible(true)
  }

  const config = [
    <Button key='back' onClick={onCancel}>
      Отменить
    </Button>,
    <Button key='submit' type='primary' onClick={onSave}>
      Сохранить
    </Button>,
  ]

  return (
    <>
      <Button
        type='primary'
        onClick={onAddIntersection}
        style={{ marginBottom: 10 }}
      >
        Добавить пересечение
      </Button>
      <Modal
        title='Форма ввода данных по пересечению работ'
        visible={visible}
        onCancel={() => setVisible(false)}
        width={'80%'}
        footer={config}
      >
        <Form form={form}>
          <AddCrossWorks form={form} />
          <div style={{ width: '100%', paddingLeft: 10 }}>
            <YandexMap />
          </div>
        </Form>
      </Modal>
    </>
  )
}
