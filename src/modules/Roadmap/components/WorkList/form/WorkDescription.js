import React, { useState, useEffect } from 'react'

import { Input, Checkbox, Form } from 'antd'

import {
  renderDatePicker,
  renderSelects,
  renderTextArea,
  renderUpload,
} from '../../../utils/worklist_form'

export const WorkDescription = (props) => {
  const { organisations, regions, categories, form } = props
  const [iscanvas, setCanvas] = useState(false)
  const [isclosured, setClosured] = useState(false)
  //checkbox on datepicker
  const [pickerStart, setPickerStart] = useState()
  const [pickerEnd, setPickerEnd] = useState()

  useEffect(() => {
    form.getFieldValue('is-canvas-opened') &&
      setCanvas(form.getFieldValue('is-canvas-opened'))
    form.getFieldValue('is-closured') &&
      setClosured(form.getFieldValue('is-closured'))

    return () => {
      setCanvas(false)
      setClosured(false)
    }
  }, [form])

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
      <Form.Item
        name={'is-closured'}
        noStyle
        valuePropName={'checked'}
        getValueFromEvent={(e) => e.target.checked}
      >
        <Checkbox onChange={() => setClosured((state) => !state)}>
          Перекрытие улиц{' '}
        </Checkbox>
      </Form.Item>
      {renderTextArea('closure-descr', 'Описание перекрытия', isclosured)}
      <Form.Item name={'is-canvas-opened'} noStyle valuePropName={'checked'}>
        <Checkbox onChange={() => setCanvas((state) => !state)}>
          Вскрытие дорожного полотна{' '}
        </Checkbox>
      </Form.Item>
      {renderTextArea('canvas-descr', 'Описание вскрытия', iscanvas)}
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
