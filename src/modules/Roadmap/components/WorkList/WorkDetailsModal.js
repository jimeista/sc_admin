import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Form } from 'antd'
import moment from 'moment'

// import { WorkConfirm } from './form/WorkConfirm'
import { StepsWrapper as Steps } from './form/StepsWrapper'
import {
  setMapData,
  resetMapData,
  setCurrent,
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
    dispatch(setCurrent(0))

    return () => {
      dispatch(resetMapData())
      form.setFieldsValue({})
    }
  }, [form, record])

  console.log(record)
  let ob = {}
  Object.keys(record).forEach((key) => {
    ob = { ...ob, [key]: record[key] === null ? undefined : record[key] }
  })
  form.setFieldsValue({
    ...ob,
    'start-date': moment(ob['start-date'], format),
    'end-date': moment(ob['end-date'], format),
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
