import React, { useMemo } from 'react'
import { Form } from 'antd'

import {
  nameEnToRuWorkListHelper,
  prepareToShowDetailsObToArr,
} from '../../../utils/helper'

export const WorkConfirm = ({ ob }) => {
  const arr = useMemo(() => {
    return prepareToShowDetailsObToArr(ob)
  }, [ob])

  const renderForm = arr.map((i) => (
    <Form.Item
      key={i.name}
      label={
        <span style={{ color: '#92B4A7' }}>
          {nameEnToRuWorkListHelper(i.name)}
        </span>
      }
    >
      {i.value}
    </Form.Item>
  ))
  return <>{renderForm}</>
}
