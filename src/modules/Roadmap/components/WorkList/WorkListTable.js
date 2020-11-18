import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input } from 'antd'

import { WorkDetailsModal } from './WorkDetailsModal'
import { CustomTable as Table } from '../../common'
import {
  setWorkListTableColumnsHelper,
  setWorkListDataSourceHelper,
} from '../../utils/table_helper'
import { putRoadMap } from '../../features/roadmap/roadmapSlice'

export const WorkListTable = () => {
  const { organisations, categories, status, data } = useSelector(
    (state) => state.roadmap
  )
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [filtered, setFiltered] = useState()

  const [form] = Form.useForm()

  const columns = useMemo(() => {
    return setWorkListTableColumnsHelper(
      organisations,
      categories,
      setVisible,
      setRecord
    )
  }, [organisations, categories, setVisible, setRecord])

  const datasource = useMemo(() => {
    let arr = filtered ? filtered : data
    return setWorkListDataSourceHelper(arr)
  }, [data, filtered])

  const save = async (record, setEditingKey, form) => {
    try {
      const row = await form.validateFields()
      setEditingKey('')
      dispatch(putRoadMap({ status: row, id: record.id }))
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const onSearch = (e) => {
    setFiltered(
      Object.values(data).filter(
        (i) =>
          i.address &&
          i.address.toLowerCase().includes(e.target.value.toLowerCase())
      )
    )
  }

  return (
    <Form form={form}>
      <Form.Item name={'search'}>
        <Input
          allowClear
          placeholder={'Поиск по улице'}
          onChange={onSearch}
          style={{ width: 300 }}
        />
      </Form.Item>
      <Form.Item name='table'>
        <Table
          columns={columns}
          dataSource={datasource}
          loading={status === 'loading' ? true : false}
          isEditable={true}
          save={save}
        />
      </Form.Item>
      {visible && (
        <Form.Item name='modal'>
          <WorkDetailsModal
            visible={visible}
            setVisible={setVisible}
            record={record}
          />
        </Form.Item>
      )}
    </Form>
  )
}
