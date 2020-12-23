import React, { useMemo, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input } from 'antd'

import { CustomTable as Table } from '../../common/Table'
import {
  setTableDefaultDataSource,
  setTableOtherDataSource,
  setTableUniqueDataSource,
} from '../../utils/dictionary_table'

const DictionaryTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()

  const { data, status, selected } = useSelector((state) => state.dictionary)

  //set table datasource on initial data load
  useEffect(() => {
    if (status === 'success' && selected === undefined) {
      setDataSource(setTableDefaultDataSource(data))
    }
  }, [status, data, selected])

  //set table datasource on selecting option
  useEffect(() => {
    if (selected) {
      if (selected === 'Сфера' || selected === 'Стратегия 2050') {
        setDataSource(setTableUniqueDataSource(data, selected))
      } else if (selected === 'Все справочники') {
        setDataSource(setTableDefaultDataSource(data))
      } else {
        setDataSource(setTableOtherDataSource(data, selected))
      }
    }
  }, [selected, data])

  console.log(dataSource)

  //set table filtered datasource on search
  const onSearch = (e) => {
    let filtered_ = []
    dataSource.forEach((i) => {
      let arr = i.children.filter((с) =>
        с.name.toLowerCase().includes(e.target.value.toLowerCase())
      )

      if (arr.length > 0) {
        filtered_ = [{ ...i, children: arr }, ...filtered_]
      }
    })

    filtered_.length > 0 ? setFiltered(filtered_) : setFiltered([])
  }

  //set table initial columns
  const columns = useMemo(() => {
    return [
      {
        title: 'Наименование',
        dataIndex: 'name',
      },
    ]
  }, [])

  const onEdit = (record) => {}

  const onDelete = (record) => {}

  return (
    <>
      <Input
        placeholder='Поиск справочника'
        onChange={onSearch}
        allowClear={true}
        style={{ width: '30%', margin: '15px 0' }}
      />

      <Table
        columns={columns}
        data={filtered ? filtered : dataSource}
        setData={setDataSource}
        loading={status !== 'success' ? true : false}
        handleEdit={onEdit}
        handleDelete={onDelete}
        isEditable={selected ? false : true}
        isDeletable={selected ? false : true}
        expandable={filtered ? true : false}
      />
    </>
  )
}

export default React.memo(DictionaryTable)
