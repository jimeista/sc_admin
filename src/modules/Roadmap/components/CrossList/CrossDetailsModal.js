import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'antd'

import {
  setIntersectionsMapData,
  resetIntersectionsMapData,
  setCurrent,
} from '../../../../features/roadmap/roadmapSlice'

import { CustomYandexMap as YandexMap } from '../../common'
import { WorkConfirm as FormDetails } from '../WorkList/form/WorkConfirm'

//данная компонента рендерит форму информации по пересечении работ
export const CrossDetailsModal = (props) => {
  const { visible, setVisible, record, data, intersectionsMapData } = props
  const [array, setArray] = useState([]) //данные по работе нужно допольнить, так как в таблице они не достают

  const dispatch = useDispatch()

  useEffect(() => {
    let arr = data.filter((i) => record.ids.includes(i.id))

    //рисуем координаты всех пересечении работ
    let list = arr.map((i) => ({
      type: 'polygon',
      coordinates: i.geometries.coordinates,
    }))
    list = [
      ...list,
      {
        ...record.intersection,
      },
    ]

    setArray(arr) //сохраняем в состояние
    dispatch(setCurrent(1)) //переводим этап чтобы нельзя было рисовать на карте
    dispatch(setIntersectionsMapData([...intersectionsMapData, ...list])) //пробрасываем координаты чтобы отрисовать на яндекс карте

    return () => {
      dispatch(setCurrent(0))
      dispatch(resetIntersectionsMapData())
    }
  }, [])

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
      {/*отрисовка динамичных селектов  */}
      <div
        style={{
          display: 'flex',
          // justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '90%',
          margin: 'auto',
        }}
      >
        {/* прорисовка деталей по всем работам */}
        {array.map((i, index) => (
          <div
            style={{
              width: `${array.length > 2 ? '33%' : '50%'}`,
            }}
          >
            <h2>Работа {index + 1}</h2>
            {/* отрисовка информации по работе дорог */}
            <FormDetails ob={i} />
          </div>
        ))}
      </div>
      {/* рендерим яндекс карту */}
      <div style={{ width: '100%', paddingLeft: 10 }}>
        <YandexMap />
      </div>
    </Modal>
  )
}
