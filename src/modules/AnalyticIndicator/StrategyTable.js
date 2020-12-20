import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Input } from 'antd'

import { CustomTable as Table } from '../../common/Table'
import { setTableColumns, setTableData } from '../../utils/indicator_table'

const StrategyTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const { data, status, dictionaries } = useSelector((state) => state.indicator)

  useEffect(() => {
    let data_ = data.filter((i) => i.dictionaries['Тип'] === 'Стратегия')
    status === 'success' && setDataSource(setTableData(data_))
  }, [data, status])

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
        // handleDelete={onDelete}
        isEditable={true}
        isDeletable={true}
      />
    </>
  )
}

export default React.memo(StrategyTable)
