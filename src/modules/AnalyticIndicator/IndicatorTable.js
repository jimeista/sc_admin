import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'

import { deleteIndicator } from '../../features/indicator/indicatorSlice'
import { CustomTable as Table } from '../../common/Table'
import { setTableColumns, setTableData } from '../../utils/indicator_table'

const IndicatorTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const dispatch = useDispatch()
  const { data, status, dictionaries, id } = useSelector(
    (state) => state.indicator
  )

  useEffect(() => {
    let data_ = data.filter((i) => i.dictionaries['Тип'] === 'Индикатор')
    status === 'success' && setDataSource(setTableData(data_))

    if (id) {
      setFiltered((state) => state.filter((i) => i.id !== id))
    }
  }, [data, status, id])

  const onSearch = (e) => {
    let filtered_ = dataSource.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setFiltered(filtered_)
  }

  const columns = useMemo(() => {
    if (dictionaries.status === 'success') {
      return setTableColumns(dictionaries.data, 'Сфера')
    } else {
      return []
    }
  }, [dictionaries])

  const onDelete = (record) => {
    dispatch(deleteIndicator(record.id))
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
        // handleEdit={onEdit}
        handleDelete={onDelete}
        isEditable={true}
        isDeletable={true}
      />
    </>
  )
}

export default React.memo(IndicatorTable)
