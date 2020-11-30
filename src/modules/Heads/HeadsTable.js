import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'

import { CustomTable as Table } from '../../common/Table'
import { putHeads } from '../../features/heads/headsSlice'
import { setColumnsHelper, setDataSourceHelper } from '../../utils/heads_table'

const HeadsTable = ({ organisations, data, status }) => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    status === 'success' && setDataSource(setDataSourceHelper(data))
  }, [status, data])

  const dispatch = useDispatch()

  const columns = useMemo(() => {
    let options =
      organisations.status === 'success' &&
      organisations.data.map((i) => ({
        value: `${i.abbreviation}-${i['full-name']}`,
        id: i.id,
        label: `${i.abbreviation}-${i['full-name']}`,
      }))
    return setColumnsHelper(options)
  }, [organisations])

  const onEdit = (record) => {
    if (organisations.status === 'success') {
      let ids = organisations.data
        .filter((i) =>
          record['supervised-organisations'].includes(
            `${i.abbreviation}-${i['full-name']}`
          )
        )
        .map((i) => i.id)

      let ob = { name: record.name, 'supervised-organisations': ids }

      dispatch(
        putHeads({
          id: record['supervisor-id'],
          client: {
            name: record.name,
            'supervised-organisations': record['supervised-organisations'].map(
              (i) => ({
                abbreviation: i.split('-')[0],
                'full-name': i.split('-')[1],
              })
            ),
          },
          server: ob,
        })
      )
    }
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
      />
    </div>
  )
}

export default React.memo(HeadsTable)
