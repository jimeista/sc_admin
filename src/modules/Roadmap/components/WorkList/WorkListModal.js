import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form } from 'antd'

import { StepsWrapper as Steps } from './form/StepsWrapper'

import {
  setCurrent,
  postRoadMap,
  resetForm,
} from '../../features/roadmap/roadmapSlice'
import { postNewRoadWork } from '../../utils/helper'

export const WorkListModal = () => {
  const [visible, setVisible] = useState()
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
      let ob = postNewRoadWork(formData, categories, organisations, regions)

      const coordinates = {
        geometries: mapData.map((i) => {
          let arr = []
          if (i.type === 'polyline') {
            arr = i.coordinates.map((ii) => ({ y: ii[1], x: ii[0] }))
          } else if (i.type === 'polygon') {
            arr = i.coordinates[0].map((k) => ({ y: k[1], x: k[0] }))
          } else {
            arr = [{ y: i.coordinates[1], x: i.coordinates[0] }]
          }
          return arr
        }),
      }

      ob = { data: ob, geometries: { coordinates } }

      console.log(ob)

      dispatch(postRoadMap(ob))
      dispatch(setCurrent(0))
      dispatch(resetForm())

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
            dispatch(resetForm())
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
            <Steps form={form} postFormData={postFormData} />
          </div>
        </Modal>
      )}
    </>
  )
}
