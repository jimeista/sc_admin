import React, { useState } from 'react'

import { Input, Checkbox, Form } from 'antd'

import {
  renderDatePicker,
  renderSelects,
  renderTextArea,
  renderUpload,
} from '../../../utils/worklist_form'

export const WorkDescription = (props) => {
  const {
    organisations,
    regions,
    categories,
    dispatch,
    isClosured,
    isCanvas,
    setCanvas,
    setClosured,
  } = props

  //checkbox on datepicker
  const [pickerStart, setPickerStart] = useState()
  const [pickerEnd, setPickerEnd] = useState()

  //checkbox on datepicker
  const handleChangeYearStart = (e) =>
    e.target.checked ? setPickerStart('year') : setPickerStart()

  const handleChangeYearEnd = (e) =>
    e.target.checked ? setPickerEnd('year') : setPickerEnd()

  return (
    <>
      {renderSelects({ regions, organisations, categories })}
      <Form.Item name='address'>
        <Input placeholder='Адрес/Улица' />
      </Form.Item>
      {renderTextArea('area', 'Описание участка', true)}
      <Form.Item name={'is-closured'} valuePropName='checked' noStyle>
        <Checkbox onChange={() => dispatch(setClosured(!isClosured))}>
          Перекрытие улиц{' '}
        </Checkbox>
      </Form.Item>
      {renderTextArea('closure-descr', 'Описание перекрытия', isClosured)}
      <Form.Item name={'is-canvas-opened'} valuePropName='checked' noStyle>
        <Checkbox onChange={() => dispatch(setCanvas(!isCanvas))}>
          Вскрытие дорожного полотна{' '}
        </Checkbox>
      </Form.Item>
      {renderTextArea('canvas-descr', 'Описание вскрытия', isCanvas)}
      {renderDatePicker(
        pickerStart,
        handleChangeYearStart,
        'start-date',
        'Дата начала'
      )}
      {renderDatePicker(
        pickerEnd,
        handleChangeYearEnd,
        'end-date',
        'Дата окончания'
      )}
      {renderUpload()}
    </>
  )
}
