import React, { useEffect, useState, useMemo } from 'react'
import { YMaps, Map } from 'react-yandex-maps'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'

import { resetForm, setMapData } from '../features/roadmap/roadmapSlice'
import {
  renderButtons,
  renderGeoObjects,
  createGeoObject,
} from '../utils/yandex_helper'
import { usePrevious } from '../utils/usePrevious'

const mapState = {
  center: [43.238949, 76.889709],
  zoom: 10,
}

export const CustomYandexMap = () => {
  const { current, mapData, crossListMapData } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()

  const [active, setActive] = useState('')
  const [polygons, setPolygons] = useState([])
  const previousState = usePrevious({ active, polygons })

  useEffect(() => {
    if (previousState && previousState.active !== active) {
      if (polygons.length > 0 && previousState.polygons === polygons) {
        dispatch(setMapData(polygons))
        setPolygons([])
      }
    }
  }, [active, polygons, previousState])

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

  let geoObjects = useMemo(() => {
    if (crossListMapData.length > 0) {
      return renderGeoObjects(crossListMapData)
    }
    return renderGeoObjects(mapData)
  }, [mapData, crossListMapData])

  const handleClearMap = () => {
    dispatch(resetForm())
  }

  return (
    <>
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
      <YMaps style={{ minWidth: '100%' }}>
        <Map
          width='100%'
          height='calc(100% - 50px)'
          style={{ minHeight: '500px', minWidth: '100%' }}
          defaultState={mapState}
          modules={['geoObject.addon.editor']}
        >
          {current === 0 && geoObject}
          {geoObjects}
        </Map>
      </YMaps>
    </>
  )
}
