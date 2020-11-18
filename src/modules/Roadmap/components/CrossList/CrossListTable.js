import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Form } from 'antd'

import { CrossDetailsModal } from './CrossDetailsModal'
import { CustomTable as Table } from '../../common'
import {
  setCrossListTableColumnsHelper,
  setCrossListDataSourceHelper,
} from '../../utils/table_helper'

export const CrossListTable = () => {
  const { categories, intersections, data, status } = useSelector(
    (state) => state.roadmap
  )
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})

  const [form] = Form.useForm()

  const columns = useMemo(() => {
    return setCrossListTableColumnsHelper(
      categories,
      setVisible,
      setRecord,
      intersections
    )
  }, [categories, setVisible, setRecord, intersections])

  return (
    <Form form={form}>
      <Form.Item name='table'>
        <Table
          columns={columns}
          dataSource={setCrossListDataSourceHelper(data, intersections)}
          loading={status === 'loading' ? true : false}
        />
      </Form.Item>
      {visible && (
        <Form.Item name='modal'>
          <CrossDetailsModal
            visible={visible}
            setVisible={setVisible}
            record={record}
            data={data}
          />
        </Form.Item>
      )}
    </Form>
  )
}
