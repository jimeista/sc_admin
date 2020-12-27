import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  deleteRoleModule,
  putRoleModule,
} from '../../features/roles/rolesSlice'
import { setRoleColumns, setRoleDataSource } from '../../utils/roles_table'

import { CustomTable as Table } from '../../common/Table'

const RoleTable = ({ role_modules, options, modules }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    //при успешной загрузке, данные подстраиваются под структуру ant table
    role_modules.status === 'success' &&
      setData(setRoleDataSource(role_modules.data))
  }, [role_modules])

  //реализация редактирования данных с таблицы
  //данная функция делает проверку на список новодобавленных и удаленных модулей из таблицы
  const onEdit = (record) => {
    let arr = record.modules.map((i) => i['permitted-module']) //записываем наименования всех модулей

    //проверка на добавление нового модуля
    //фильтруем и вытаскиваем id новых модулей
    let added = record['permitted-modules'].filter(
      (name) => !arr.includes(name)
    )
    added = modules.data.filter((i) => added.includes(i.name)).map((i) => i.id)

    //проверка на удаление нового модуля
    //фильтруем и вытаскиваем id удаленных модулей
    let removed = record.modules
      .filter(
        (item) =>
          !record['permitted-modules'].includes(item['permitted-module'])
      )
      .map((i) => i['authority-id'])

    dispatch(
      putRoleModule({
        id: record.key,
        removed,
        added,
        repr: record.repr,
        'permitted-modules': record['permitted-modules'],
      })
    )
  }

  //реализация удаления данных с таблицы
  const onDelete = (record) => {
    dispatch(deleteRoleModule(record.key))
  }

  return (
    <Table
      columns={setRoleColumns(options)} //options as props to show available options on row edit
      data={data}
      setData={setData}
      loading={role_modules.status !== 'success'}
      handleDelete={onDelete}
      handleEdit={onEdit}
      isEditable={true}
      isDeletable={true}
    />
  )
}

export default React.memo(RoleTable)
