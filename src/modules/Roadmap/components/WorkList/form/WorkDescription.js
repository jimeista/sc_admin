import React, { useState, useEffect } from 'react'

import { Input, Checkbox, Form, DatePicker } from 'antd'

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

  // const [type, setType] = useState('date')
  //checkbox on datepicker
  const [pickerStart, setPickerStart] = useState(false)
  const [pickerEnd, setPickerEnd] = useState(false)

  useEffect(() => {
    form.getFieldValue('is-canvas-opened') &&
      setCanvas(form.getFieldValue('is-canvas-opened'))
    form.getFieldValue('is-closured') &&
      setClosured(form.getFieldValue('is-closured'))
    form.getFieldValue('is-start-date') &&
      setPickerStart(form.getFieldValue('is-start-date') ? true : false)
    form.getFieldValue('is-end-date') &&
      setPickerEnd(form.getFieldValue('is-end-date' ? true : false))

    return () => {
      setCanvas(false)
      setClosured(false)
    }
  }, [form])

  //checkbox on datepicker
  const handleChangeYearStart = (e) =>
    setPickerStart(e.target.checked ? true : false)

  const handleChangeYearEnd = (e) =>
    setPickerEnd(e.target.checked ? true : false)

  return (
    <>
      {/* <Checkbox onChange={(e) => setType(e.target.checked ? 'year' : 'date')} />
      {<PickerWithType type={type} />} */}
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
      {renderTextArea('closure-description', 'Описание перекрытия', isclosured)}
      <Form.Item name={'is-canvas-opened'} noStyle valuePropName={'checked'}>
        <Checkbox onChange={() => setCanvas((state) => !state)}>
          Вскрытие дорожного полотна{' '}
        </Checkbox>
      </Form.Item>
      {renderTextArea('canvas-description', 'Описание вскрытия', iscanvas)}
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
// function PickerWithType({ type }) {
//   if (type === 'date') return <DatePicker />
//   return <DatePicker picker={type} />
// }
