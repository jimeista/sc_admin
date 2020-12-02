import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Input } from 'antd'

import { CustomTable as Table } from '../../common/Table'
import {
  setIndicatorColumns,
  setIndicatorData,
} from '../../utils/indicator_table'

const IndicatorTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const { data, status } = useSelector((state) => state.indicator)

  useEffect(() => {
    status === 'success' && setDataSource(setIndicatorData(data))
  }, [data, status])

  const onSearch = (e) => {
    let filtered_ = dataSource.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    )

    setFiltered(filtered_)
  }

  return (
    <>
      <Input
        placeholder='Поиск по низванию индикатора'
        onChange={onSearch}
        style={{ width: '30%', margin: '15px 0' }}
      />
      <Table
        columns={setIndicatorColumns()}
        data={filtered ? filtered : dataSource}
        setData={setDataSource}
        loading={false}
        // handleEdit={onEdit}
        // handleDelete={onDelete}
        isEditable={true}
        isDeletable={true}
      />
    </>
  )
}

export default React.memo(IndicatorTable)
