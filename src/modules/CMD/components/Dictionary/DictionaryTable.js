import React, { useContext } from 'react'
import { AdminTable as Table } from '../common/AdminTable'
import { AppContext } from '../../context/main'
import { getAPI, putAPI } from '../../utils/api'

export const DictionaryTable = () => {
  const {
    selectedDictionaryName,
    fetchedDictionaryData,
    setFetchedDictionaryData,
  } = useContext(AppContext)
  let columns = []
  let data = []

  columns = selectedDictionaryName
    ? [
        {
          title: 'Наименование',
          dataIndex: selectedDictionaryName,
          editable: true,
          width: '90%',
        },
      ]
    : [
        {
          title: 'Наименование',
          dataIndex: 'All',
          width: '90%',
          padding: '10px',
        },
      ]

  if (!fetchedDictionaryData.loading) {
    const arr = fetchedDictionaryData.data.filter((item) => item.name !== 'Тип')

    const obb = arr.find((item) => item.name === selectedDictionaryName)

    data = selectedDictionaryName
      ? obb.options.map((item) =>
          item.options.length > 0
            ? {
                key: item.name,
                id: item.id,
                tag: item.tag,
                'parent-id': obb.id,
                [item.tag]: item.name,
                children: item.options.map((ob) => ({
                  key: ob.name,
                  [item.tag]: ob.name,
                  'parent-id': item.id,
                  tag: item.tag,
                  id: ob.id,
                })),
              }
            : {
                key: item.name,
                id: item.id,
                tag: item.tag,
                'parent-id': obb.id,
                [selectedDictionaryName]: item.name,
              }
        )
      : [].concat(
          ...arr.map((item) =>
            item.name === 'Сфера' || selectedDictionaryName === 'Стратегия 2050'
              ? item.options.map((op) => ({
                  key: op.name,
                  All: op.name,
                  children: op.options.map((ob) => ({
                    key: ob.name,
                    All: ob.name,
                  })),
                }))
              : {
                  key: item.name,
                  All: item.name,
                  children: item.options.map((ob) => ({
                    key: ob.name,
                    All: ob.name,
                  })),
                }
          )
        )
  }

  const save = async (record, form, setEditingKey) => {
    try {
      const row = await form.validateFields()

      const data_post = {
        name: row[record.tag],
        tag: record.tag,
      }

      putAPI(`/sc-analytic-indicators/api/dictionaries/${record.id}`, data_post)
        .then((res) =>
          getAPI(`/sc-analytic-indicators/api/dictionaries`).then((res) =>
            setFetchedDictionaryData({ loading: false, data: res.data })
          )
        )
        .catch((err) => console.log(err))

      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  return (
    <Table
      cols={columns}
      data={data}
      loading={fetchedDictionaryData.loading}
      url={'/sc-analytic-indicators/api/dictionaries'}
      setFetchedData={setFetchedDictionaryData}
      save={save}
    />
  )
}