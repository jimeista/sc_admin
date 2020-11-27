import React, { useState } from 'react'

import { Tag } from 'antd'
import { CustomTable as Table } from '../../common/Table'
import Modal from '../../common/Modal'

export const Leaders = () => {
  const [data, setData] = useState()
  const [lead_data, setLeadData] = useState([
    {
      key: '0',
      '№': 1,
      Аббревиатура: 'УЭиИР',
      'Курируемые организации':
        'УЭиИР-Управление энергоэффективности и инфраструктурного развития',
    },
    {
      key: '1',
      '№': 2,
      Аббревиатура: 'УЖП',
      'Курируемые организации': 'УЖП-Управление жилищной политики',
    },
    {
      key: '2',
      '№': 3,
      Аббревиатура: 'УГМ',
      'Курируемые организации': 'УГМ-Управление городской мобильности',
    },
    {
      key: '4',
      '№': 4,
      Аббревиатура: 'УЗЭ',
      'Курируемые организации': 'УЗЭ-Управление зелёной экономики',
    },
  ])

  return (
    <div className='Leaders_style'>
      <Modal
        btntext='Редактировать курируемые организации'
        btnstyle={{ marginBottom: 15 }}
        title='Курируемые организации'
      >
        <Table columns={cols} data={lead_data} setData={setLeadData} />
      </Modal>
      <Table columns={columns} data={data} setData={setData} />
    </div>
  )
}

const options = [
  {
    label: 'УЭиИР-Управление энергоэффективности и инфраструктурного развития',
    value: 'УЭиИР',
  },
  { label: 'УЖП-Управление жилищной политики', value: 'УЖП' },
  { label: 'УГМ-Управление городской мобильности', value: 'УГМ' },
  { label: 'УЗЭ-Управление зелёной экономики', value: 'УЗЭ' },
  { label: 'УТ-Управление туризмая', value: 'УТ' },
  {
    label: 'УГПиУ-Управление городского планирования и урбанистики',
    value: 'УГПиУ',
  },
  { label: 'УКГС-Управление комфортной городской среды', value: 'УКГС' },
  { label: 'УЗО-Управление земельных отношений', value: 'УЗО' },
  { label: 'УГК-Управление градостроительного контроля', value: 'УГК' },
  { label: 'УПиИ-Управление предпринимательства и инвестиций', value: 'УПиИ' },
  { label: 'УСБ-Управление социального благосостояния', value: 'УСБ' },
  { label: 'УОР-Управление общественного развития', value: 'УОР' },
  { label: 'УО-Управление образования', value: 'УO' },
  { label: 'УК-Управление культуры', value: 'УK' },
  { label: 'УС-Управление спорта', value: 'УC' },
  { label: 'УОЗ-Управление общественного здоровья', value: 'УОЗ' },
  { label: 'УСиБ-Управление стратегии и бюджета', value: 'УСиБ' },
  { label: 'УГА-Управление государственных активов', value: 'УГА' },
]

const columns = [
  {
    title: '№',
    dataIndex: '№',
    width: '5%',
  },

  {
    title: 'Должность',
    dataIndex: 'Должность',
    width: '25%',
  },
  {
    title: 'ФИО',
    dataIndex: 'ФИО',
    width: '30%',
    editable: true,
  },
  {
    title: 'Курируемые организации',
    dataIndex: 'Курируемые организации',
    width: '35%',
    type: 'multi-select',
    editable: true,
    data: options,
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag} style={{ margin: '5px 5px' }}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
  {
    title: 'Фото',
    dataIndex: 'Фото',
    width: '10%',
    editable: true,
  },
]

const cols = [
  {
    title: '№',
    dataIndex: '№',
    width: '5%',
  },
  {
    title: 'Аббревиатура',
    dataIndex: 'Аббревиатура',
    width: '20%',
    editable: true,
  },
  {
    title: 'Курируемые организации',
    dataIndex: 'Курируемые организации',
    width: '50%',
    editable: true,
  },
]
