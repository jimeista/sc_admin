import React, { useContext } from 'react'
import { Table } from '../common'
import { AppContext } from '../../context/main'
import { putAPI, getAPI } from '../../utils/api'

export const IndicatorInfoTable = ({ plan, isStrategy }) => {
  const {
    fetchedIndicatorInfoData,
    setFetchedIndicatorInfoData,
    modalIndicator,
  } = useContext(AppContext)

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'year',
      key: 'year',
      render: (text) => <a>{text}</a>,
    },
    {
      title: plan,
      dataIndex: plan,
      key: plan,
      type: 'number',
      editable: true,
    },
    {
      title: 'Дата изменения',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Коментарий',
      key: 'comment',
      editable: true,
      dataIndex: 'comment',
    },
  ]

  let dataSource =
    !fetchedIndicatorInfoData.loading &&
    fetchedIndicatorInfoData.data.map((item, index) => {
      const date = item['last-edit'].substr(0, item['last-edit'].indexOf('T'))
      const year = item.date.substr(0, 7)

      return plan === 'План'
        ? item.planned && {
            key: item['indicator-name'],
            id: item.id,
            year,
            План: item.planned,
            date,
            comment: item['edit-comment'],
          }
        : item.fact && {
            key: item['indicator-name'],
            id: item.id,
            year,
            Факт: item.fact,
            date,
            comment: item['edit-comment'],
          }
    })

  dataSource =
    dataSource && dataSource.filter((ob) => ob !== undefined && ob !== null)

  const edit = (record, form, setEditingKey) => {
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const save = async (record, form, setEditingKey) => {
    try {
      const row = await form.validateFields()
      const ob = fetchedIndicatorInfoData.data.find(
        (item) => item.id === record.id
      )

      const data_post = {
        date: `${record.year}-01`,
        'edit-comment': row.comment,
        fact: row.Факт ? row.Факт : ob.fact,
        planned: row.План ? row.План : ob.planned,
      }

      putAPI(`/sc-analytic-indicators/api/indexes/${record.id}`, data_post)
        .then((res) =>
          getAPI(
            `/sc-analytic-indicators/api/indicators/${modalIndicator.id}/indexes`
          ).then(function (res) {
            setFetchedIndicatorInfoData({
              data: res.data,
              loading: false,
            })
          })
        )
        .catch((err) => console.log(err))

      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  return (
    <Table
      cols={columns}
      data={dataSource}
      loading={fetchedIndicatorInfoData.loading}
      url={'/sc-analytic-indicators/api/indexes'}
      setFetchedData={setFetchedIndicatorInfoData}
      url2={`/sc-analytic-indicators/api/indicators/${modalIndicator.id}/indexes`}
      save={save}
      edit={edit}
    />
  )
}
