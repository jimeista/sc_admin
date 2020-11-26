import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'

import {
  setCurrent,
  formValidate,
} from '../../../../../features/roadmap/roadmapSlice'

import {
  WorkDescription,
  WorkContractor,
  WorkStatus,
  WorkConfirm,
} from './index'
import { CustomSteps as Steps } from '../../../common'

const format = 'YYYY/MM/DD'

export const StepsWrapper = ({ form, callback, record }) => {
  const { current, organisations, regions, categories, formData } = useSelector(
    (state) => state.roadmap
  )

  const dispatch = useDispatch()

  const steps = setSteps(
    organisations,
    regions,
    categories,
    formData,
    form,
    dispatch
  )

  useEffect(() => {
    record &&
      form.setFieldsValue({
        ...record,
        'start-date': moment(record['start-date'], format),
        'end-date': moment(record['end-date'], format),
      })
  }, [])

  return (
    <Steps
      steps={steps}
      current={current}
      setCurrent={setCurrent}
      formValidate={formValidate}
      dispatch={dispatch}
      form={form}
      callback={callback}
    />
  )
}

const setSteps = (
  organisations,
  regions,
  categories,
  formData,
  form,
  dispatch
) => [
  {
    title: 'Описание работ',
    content: (
      <WorkDescription
        organisations={organisations}
        regions={regions}
        categories={categories}
        form={form}
        dispatch={dispatch}
      />
    ),
  },
  {
    title: 'Данные подрядчика',
    content: <WorkContractor />,
  },
  {
    title: 'Статус работ',
    content: <WorkStatus />,
  },
  {
    title: 'Отправка данных',
    content: <WorkConfirm ob={formData} />,
  },
]
