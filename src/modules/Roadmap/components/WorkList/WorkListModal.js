import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form } from 'antd'

import { StepsWrapper as Steps } from './form/StepsWrapper'

import {
  setCurrent,
  postRoadMap,
  resetMapData,
} from '../../features/roadmap/roadmapSlice'
import {
  validateRoadWorkForm,
  setCoordinates,
  prepareToShowDetailsObToArr,
} from '../../utils/helper'

export const WorkListModal = () => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const {
    organisations,
    regions,
    categories,
    formData,
    status,
    mapData,
  } = useSelector((state) => state.roadmap)
  const [form] = Form.useForm()

  const postFormData = useCallback(async () => {
    try {
      let arr = prepareToShowDetailsObToArr(formData)
      let ob = validateRoadWorkForm(arr, categories, organisations, regions)

      const coordinates = setCoordinates(mapData)

      ob = { data: ob, geometries: coordinates, mapData }
      // console.log(ob)

      dispatch(postRoadMap(ob))
      dispatch(setCurrent(0))
      dispatch(resetMapData())

      status === 'success' && setVisible(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [categories, formData, dispatch, mapData, organisations, status, regions])

  return (
    <>
      <Button
        type='primary'
        onClick={() => {
          dispatch(setCurrent(0))
          setVisible(true)
        }}
        style={{ marginBottom: 10 }}
      >
        Добавить
      </Button>
      {status === 'success' && (
        <Modal
          title='Форма ввода данных по ремонтным работам'
          visible={visible}
          onOk={() => {
            dispatch(setCurrent(0))
            setVisible(false)
          }}
          onCancel={() => {
            dispatch(setCurrent(0))
            setVisible(false)
            dispatch(resetMapData())
            form.resetFields()
          }}
          width={'80%'}
          footer={null}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Steps form={form} callback={postFormData} />
          </div>
        </Modal>
      )}
    </>
  )
}
