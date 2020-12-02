import React, { useRef, useState, useContext } from 'react'
import { Alert, Form } from 'antd'

import { getAPI, postAPI } from '../../utils/api'
import { AppContext } from '../../context/main'

import { Button, Input, Select } from '../common'

export const Controllers = ({ isStrategy }) => {
  const [indicator, setIndicator] = useState([])
  const {
    fetchedDictionaryData,
    setFetchedIndicatorData,
    setFetchedIndicatorStrategyData,
  } = useContext(AppContext)

  const inputRef = useRef()
  const [form] = Form.useForm()

  const [status, setStatus] = useState({ alert: false })
  const onCloseAlert = () => setStatus({ alert: false })

  const handleSubmit = () => {
    if (inputRef.current.input.value) {
      const typeId = isStrategy ? 229 : 227
      const data = {
        name: inputRef.current.input.value,
        dictionaries: [...indicator, typeId],
      }

      postAPI('/sc-analytic-indicators/api/indicators', data).then((res) => {
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
          3000
        )

        getAPI('/sc-analytic-indicators/api/indicators')
          .then((res) => {
            setFetchedIndicatorData({
              loading: false,
              data: res.data,
            })
            setFetchedIndicatorStrategyData({
              loading: false,
              data: res.data,
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
              3000
            )
          })
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
        3000
      )
    }
  }

  const handleIndicator = (id) => {
    setIndicator((state) => [...state, id])
  }

  const renderSelect = () => {
    let selects = []
    let industry = []
    if (!fetchedDictionaryData.loading) {
      industry = fetchedDictionaryData.data
        .find((item) =>
          isStrategy ? item.name === 'Стратегия 2050' : item.name === 'Сфера'
        )
        .options.map((option) =>
          option.options.map((ob) => ({ name: ob.name, id: ob.id }))
        )

      const arr = fetchedDictionaryData.data.filter(
        (item) => item.name !== 'Тип'
      )

      const ob = arr.filter((item) =>
        !isStrategy ? item.name !== 'Стратегия 2050' : item.name !== 'Сфера'
      )

      selects = ob.map((item, index) => {
        const name = isStrategy ? 'Стратегия 2050' : 'Сфера'
        const data = item.options.map((option) =>
          item.name === name
            ? {
                id: option.id,
                title: option.name,
                value: option.name,
                children: [],
              }
            : {
                id: option.id,
                title: option.name,
                value: option.name,
                children: option.options.map((ob) => {
                  return {
                    id: ob.id,
                    title: ob.name,
                    value: ob.name,
                    children: [],
                  }
                }),
              }
        )

        return (
          <Select
            key={index}
            placeholder={item.name === 'Стратегия 2050' ? 'Сфера' : item.name}
            data={data}
            callBack={(id) => handleIndicator(id)}
          />
        )
      })
    }

    selects.push(
      <Select
        key={45}
        placeholder={'Отрасль'}
        data={[].concat(...industry).map((item) => ({
          id: item.id,
          title: item.name,
          value: item.name,
          children: [],
        }))}
        callBack={(id) => handleIndicator(id)}
      />
    )

    return selects.map((select) => select)
  }

  return (
    <div className={'form_indicators'}>
      {!fetchedDictionaryData.loading && (
        <Form form={form}>
          <Form.Item style={{ width: '60%' }}>
            <Form.Item name='input'>
              <Input
                placeholder={'Введите название индикатора'}
                inptRef={inputRef}
                style={{
                  margin: 20,
                  marginLeft: 0,
                  marginTop: 0,
                  minWidth: 250,
                  width: 250,
                }}
              />
            </Form.Item>
            {renderSelect()}
            <Button
              type='primary'
              handleAdd={handleSubmit}
              text3={'Добавить индикатор'}
            />
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
      )}
    </div>
  )
}
