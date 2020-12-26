import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { putHeads } from '../../features/heads/headsSlice'
import { setColumnsHelper, setDataSourceHelper } from '../../utils/heads_table'

import { CustomTable as Table } from '../../common/Table'

const HeadsTable = ({ organisations, data, status }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    //при успешной загрузке, данные подстраиваются под структуру ant table
    status === 'success' && setDataSource(setDataSourceHelper(data))
  }, [status, data])

  const dispatch = useDispatch()

  //инициализация своиства ant table columns
  const columns = useMemo(() => {
    //подготовка структуры опции для редактирования колонки "курируемые организации"
    let options =
      organisations.status === 'success' &&
      organisations.data.map((i) => ({
        value: `${i.abbreviation}`,
        id: i.id,
        label: `${i.abbreviation}-${i['full-name']}`,
      }))

    return setColumnsHelper(options)
  }, [organisations])

  //реализация редактирования данных с таблицы
  const onEdit = (record) => {
    if (organisations.status === 'success') {
      //определяем массив id выбранных организации
      let ids = organisations.data
        .filter((i) =>
          record['supervised-organisations'].includes(`${i.abbreviation}`)
        )
        .map((i) => i.id)

      //структура объекта отправки put запроса на сервер
      let server = { name: record.name, 'supervised-organisations': ids }

      //структура объекта на обновление клиентской части
      let client = {
        name: record.name,
        'supervised-organisations': record['supervised-organisations'].map(
          (i) => {
            let abb = i.split('-')[0]
            let name = i.split('-')[1]

            return {
              abbreviation: abb ? abb : i,
              'full-name': name ? name : '',
            }
          }
        ),
      }

      dispatch(
        putHeads({
          id: record['supervisor-id'],
          client,
          server,
        })
      )
    }
  }

  return (
    <Table
      columns={columns}
      data={dataSource}
      setData={setDataSource}
      loading={status !== 'success'}
      handleEdit={onEdit}
      isEditable={true}
      isDeletable={false} //нельзя удалить
    />
  )
}

export default React.memo(HeadsTable)
