import React, { useContext, useEffect, useMemo, useState } from 'react'
import AdminTable from '../common/AdminTable'
import { AppContext } from '../../context/main'
import { getAPI, putAPI } from '../../utils/api'

export const DictionaryTable = () => {
  const {
    selectedDictionaryName,
    fetchedDictionaryData,
    setFetchedDictionaryData,
  } = useContext(AppContext)
  const [data, setData] = useState([])

  const columns = useMemo(() => {
    return selectedDictionaryName
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
  }, [selectedDictionaryName])

  useEffect(() => {
    let data_ = []
    if (!fetchedDictionaryData.loading) {
      const arr = fetchedDictionaryData.data.filter(
        (item) => item.name !== 'Тип'
      )

      const obb = arr.find((item) => item.name === selectedDictionaryName)

      data_ = selectedDictionaryName
        ? obb.options.map((item) =>
            item.options.length > 0
              ? {
                  key: item.name,
                  id: item.id,
                  tag: item.tag,
                  'parent-id': obb.id,
                  [selectedDictionaryName]: item.name,
                  children: item.options.map((ob) => ({
                    key: ob.name,
                    [selectedDictionaryName]: ob.name,
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
              item.name === 'Сфера' ||
              selectedDictionaryName === 'Стратегия 2050'
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

    setData(data_)
  }, [fetchedDictionaryData, selectedDictionaryName])

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
    <AdminTable
      cols={columns}
      data={data}
      loading={fetchedDictionaryData.loading}
      url={'/sc-analytic-indicators/api/dictionaries'}
      setFetchedData={setFetchedDictionaryData}
      save={save}
    />
  )
}
