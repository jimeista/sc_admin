import React from 'react'

import { Spin } from 'antd'

// компонента отображения загружки страницы при запросах
export const Spinner = () => {
  return (
    <div
      style={{
        width: '100%',
        paddingTop: 30,
        textAlign: 'center',
      }}
    >
      <Spin />
    </div>
  )
}
