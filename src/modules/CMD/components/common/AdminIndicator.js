import React, { useEffect, useContext, useState } from 'react'
import { putAPI, getAPI } from '../../utils/api'
import {
  getObjectKeys,
  capitalizeFirstLetter,
  strcmp,
} from '../../utils/helper'
import { AppContext } from '../../context/main'

import { Table, Modal } from '../common'

export const AdminIndicator = ({ isLink, isStrategy }) => {
  const [open, setOpen] = useState(false)

  const {
    dictionary_names,
    setModalIndicator,
    fetchedDictionaryData,
    fetchedIndicatorData,
    setFetchedIndicatorData,
  } = useContext(AppContext)
  let columns = []
  const dataSource = []

  useEffect(() => {
    getAPI('/sc-analytic-indicators/api/indicators').then((res) => {
      setFetchedIndicatorData({
        loading: false,
        data: res.data,
      })
    })
  }, [])

  let names = [...dictionary_names, 'Отрасль'] //table column names
  names = names.filter((name) =>
    isStrategy ? name !== 'Сфера' : name !== 'Стратегия 2050'
  )
  names.sort()

  //get filter and select option drop data
  let filter = {} //table column's filter options
  let option_data = {} // on edit drop select options
  if (!fetchedDictionaryData.loading) {
    fetchedDictionaryData.data.map((item) => {
      filter = {
        ...filter,
        [item.name]: item.options.map((option) => option.name),
      }

      if (
        !isStrategy ? item.name === 'Сфера' : item.name === 'Стратегия 2050'
      ) {
        const arr = item.options.map((i) => i.options.map((ii) => ii.name))
        filter = { ...filter, Отрасль: [].concat(...arr) }
      }

      option_data = {
        ...option_data,
        [item.name]: item.options.map((option) => {
          return {
            title: option.name,
            value: option.name,
            id: option.id,
            children: [],
          }
        }),
      }
    })

    const obj = fetchedDictionaryData.data.find((item) =>
      isStrategy ? item.name === 'Стратегия 2050' : item.name === 'Сфера'
    )

    option_data = {
      ...option_data,
      Отрасль: [].concat(
        ...obj.options.map((op) =>
          op.options.map((o) => ({
            title: o.name,
            value: o.name,
            id: o.id,
            children: [],
          }))
        )
      ),
    }
  }

  //set columns and dataSource for table
  columns = [
    {
      title: 'Индикатор',
      dataIndex: 'Индикатор',
      width: 250,
      editable: true,
      render: (text, record) =>
        isLink ? (
          <a
            onClick={() => {
              setOpen(true)
              setModalIndicator({
                name: record.key,
                id: record.id,
              })
            }}
          >
            {text}
          </a>
        ) : (
          text
        ),
      sorter: (a, b) => strcmp(a.Индикатор, b.Индикатор),
      sortDirections: ['ascend'],
    },
    ...names.map((name) => {
      const filtered =
        filter[name] &&
        filter[name].map((option_name) => ({
          text: option_name,
          value: option_name,
        }))

      return {
        title: capitalizeFirstLetter(
          name === 'Стратегия 2050' ? 'Сфера' : name
        ),
        dataIndex: name,
        editable: true,
        width: 250,
        data: option_data[name],
        filters: filtered,
        type: 'select',
        onFilter: (value, record) => record[name] === value,
      }
    }),
  ]

  if (!fetchedIndicatorData.loading) {
    const arr = isStrategy
      ? fetchedIndicatorData.data.filter(
          (item) =>
            item.dictionaries.Тип && item.dictionaries.Тип === 'Стратегия'
        )
      : fetchedIndicatorData.data.filter(
          (item) =>
            item.dictionaries.Тип && item.dictionaries.Тип === 'Индикатор'
        )

    arr.map((indicator) => {
      let ob = {
        id: indicator.id,
        key: indicator.name,
        Индикатор: indicator.name,
      }
      getObjectKeys(indicator.dictionaries).map((dictionary_name) => {
        ob = {
          ...ob,
          [dictionary_name]: indicator.dictionaries[dictionary_name],
        }
      })
      dataSource.push(ob)
    })
  }

  const save = async (record, form, setEditingKey) => {
    try {
      const data_post = {
        name: record['Индикатор'],
        dictionaries: [isStrategy ? 229 : 227],
      }
      let ids = []
      const row = await form.validateFields()

      const arr = Object.keys(row).map((key) => ({
        name: key,
        value: row[key],
      }))
      const filtered_arr = arr.filter(
        (item) => item.value !== undefined && item.name !== 'Индикатор'
      )

      filtered_arr.map((item) => {
        if (item.name === 'Отрасль') {
          const name = isStrategy ? 'Стратегия 2050' : 'Сфера'
          const ob = fetchedDictionaryData.data.find((i) => i.name === name)
          const obb = ob.options.find((i) =>
            i.options.find((ii) => ii.name === item.value)
          )
          const o = obb.options.find((i) => i.name === item.value)
          ids = [...ids, o.id]
        } else {
          const ob = fetchedDictionaryData.data.find(
            (i) => i.name === item.name
          )
          const obb = ob.options.find((i) => i.name === item.value)
          ids = [...ids, obb.id]
        }
      })

      data_post.dictionaries = [...data_post.dictionaries, ...ids]
      putAPI(`/sc-analytic-indicators/api/indicators/${record.id}`, data_post)
        .then((res) =>
          getAPI('/sc-analytic-indicators/api/indicators').then((res) => {
            setFetchedIndicatorData({
              loading: false,
              data: res.data,
            })
          })
        )
        .catch((err) => console.log(err))

      form.resetFields()
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  return (
    <>
      <Modal open={open} setOpen={setOpen} className='AdminIndicator_style' />
      <Table
        cols={columns}
        data={dataSource}
        loading={fetchedIndicatorData.loading}
        url={'/sc-analytic-indicators/api/indicators'}
        setFetchedData={setFetchedIndicatorData}
        save={save}
        isLink={isLink}
      />
    </>
  )
}
