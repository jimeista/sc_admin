import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form } from 'antd'
import moment from 'moment'

import { StepsWrapper as Steps } from './form/StepsWrapper'
import {
  resetFormData,
  resetMapData,
  setCurrent,
  putRoadMap,
} from '../../features/roadmap/roadmapSlice'
import {
  validateRoadWorkForm,
  setCoordinates,
  prepareToShowDetailsObToArr,
} from '../../utils/helper'

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

  form.setFieldsValue({
    ...formData,
    'start-date': moment(formData['start-date'], format),
    'end-date': moment(formData['end-date'], format),
  })

  useEffect(() => {
    return () => {
      dispatch(resetMapData())
      dispatch(resetFormData({}))
      form.setFieldsValue({})
    }
  }, [])

  // console.log('loaded')

  const putFormData = useCallback(async () => {
    try {
      let arr = prepareToShowDetailsObToArr(formData)
      let ob = validateRoadWorkForm(arr, categories, organisations, regions)
      const coordinates = setCoordinates(mapData)

      // console.log(coordinates)
      ob = { data: ob, geometries: coordinates }

      dispatch(setCurrent(0))
      dispatch(putRoadMap({ reedit: true, data: ob, id: record.id, mapData }))
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
