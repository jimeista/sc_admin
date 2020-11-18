import React from 'react'

import { CustomTabs as Tabs } from '../common'

import { WorkList } from './WorkList/index'
import { CrossList } from './CrossList/index'

export const RoadMap = () => {
  return <Tabs tabs={tabs} />
}

const tabs = [
  {
    title: 'Список работ',
    child: <WorkList />,
  },
  {
    title: 'Список пересечений',
    child: <CrossList />,
  },
]
