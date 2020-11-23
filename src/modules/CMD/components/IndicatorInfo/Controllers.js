import React, { useState, useContext } from 'react'

import { getAPI, postAPI } from '../../utils/api'
import { AppContext } from '../../context/main'

import { Select } from '../common'

import { Alert, Form, InputNumber, Button, DatePicker, Space } from 'antd'

export const Controllers = ({ plan }) => {
  const [state, setState] = useState({ date: null, value: null })

  const [status, setStatus] = useState({ alert: false })

  const onCloseAlert = () => setStatus({ alert: false })
  const { modalIndicator, setFetchedIndicatorInfoData } = useContext(AppContext)

  const [form] = Form.useForm()

  const handleSubmit = () => {
    if (state.date && state.value) {
      const ob = {
        date: state.date.month
          ? `${state.date.year}-${state.date.month}-15`
          : `${state.date.year}-12-31`,
        'edit-comment': '',
        fact: plan === 'Факт' ? state.value : null,
        planned: plan !== 'Факт' ? state.value : null,
      }

      setState({ date: null, value: null })

      postAPI(
        `/sc-analytic-indicators/api/indicators/${modalIndicator.id}/indexes`,
        ob
      )
        .then((res) => {
          setStatus({
            alert: true,
            message: 'Успешно',
            description: 'Данные успешно отправлены на сервер',
            type: 'success',
          })

          setTimeout(
            () =>
              setStatus({
                alert: false,
              }),
            15000
          )

          getAPI(
            `/sc-analytic-indicators/api/indicators/${modalIndicator.id}/indexes`
          ).then(function (res) {
            setFetchedIndicatorInfoData({
              data: res.data,
              loading: false,
            })
          })
        })
        .catch((err) => {
          setStatus({
            alert: true,
            message: 'Ошибка',
            description: 'Ошибка с записью данных на сервер',
            type: 'error',
          })

          setTimeout(
            () =>
              setStatus({
                alert: false,
              }),
            15000
          )
        })

      form.resetFields()
    } else {
      setStatus({
        alert: true,
        message: 'Ошибка',
        description: 'Введите все необходимые даныне для отправки на сервер',
        type: 'error',
      })

      setTimeout(
        () =>
          setStatus({
            alert: false,
          }),
        15000
      )
    }
  }

  return (
    <Form form={form} className='Controllers_style_inner'>
      <Form.Item className='Controllers_style_item'>
        <Space>
          <Form.Item name='datepicker_field' className='datepicker_field_style'>
            <Space>
              <DatePicker
                onChange={(date, dateString) =>
                  setState((state) => ({
                    ...state,
                    date: { year: dateString },
                  }))
                }
                picker='year'
                allowClear={true}
                placeholder={'Год'}
                locale={locale}
              />
              <Select
                placeholder={'Месяц'}
                data={month}
                style={{ width: 170, background: '#fff', color: '#333' }}
                callBack={(id) =>
                  setState((state) => ({
                    ...state,
                    date: { ...state.date, month: id },
                  }))
                }
              />
            </Space>
          </Form.Item>
          <Form.Item name='number_field'>
            <InputNumber
              onChange={(value) => setState((state) => ({ ...state, value }))}
              placeholder={plan}
            />
          </Form.Item>
          <Button type='primary' onClick={handleSubmit}>
            +
          </Button>
        </Space>
      </Form.Item>
      {status.alert && (
        <Alert
          message={status.message}
          description={status.description}
          type={status.type}
          closable
          onClose={onCloseAlert}
          style={{ margin: 15 }}
        />
      )}
    </Form>
  )
}

const locale = {
  lang: {
    locale: 'ru',
    placeholder: 'Выбрать дату',
    today: 'Сегодня',
    now: 'Сейчас',
    ok: 'ок',
    clear: 'очистить',
    month: 'Месяц',
    year: 'Год',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: false,
  },
  timePickerLocale: {
    placeholder: 'Выбрать время',
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
}

const month = [
  { id: '01', title: 'Январь', value: 'Январь', children: [] },
  { id: '02', title: 'Февраль', value: 'Февраль', children: [] },
  { id: '03', title: 'Март', value: 'Март', children: [] },
  { id: '04', title: 'Апрель', value: 'Апрель', children: [] },
  { id: '05', title: 'Май', value: 'Май', children: [] },
  { id: '06', title: 'Июнь', value: 'Июнь', children: [] },
  { id: '07', title: 'Июль', value: 'Июль', children: [] },
  { id: '08', title: 'Август', value: 'Август', children: [] },
  {
    id: '09',
    title: 'Сентябрь',
    value: 'Сентябрь',
    children: [],
  },
  {
    id: '10',
    title: 'Октябрь',
    value: 'Октябрь',
    children: [],
  },
  { id: '11', title: 'Ноябрь', value: 'Ноябрь', children: [] },
  {
    id: '12',
    title: 'Декабрь',
    value: 'Декабрь',
    children: [],
  },
]
