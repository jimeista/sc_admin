import React from 'react'

import { Spin } from 'antd'

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
