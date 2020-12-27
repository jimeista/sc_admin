import React from 'react'

import { CustomTabs as Tabs } from '../common'
import { WorkList } from './WorkList/index'
import { CrossList } from './CrossList/index'

//главная страница компонента ремонт дорог
//отрисовка переключении по табам
export const RoadMap = () => {
  return <Tabs tabs={tabs} />
}

const tabs = [
  {
    title: 'Список работ',
    child: <WorkList />, //дорожные работы
  },
  {
    title: 'Список пересечений',
    child: <CrossList />, //пересечение улиц
  },
]
