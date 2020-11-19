import React from 'react'
import { Placemark, Polygon, Polyline } from 'react-yandex-maps'
import { Button } from 'antd'
import { FaDrawPolygon } from 'react-icons/fa'
import { FcLineChart } from 'react-icons/fc'

export const renderGeoObjects = (mapData) => {
  return mapData.map((geo, index) => {
    switch (geo.type) {
      case 'placemark':
        return <Placemark key={index} geometry={geo.coordinates} />
      case 'polyline':
        return (
          <Polyline
            key={index}
            geometry={geo.coordinates}
            options={{
              fillColor: '#00FF00',
              strokeColor: '#0000FF',
              strokeWidth: 5,
            }}
          />
        )
      case 'polygon':
        return (
          <Polygon
            key={index}
            geometry={geo.coordinates}
            options={{
              editorDrawingCursor: 'crosshair',
              editorMaxPoints: 5,
              fillColor: '#00FF00',
              strokeColor: '#0000FF',
              strokeWidth: 5,
            }}
          />
        )
      default:
        return null
    }
  })
}

export const renderButtons = (active, setActive) => {
  return (
    <div>
      <Button
        type={active === 'polyline' && 'primary'}
        onClick={() =>
          active === 'polyline' ? setActive('') : setActive('polyline')
        }
        icon={<FcLineChart />}
      />
      <Button
        type={active === 'polygon' && 'primary'}
        style={{ margin: '0 10px' }}
        icon={<FaDrawPolygon />}
        onClick={() =>
          active === 'polygon' ? setActive('') : setActive('polygon')
        }
      />
    </div>
  )
}

export const createGeoObject = (active, draw) => {
  const options = {
    editorDrawingCursor: 'crosshair',
    // editorMaxPoints: 10,
    fillColor: '#00FF00',
    strokeColor: '#0000FF',
    strokeWidth: 5,
  }

  if (active === 'polygon') {
    return (
      <Polygon
        instanceRef={(ref) => ref && draw(ref, active)}
        geometry={[]}
        options={{ ...options }}
      />
    )
  }

  if (active === 'polyline') {
    return (
      <Polyline
        instanceRef={(ref) => ref && draw(ref, active)}
        geometry={[]}
        options={options}
      />
    )
  }

  return null
}
