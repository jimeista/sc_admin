import React, { useMemo } from 'react'
import { Form } from 'antd'

import {
  nameEnToRuWorkListHelper,
  prepareToShowDetailsObToArr,
} from '../../../utils/helper'

export const WorkConfirm = ({ ob }) => {
  const arr = useMemo(() => {
    let new_arr = prepareToShowDetailsObToArr(ob)
    new_arr = new_arr.filter(
      (i) => typeof i.value !== 'object' && typeof i.value !== 'boolean'
    )
    return new_arr
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
