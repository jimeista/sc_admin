import React from 'react'
import { useSelector } from 'react-redux'

import { setCanvas, setClosured } from '../../../features/roadmap/roadmapSlice'

import {
  WorkDescription,
  WorkContractor,
  WorkStatus,
  WorkConfirm,
} from './index'
import { CustomSteps as Steps } from '../../../common'

export const CustomSteps = ({
  current,
  setCurrent,
  formValidate,
  dispatch,
  form,
  status,
  postFormData,
}) => {
  const {
    organisations,
    regions,
    categories,
    formData,
    isCanvas,
    isClosured,
  } = useSelector((state) => state.roadmap)

  const steps = setSteps(
    organisations,
    regions,
    categories,
    formData,
    isClosured,
    isCanvas,
    dispatch
  )
  return (
    <Steps
      steps={steps}
      current={current}
      setCurrent={setCurrent}
      formValidate={formValidate}
      dispatch={dispatch}
      form={form}
      status={status}
      postFormData={postFormData}
    />
  )
}

const setSteps = (
  organisations,
  regions,
  categories,
  formData,
  closured,
  canvas,
  dispatch
) => [
  {
    title: 'Описание работ',
    content: (
      <WorkDescription
        organisations={organisations}
        regions={regions}
        categories={categories}
        isCanvas={canvas}
        isClosured={closured}
        dispatch={dispatch}
        setCanvas={setCanvas}
        setClosured={setClosured}
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
