import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { CustomTable as Table } from '../../common/Table'
import {
  deleteRoleModule,
  putRoleModule,
} from '../../features/admin/adminSlice'
import { setRoleColumns, setRoleDataSource } from '../../utils/table'

//UI: render table
const RoleTable = ({ role_modules, options, modules }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  // console.log('data', data, 'role_modules', role_modules, 'options', options)

  useEffect(() => {
    //TASK: if role's modules are ready,show them on table
    //LOGIC: set table datasource state
    role_modules.status === 'success' &&
      setData(setRoleDataSource(role_modules.data))
  }, [role_modules])

  const onEdit = (record) => {
    //find edited role
    let role = role_modules.data.find((i) => i.id === record.key)
    //check if module is added
    let added = [] //store newly added modules
    added = record['permitted-modules'].filter(
      (name) => !role['permitted-modules'].includes(name)
    )
    //check if module is removed
    let removed = [] //store removed modules
    removed = role['permitted-modules'].filter(
      (name) => !record['permitted-modules'].includes(name)
    )

    //change names to ids
    added = modules.data.filter((i) => added.includes(i.name)).map((i) => i.id)
    removed = modules.data
      .filter((i) => removed.includes(i.name))
      .map((i) => i.id)

    dispatch(
      putRoleModule({
        id: record.key,
        added,
        removed,
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
