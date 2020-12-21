import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Input, Modal } from 'antd'

import IndicatorinfoModalContent from './IndicatorinfoModalContent'
import { CustomTable as Table } from '../../common/Table'
import { setTableColumns, setTableData } from '../../utils/indicator_table'

const IndicatorinfoTable = () => {
  const [dataSource, setDataSource] = useState([])
  const [filtered, setFiltered] = useState()
  const [open, setOpen] = useState(false)
  const [record, setRecord] = useState(null)

  const { data, status, dictionaries } = useSelector(
    (state) => state.indicatorinfo
  )

  useEffect(() => {
    let data_ = data.filter((i) => i.dictionaries['Тип'] === 'Индикатор')
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
      return setTableColumns(
        dictionaries.data,
        'Сфера',
        true,
        setOpen,
        setRecord
      )
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
        isEditable={true}
        isDeletable={true}
      />

      <Modal
        title={record && record.name}
        visible={open}
        onOk={() => {
          setOpen(false)
        }}
        onCancel={() => {
          setOpen(false)
        }}
        width={'80%'}
        footer={null}
      >
        <IndicatorinfoModalContent record={record} />
      </Modal>
    </>
  )
}

export default React.memo(IndicatorinfoTable)
