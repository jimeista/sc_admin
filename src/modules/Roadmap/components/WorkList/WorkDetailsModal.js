import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Form } from 'antd'
import moment from 'moment'

// import { WorkConfirm } from './form/WorkConfirm'
import { CustomSteps as Steps } from './form/Steps'
import {
  setMapData,
  // postRoadMap,
  // resetForm,
} from '../../features/roadmap/roadmapSlice'

const format = 'YYYY/MM/DD'

export const WorkDetailsModal = (props) => {
  const { visible, setVisible, record } = props
  const [form] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    let coordinates = record.geometries.coordinates
    dispatch(setMapData([{ coordinates, type: 'polygon' }]))

    return () => {
      dispatch(setMapData([]))
      form.setFieldsValue({})
    }
  }, [])

  console.log(record)
  form.setFieldsValue({
    ...record,
    'start-date': moment(record['start-date'], format),
    'end-date': moment(record['end-date'], format),
  })

  return (
    <Modal
      title='Детали улицы'
      visible={visible}
      width={'50%'}
      onCancel={() => setVisible(false)}
      onOk={() => setVisible(false)}
      footer={[]}
    >
      {/* <WorkConfirm ob={record} /> */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Steps
          form={form}
          // postFormData={postFormData}
          postFormData={() => {}}
        />
      </div>
    </Modal>
  )
}
