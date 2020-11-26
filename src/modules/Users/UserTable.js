import React, { useState, useEffect } from 'react'
import { CustomTable as Table } from '../../common/Table'

import { setColumnsHelper, setDataSourceHelper } from '../../utils/users_table'

const UserTable = ({ data, status, roles, organisations }) => {
  const [dataSource, setDataSource] = useState([])

  console.log('loaded', dataSource, status, roles, organisations)
  useEffect(() => {
    if (status === 'success') {
      setDataSource(setDataSourceHelper(data))
    }
  }, [data, status])

  return (
    <Table
      columns={setColumnsHelper(organisations, roles)}
      data={dataSource}
      setData={setDataSource}
      loading={status !== 'success'}
    />
  )
}

export default React.memo(UserTable)
