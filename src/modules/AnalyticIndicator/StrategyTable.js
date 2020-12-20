import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'

import {
  deleteIndicator,
  putIndicator,
} from '../../features/indicator/indicatorSlice'
import { CustomTable as Table } from '../../common/Table'
import { setTableColumns, setTableData } from '../../utils/indicator_table'

const StrategyTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const dispatch = useDispatch()
  const { data, status, dictionaries, putId, deletedId } = useSelector(
    (state) => state.indicator
  )

  useEffect(() => {
    let data_ = data.filter((i) => i.dictionaries['Тип'] === 'Стратегия')
    status === 'success' && setDataSource(setTableData(data_))

    if (deletedId) {
      setFiltered((state) => state && state.filter((i) => i.id !== deletedId))
    }

    if (putId) {
      setFiltered(
        (state) =>
          state &&
          state.map((i) =>
            i.id === putId.id ? setTableData([putId.value])[0] : i
          )
      )
    }
  }, [data, status, deletedId, putId])

  const onSearch = (e) => {
    let filtered_ = dataSource.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setFiltered(filtered_)
  }

  const columns = useMemo(() => {
    if (dictionaries.status === 'success') {
      return setTableColumns(dictionaries.data, 'Стратегия 2050')
    } else {
      return []
    }
  }, [dictionaries])

  const onDelete = (record) => {
    dispatch(deleteIndicator(record.id))
  }

  const onEdit = (record) => {
    let client = {
      id: record.id,
      name: record.name,
      dictionaries: { Тип: 'Стратегия' },
    }
    let server = {
      name: record.name,
      dictionaries: [229],
    }

    Object.keys(record).forEach((key) => {
      if (
        key !== 'id' &&
        key !== 'name' &&
        key !== 'key' &&
        key !== 'Отрасль' &&
        key !== 'Тип' &&
        record[key] !== undefined
      ) {
        //prepare for client
        client = {
          ...client,
          dictionaries: { ...client.dictionaries, [key]: record[key] },
        }

        //prepare for server post
        let dictionary_ = dictionaries.data.find((i) => i.name === key)
        let id = dictionary_.options.find((o) => o.name === record[key]).id

        server = { ...server, dictionaries: [...server.dictionaries, id] }
      } else {
      }
    })

    // console.log(client, server, record)
    dispatch(putIndicator({ id: record.id, client, server }))
  }

  return (
    <>
      <Input
        placeholder='Поиск по низванию индикатора'
        onChange={onSearch}
        allowClear={true}
        style={{ width: '30%', margin: '15px 0' }}
      />
      <Table
        columns={columns}
        data={filtered ? filtered : dataSource}
        setData={setDataSource}
        loading={dictionaries.status !== 'success' ? true : false}
        handleEdit={onEdit}
        handleDelete={onDelete}
        isEditable={true}
        isDeletable={true}
      />
    </>
  )
}

export default React.memo(StrategyTable)
