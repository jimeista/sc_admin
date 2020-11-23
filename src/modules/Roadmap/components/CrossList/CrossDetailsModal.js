import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button } from 'antd'

import {
  setCrossListMapData,
  resetCrossListMapData,
  setCurrent,
} from '../../features/roadmap/roadmapSlice'

import { CustomYandexMap as YandexMap } from '../../common'
import { WorkConfirm as FormDetails } from '../WorkList/form/WorkConfirm'

export const CrossDetailsModal = (props) => {
  const { visible, setVisible, record, data } = props
  const [array, setArray] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    //get ids from table record
    const ids = Object.keys(record)
      .filter((key) => key.substring(0, 6) === 'Работа' && record[key])
      .map((i) => record[i])

    //find crosslist work information by ids
    let arr = []
    ids.forEach((id) => {
      data.forEach((i) => {
        if (i.id === id) {
          arr = [...arr, i]
        }
      })
    })

    //draw work coordinates
    // const list = arr.map(i => ({type: 'polygon', coordinates: i.geometries.coordinates}))
    // list = [...list, {
    //   type: 'placemark',
    //   coordinates: record.coordinates,
    // }]

    setArray(arr)
    dispatch(setCurrent(1))
    dispatch(
      setCrossListMapData({
        type: 'placemark',
        coordinates: record.coordinates,
      })
    )

    return () => {
      dispatch(setCurrent(0))
      dispatch(resetCrossListMapData())
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
      <div
        style={{
          display: 'flex',
          // justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '90%',
          margin: 'auto',
        }}
      >
        {array.map((i, index) => (
          <div
            style={{
              width: `${array.length > 2 ? '33%' : '50%'}`,
            }}
          >
            <h2>Работа {index + 1}</h2>
            <FormDetails ob={i} />
          </div>
        ))}
      </div>
      <div style={{ width: '100%', paddingLeft: 10 }}>
        <YandexMap />
      </div>
    </Modal>
  )
}
