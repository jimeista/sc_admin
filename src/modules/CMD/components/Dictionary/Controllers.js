import React, { useState, useRef, useContext } from 'react'
import { Alert, Form } from 'antd'

import { getAPI, postAPI } from '../../utils/api'
import { Button, Input, Select } from '../common'

import { AppContext } from '../../context/main'

export const Controllers = ({ ant_form, setIsError }) => {
  const inptRef = useRef()
  const inptRef2 = useRef()

  const [status, setStatus] = useState({ alert: false })
  const onCloseAlert = () => setStatus({ alert: false })

  const {
    selectedIndustry,
    selectedDictionaryName,
    fetchedDictionaryData,
    setFetchedDictionaryData,
  } = useContext(AppContext)

  let obb
  if (!fetchedDictionaryData.loading) {
    obb = fetchedDictionaryData.data.find(
      (item) => item.name === selectedDictionaryName
    )
  }

  const handleAddDictionary = () => {
    if (inptRef.current.input.value) {
      const name = inptRef.current.input.value
      const data = {
        'parent-id': obb.id,
        tag: selectedDictionaryName,
        name,
        options: [],
      }

      postAPI('/sc-analytic-indicators/api/dictionaries', data).then((res) => {
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

        getAPI('/sc-analytic-indicators/api/dictionaries')
          .then((res) =>
            setFetchedDictionaryData({
              loading: false,
              data: res.data,
            })
          )
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

      ant_form.resetFields()
    } else {
      setStatus({
        alert: true,
        message: 'Ошибка',
        description: 'Введите необходимое название для отправки на сервер',
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

  const handleAddDictionaryChild = () => {
    if (selectedIndustry && inptRef2.current.input.value) {
      const name = inptRef2.current.input.value

      const ob = obb.options.find((item) => item.name === selectedIndustry)
      const data = {
        'parent-id': ob.id,
        tag: 'Отрасль',
        name,
        options: [],
      }

      postAPI('/sc-analytic-indicators/api/dictionaries', data).then((res) => {
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

        getAPI('/sc-analytic-indicators/api/dictionaries')
          .then((res) =>
            setFetchedDictionaryData({
              loading: false,
              data: res.data,
            })
          )
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
      ant_form.resetFields()
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

  let names = []
  if (obb) {
    names = obb.options.map((item) => ({
      id: item.id,
      title: item.name,
      value: item.name,
      children: [],
    }))
  }

  return (
    <>
      {selectedDictionaryName && (
        <Form.Item name='dictionary-controllers Controllers_style'>
          <div className='form_add_sphere Controllers_style_inner'>
            <Input
              inptRef={inptRef}
              required={true}
              placeholder={
                selectedDictionaryName === 'Сфера' ||
                selectedDictionaryName === 'Стратегия 2050'
                  ? 'Добавить новую сферу'
                  : 'Добавить новый элемент'
              }
            />
            <Button handleAdd={handleAddDictionary} text1={'Добавить сферу'} />
          </div>
        </Form.Item>
      )}
      {selectedDictionaryName === 'Сфера' ||
      selectedDictionaryName === 'Стратегия 2050' ? (
        <Form.Item className='form_add_sphere_wrap'>
          <Select data={names} placeholder='Сделайте выбор' />
          <div className='form_add_sphere'>
            <Form.Item name='dictionary-child-controllers'>
              <Input
                inptRef={inptRef2}
                placeholder={'Добавить новую отрасль'}
                required={true}
              />
            </Form.Item>
            <Button
              handleAdd={handleAddDictionaryChild}
              text2={'Добавить отрасль'}
            />
          </div>
        </Form.Item>
      ) : null}
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
    </>
  )
}
