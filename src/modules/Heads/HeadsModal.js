import React, { useState, useEffect } from 'react'

import Modal from '../../common/Modal'
import { CustomTable as Table } from '../../common/Table'

const HeadsModal = ({ organisations }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    if (organisations.status === 'success') {
      let arr = organisations.data.map((i, index) => ({
        key: i.id,
        '#': ++index,
        label: `${i.abbreviation}-${i['full-name']}`,
        abbreviation: i.abbreviation,
        id: i.id,
      }))

      setDataSource(arr)
    }
  }, [organisations])

  const onEdit = (record) => {
    console.log(record)
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
        hanldeEdit={onEdit}
        isEditable={true}
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
    dataIndex: 'label',
    width: '50%',
    editable: true,
  },
]
