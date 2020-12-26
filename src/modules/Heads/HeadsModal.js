import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { putOrganisationList } from '../../features/admin/adminSlice'

import Modal from '../../common/Modal'
import { CustomTable as Table } from '../../common/Table'

//главная страница модального окна по курируемым организациям
const HeadsModal = ({ organisations }) => {
  const [dataSource, setDataSource] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    //при успешной загрузке, данные подстраиваются под структуру ant table
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

  //реализация редактирования данных с таблицы
  const onEdit = (record) => {
    //структура объекта отправки put запроса на сервер
    let data = {
      abbreviation: record.abbreviation,
      'full-name': record['full-name'],
      id: record.id,
    }
    dispatch(putOrganisationList(data))
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
        isEditable={true}
        isDeletable={true}
      />
    </Modal>
  )
}

export default React.memo(HeadsModal)

//инициализация своиства ant table columns
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
