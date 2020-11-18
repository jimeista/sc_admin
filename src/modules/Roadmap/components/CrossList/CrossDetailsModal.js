import React from 'react'
import { Modal, Button } from 'antd'

import { WorkConfirm as FormDetails } from '../WorkList/form/WorkConfirm'

export const CrossDetailsModal = (props) => {
  const { visible, setVisible, record, data } = props

  const ids = Object.keys(record)
    .filter((key) => key.substring(0, 1) === 'Р' && record[key])
    .map((i) => record[i])

  let arr = []
  ids.forEach((id) => {
    data.forEach((i) => {
      if (i.id === id) {
        arr = [...arr, i]
      }
    })
  })

  return (
    <Modal
      title='Детали улицы'
      visible={visible}
      width={'50%'}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
      footer={[
        <Button key='close' onClick={() => setVisible(false)}>
          Закрыть
        </Button>,
      ]}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '90%',
          margin: 'auto',
        }}
      >
        {arr.map((i, index) => (
          <div>
            <h2>Работа {index + 1}</h2>
            <FormDetails ob={i} />
          </div>
        ))}
      </div>
    </Modal>
  )
}
