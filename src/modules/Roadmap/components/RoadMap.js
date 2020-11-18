import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  fecthOrganizations,
  fecthRegions,
  fetchCategories,
  fetchRoadMap,
  fetchIntersections,
} from '../features/roadmap/roadmapSlice'

import { CustomTabs as Tabs } from '../common'

import { WorkList } from './WorkList/index'
import { CrossList } from './CrossList/index'

export const RoadMap = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fecthOrganizations())
    dispatch(fecthRegions())
    dispatch(fetchCategories())
    dispatch(fetchIntersections())
    dispatch(fetchRoadMap())
  }, [])

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
