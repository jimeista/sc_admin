import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { CustomTable as Table } from '../../common/Table'
import {
  deleteRoleModule,
  putRoleModule,
} from '../../features/roles/rolesSlice'
import { setRoleColumns, setRoleDataSource } from '../../utils/roles_table'

//UI: render table
const RoleTable = ({ role_modules, options, modules }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  useEffect(() => {
    //TASK: if role's modules are ready,show them on table
    //LOGIC: set table datasource state
    role_modules.status === 'success' &&
      setData(setRoleDataSource(role_modules.data))
  }, [role_modules])

  const onEdit = (record) => {
    //store newly added modules
    let added = []
    let arr = record.modules.map((i) => i['permitted-module']) //initial modules
    added = record['permitted-modules'].filter((name) => !arr.includes(name))
    added = modules.data.filter((i) => added.includes(i.name)).map((i) => i.id)

    // //check if module is removed
    let removed = [] //store removed modules
    removed = record.modules
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
    />
  )
}

export default React.memo(RoleTable)
