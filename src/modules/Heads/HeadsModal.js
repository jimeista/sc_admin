import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Modal from '../../common/Modal'
import { CustomTable as Table } from '../../common/Table'
import { putOrganisationList } from '../../features/admin/adminSlice'

const HeadsModal = ({ organisations }) => {
  const [dataSource, setDataSource] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (organisations.status === 'success') {
      let arr = organisations.data.map((i, index) => ({
        key: i.id,
        '#': ++index,
        'full-name': i['full-name'],
        abbreviation: i.abbreviation,
        id: i.id,
      }))

      setDataSource(arr)
    }
  }, [organisations])

  const onEdit = (record) => {
    dispatch(
      putOrganisationList({
        abbreviation: record.abbreviation,
        'full-name': record['full-name'],
        id: record.id,
      })
    )
  }

  return (
    <Modal
      btntext='Редактировать курируемые организации'
      btnstyle={{ marginBottom: 15 }}
      title='Курируемые организации'
    >
      <Table
        columns={columns}
        data={dataSource}
        setData={setDataSource}
        loading={organisations.status !== 'success'}
        handleEdit={onEdit}
      />
    </Modal>
  )
}

export default React.memo(HeadsModal)

const columns = [
  {
    title: '№',
    dataIndex: '#',
    width: '2%',
    align: 'center',
  },
  {
    title: 'Аббревиатура',
    dataIndex: 'abbreviation',
    width: '20%',
    editable: true,
  },
  {
    title: 'Курируемые организации',
    dataIndex: 'full-name',
    width: '50%',
    editable: true,
  },
]
