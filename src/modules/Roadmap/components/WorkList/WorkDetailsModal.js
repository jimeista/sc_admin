import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form } from 'antd'

import {
  resetFormData,
  resetMapData,
  setCurrent,
  putRoadmap,
  setMapData,
} from '../../../../features/roadmap/roadmapSlice'
import {
  validateRoadWorkForm,
  setCoordinates,
  prepareToShowDetailsObToArr,
} from '../../utils/helper'

import { StepsWrapper as Steps } from './form/StepsWrapper'

//данная компонента рендерит форму put запроса по ремонту дорог
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
    //вытаскиваем координаты ремонта дорог при клике на id по таблице
    let coordinates = record.geometries.coordinates

    //подгоняем под структуру яндекс карты
    if (coordinates.length > 0) {
      let arr = coordinates.map((i) => {
        if (i[0][0] == i[i.length - 1][0]) {
          return { type: 'polygon', coordinates: [i] }
        }

        return { type: 'polyline', coordinates: i }
      })

      dispatch(setMapData(arr)) //отрисовка координат при открытии модального окна по таблице
    }

    return () => {
      dispatch(resetMapData())
      dispatch(resetFormData({}))
      form.setFieldsValue({})
    }
  }, [])

  //закрываем модальное окно
  const onCloseModal = () => {
    setVisible(false)
  }

  //форма put запроса ремонта дорог
  const putFormData = useCallback(async () => {
    try {
      let arr = prepareToShowDetailsObToArr(formData) //подготовка данных с формы модального окна для валидации
      let ob = validateRoadWorkForm(arr, categories, organisations, regions) //валидация данных перед put запросом
      const coordinates = setCoordinates(mapData) //подгоняем структуру объекта координат на сервер

      //структура объекта put запроса
      ob = { data: ob, geometries: coordinates }

      dispatch(setCurrent(0)) //сбрасываем этап формы модального окна
      dispatch(putRoadmap({ reedit: true, data: ob, id: record.id, mapData })) //делаем put запрос
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
    dispatch,
  ])

  return (
    <Modal
      title='Детали улицы'
      visible={visible}
      width={'50%'}
      onCancel={onCloseModal}
      onOk={onCloseModal}
      footer={[]}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* форма модального окна по ремонту дорог */}
        <Steps form={form} callback={putFormData} record={record} />
      </div>
    </Modal>
  )
}
