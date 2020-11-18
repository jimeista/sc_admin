import React from 'react'
import { Modal, Button } from 'antd'

import { WorkConfirm } from './form/WorkConfirm'

export const WorkDetailsModal = (props) => {
  const { visible, setVisible, record } = props

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
      <WorkConfirm ob={record} />
    </Modal>
  )
}
