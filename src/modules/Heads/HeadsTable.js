import React, { useState, useEffect, useMemo } from 'react'

import { CustomTable as Table } from '../../common/Table'
import { setColumnsHelper, setDataSourceHelper } from '../../utils/heads_table'

const HeadsTable = ({ organisations }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(setDataSourceHelper())
  }, [])

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

  return (
    <div>
      <Table
        columns={columns}
        data={dataSource}
        setData={setDataSource}
        loading={organisations.status !== 'success'}
        isEditable={true}
        isDeletable={true}
      />
    </div>
  )
}

export default React.memo(HeadsTable)
