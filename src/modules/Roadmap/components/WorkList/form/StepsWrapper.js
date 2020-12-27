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

//обертка формы модального окна ремонта дорог
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

  //отрисовка модального окна формы ремонт дорог
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

//вспомогательная функция возвращающая массив с формами
const setSteps = (
  organisations,
  regions,
  categories,
  formData,
  form,
  dispatch
) => [
  //первый шаг формы заполнения данных описания
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
  //второй шаг формы заполнения данных подрядчика
  {
    title: 'Данные подрядчика',
    content: <WorkContractor />,
  },
  //третий шаг формы заполнения данных статуса
  {
    title: 'Статус работ',
    content: <WorkStatus />,
  },
  //четвертый шаг формы проверки заполненых данных
  {
    title: 'Отправка данных',
    content: <WorkConfirm ob={formData} />,
  },
]
