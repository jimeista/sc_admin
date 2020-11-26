import React, { useState, useEffect } from 'react'
import { CustomTable as Table } from '../../common/Table'
import { useDispatch } from 'react-redux'

import { deleteUser, editUser } from '../../features/users/usersSlice'

import { setColumnsHelper, setDataSourceHelper } from '../../utils/users_table'
import { onRequest } from '../../utils/users_helper'

const UserTable = ({ data, status, roles, organisations }) => {
  const [dataSource, setDataSource] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'success') {
      setDataSource(setDataSourceHelper(data))
    }
  }, [data, status])

  const onEdit = (record_) => {
    let { post, record } = onRequest(record_, roles, organisations)

    delete record['№']
    delete record['key']

    dispatch(editUser({ post, record }))
  }
  const onDelete = (record) => {
    dispatch(deleteUser(record['account-id']))
  }

  return (
    <Table
      columns={setColumnsHelper(
        organisations.map((o) => o.value),
        roles
      )}
      data={dataSource}
      setData={setDataSource}
      loading={status !== 'success'}
      handleEdit={onEdit}
      handleDelete={onDelete}
    />
  )
}

export default React.memo(UserTable)
