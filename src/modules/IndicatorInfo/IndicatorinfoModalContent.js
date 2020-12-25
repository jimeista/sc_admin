import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs } from 'antd'

import {
  getIndicatorInfoPopUp,
  deleteIndicatorInfoPopUp,
  putIndicatorInfoPopUp,
} from '../../features/indicatorinfo/indicatorinfoSlice'
import { CustomTable as Table } from '../../common/Table'

import IndicatorInfoControllers from './IndicatorInfoControllers'

const IndicatorinfoModalContent = ({ record }) => {
  const dispatch = useDispatch()
  const { popup } = useSelector((state) => state.indicatorinfo)

  const [data, setData] = useState([])
  const { TabPane } = Tabs

  useEffect(() => {
    if (record) {
      dispatch(getIndicatorInfoPopUp(record.id))
    }
  }, [record])

  useEffect(() => {
    if (popup.status === 'success') {
      setData(popup.data)
    }
  }, [popup])

  const columns = useMemo(() => {
    return [
      {
        title: 'Дата',
        dataIndex: 'date',
        align: 'center',
        width: '10%',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Дата изменения',
        dataIndex: 'last-edit',
        align: 'center',
        width: '10%',
      },
      {
        title: 'Коментарий',
        dataIndex: 'edit-comment',
        editable: true,
      },
    ]
  }, [])

  const dataSource = useMemo(() => {
    return data.map((i) => ({
      key: `${i['indicator-name']}-${i.id}`,
      planned: i.planned,
      fact: i.fact,
      date: i.date.slice(0, 7),
      'last-edit': i['last-edit'].slice(0, 10),
      id: i.id,
      'edit-comment': i['edit-comment'],
    }))
  }, [data])

  const onDelete = (record) => {
    dispatch(deleteIndicatorInfoPopUp(record.id))
  }

  const onEditPlan = (record) => {
    const ob = popup.data.find((i) => i.id === record.id)

    const data = {
      'edit-comment': record['edit-comment'],
      fact: ob.fact,
      date: ob.date,
      planned: record.planned,
    }

    dispatch(putIndicatorInfoPopUp({ id: record.id, data }))
  }

  const onEditFact = (record) => {
    const ob = popup.data.find((i) => i.id === record.id)

    const data = {
      planned: ob.planned,
      date: ob.date,
      'edit-comment': record['edit-comment'],
      fact: record.fact,
    }

    dispatch(putIndicatorInfoPopUp({ id: record.id, data }))
  }

  return (
    <Tabs defaultActiveKey='1' tabPosition={'top'}>
      <TabPane tab='План' key='1'>
        <IndicatorInfoControllers name={'План'} record={record} />
        <Table
          columns={[
            ...columns,
            {
              title: 'План',
              dataIndex: 'planned',
              align: 'center',
              width: '10%',
              editable: true,
              type: 'planfact',
            },
          ]}
          data={dataSource.filter((i) => i.planned !== null)}
          setData={setData}
          loading={popup.status !== 'success' ? true : false}
          handleDelete={onDelete}
          handleEdit={onEditPlan}
          isEditable={false}
          isDeletable={false}
        />
      </TabPane>
      <TabPane tab='Факт' key='2'>
        <IndicatorInfoControllers name={'Факт'} record={record} />
        <Table
          columns={[
            ...columns,
            {
              title: 'Факт',
              dataIndex: 'fact',
              align: 'center',
              width: '10%',
              editable: true,
              type: 'planfact',
            },
          ]}
          data={dataSource.filter((i) => i.fact !== null)}
          setData={setData}
          loading={popup.status !== 'success' ? true : false}
          handleDelete={onDelete}
          handleEdit={onEditFact}
          isEditable={false}
          isDeletable={false}
        />
      </TabPane>
    </Tabs>
  )
}

export default React.memo(IndicatorinfoModalContent)