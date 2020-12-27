import React, { useEffect, useState, useMemo } from 'react'
import { YMaps, Map } from 'react-yandex-maps'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

import {
  resetMapData,
  setMapData,
} from '../../../features/roadmap/roadmapSlice'
import {
  renderButtons,
  renderGeoObjects,
  createGeoObject,
} from '../utils/yandex_helper'
import { usePrevious } from '../utils/usePrevious'

// координаты Алматы
const mapState = {
  center: [43.238949, 76.889709],
  zoom: 10,
}

// карта рендерит координаты работ и рисует новые координаты гео элементов
export const CustomYandexMap = () => {
  const { current, mapData, intersectionsMapData } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()

  const [active, setActive] = useState('') //состояние активной кнопки для рисования на карте
  const [polygons, setPolygons] = useState([]) //состояние заполняемых данных координат при рисовке
  const previousState = usePrevious({ active, polygons }) //кастомный хук для проверки предыдущего состояния данных

  useEffect(() => {
    // сохраняем нарисованные гео элементы карты в редакс
    if (previousState && previousState.active !== active) {
      if (polygons.length > 0 && previousState.polygons === polygons) {
        dispatch(setMapData(polygons))
        setPolygons([])
      }
    }
  }, [active, polygons, previousState])

  // гео элемент с возможностью рисования на карте
  // работа с api яндекс карты
  let geoObject = useMemo(() => {
    const draw = async (ref, type) => {
      ref.editor.startDrawing()

      ref.geometry.events.add('change', (e) => {
        setPolygons((state) => [
          { type, coordinates: e.originalEvent.newCoordinates },
        ])
      })

      ref.editor.events.add('onchange', (event) => {
        ref.startDrawing()
      })
      ref.editor.events.add('drawingstop', (event) => {
        ref.editor.stopDrawing()
        setActive('')
      })
    }

    return createGeoObject(active, draw)
  }, [active])

  // гео элементы уже нарисованных координат из редакса
  let geoObjects = useMemo(() => {
    // отрисовка координат по пересечению работ
    if (intersectionsMapData.length > 0) {
      return renderGeoObjects(intersectionsMapData)
    }
    // отрисовка координат по ремонту дорог
    return renderGeoObjects(mapData)
  }, [mapData, intersectionsMapData])

  // очищаем карту
  const handleClearMap = () => {
    dispatch(resetMapData())
  }

  return (
    <>
      {/* кнопки выбора гео элемента на карте */}
      {current === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          {renderButtons(active, setActive)}
          <Button onClick={handleClearMap}>Очистить карту</Button>
        </div>
      )}
      {/* яндекс карта */}
      <YMaps style={{ minWidth: '100%' }}>
        <Map
          width='100%'
          height='calc(100% - 50px)'
          style={{ minHeight: '500px', minWidth: '100%' }}
          defaultState={mapState}
          modules={['geoObject.addon.editor']}
        >
          {/* рисуй если этап формы карты ремонта дорог находится на форме "описание ремонта дорог" */}
          {current === 0 && geoObject}
          {geoObjects}
        </Map>
      </YMaps>
    </>
  )
}
