import React, { useState, useEffect, useMemo } from 'react'

import { CustomTable as Table } from '../../common/Table'
import { setColumnsHelper, setDataSourceHelper } from '../../utils/heads_table'

const HeadsTable = ({ organisations, data, status }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    status === 'success' && setDataSource(setDataSourceHelper(data))
  }, [status, data])

  const columns = useMemo(() => {
    let options =
      organisations.status === 'success' &&
      organisations.data.map((i) => ({
        value: i.abbreviation,
        id: i.id,
        label: `${i.abbreviation}-${i['full-name']}`,
      }))
    return setColumnsHelper(options)
  }, [organisations])

  const onEdit = (record) => {
    console.log(record)
  }

  return (
    <div>
      <Table
        columns={columns}
        data={dataSource}
        setData={setDataSource}
        loading={status !== 'success'}
        handleEdit={onEdit}
        isEditable={true}
        // isDeletable={true}
      />
    </div>
  )
}

export default React.memo(HeadsTable)
