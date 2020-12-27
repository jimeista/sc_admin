import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form } from 'antd'

import {
  setCurrent,
  postRoadmap,
  resetMapData,
} from '../../../../features/roadmap/roadmapSlice'
import {
  validateRoadWorkForm,
  setCoordinates,
  prepareToShowDetailsObToArr,
} from '../../utils/helper'

import { StepsWrapper as Steps } from './form/StepsWrapper'

//данная компонента рендерит форму post запроса по ремонту дорог
export const WorkListModal = () => {
  const [visible, setVisible] = useState(false) //состояния модального окна
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

  //делаем post запрос по форме
  const postFormData = useCallback(async () => {
    try {
      let record = prepareToShowDetailsObToArr(formData)
      //проводим валидацию данных формы перед отпракой на сервер
      let ob = validateRoadWorkForm(record, categories, organisations, regions)

      //подгоняем структуру объекта координат на post запрос
      const coordinates = setCoordinates(mapData)

      //форма объекта post запроса
      ob = { data: ob, geometries: coordinates, mapData }
      dispatch(postRoadmap(ob)) //делаем post запрос
      dispatch(setCurrent(0)) //сбрасываем этап формы модального окна ремонт дорог
      dispatch(resetMapData()) //сбрасываем координаты на яндекс карте на редакс

      status === 'success' && setVisible(false)
    } catch (err) {
      console.log(err.message)
    }
  }, [categories, formData, dispatch, mapData, organisations, status, regions])

  return (
    <>
      {/* кнопка открытия модального окна */}
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
            {/* форма модального окна по ремонту дорог */}
            <Steps form={form} callback={postFormData} />
          </div>
        </Modal>
      )}
    </>
  )
}
