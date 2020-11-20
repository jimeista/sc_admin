import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form } from 'antd'
import moment from 'moment'

// import { WorkConfirm } from './form/WorkConfirm'
import { StepsWrapper as Steps } from './form/StepsWrapper'
import {
  setMapData,
  resetMapData,
  setCurrent,
  putRoadMap,
  resetForm,
} from '../../features/roadmap/roadmapSlice'
import { validateRoadWorkForm, setCoordinates } from '../../utils/helper'

const format = 'YYYY/MM/DD'

export const WorkDetailsModal = (props) => {
  const { visible, setVisible, record } = props
  const [form] = Form.useForm()

  const {
    organisations,
    regions,
    categories,
    status,
    mapData,
    formData,
  } = useSelector((state) => state.roadmap)

  const dispatch = useDispatch()

  useEffect(() => {
    let coordinates = record.geometries.coordinates
    console.log(coordinates, record)
    dispatch(setMapData([{ coordinates, type: 'polygon' }]))
    return () => {
      dispatch(resetMapData())
      form.setFieldsValue({})
    }
  }, [form, record])

  let ob = {}
  Object.keys(record).forEach((key) => {
    ob = { ...ob, [key]: record[key] === undefined ? undefined : record[key] }
  })
  form.setFieldsValue({
    ...ob,
    'start-date': moment(ob['start-date'], format),
    'end-date': moment(ob['end-date'], format),
  })

  const putFormData = useCallback(async () => {
    try {
      let ob = validateRoadWorkForm(
        formData,
        categories,
        organisations,
        regions
      )

      const coordinates = setCoordinates(mapData)

      ob = { data: ob, geometries: coordinates, mapData }

      console.log(ob)

      dispatch(setCurrent(0))
      dispatch(resetForm())
      dispatch(putRoadMap({ reedit: true, data: ob, id: record.id }))
      form.resetFields()

      status === 'success' && setVisible(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [
    categories,
    organisations,
    regions,
    mapData,
    formData,
    form,
    record,
    setVisible,
    status,
  ])

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
        <Steps form={form} callback={putFormData} />
      </div>
    </Modal>
  )
}
