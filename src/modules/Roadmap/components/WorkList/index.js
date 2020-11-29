import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getRoadmapOrganisations,
  getRoadmapCategories,
  getRoadmapRegions,
  getRoadmap,
} from '../../../../features/roadmap/roadmapSlice'

import { WorkListModal as Modal } from './WorkListModal'
import { WorkListTable as Table } from './WorkListTable'

export const WorkList = () => {
  const dispatch = useDispatch()
  const { organisations, categories, regions, data } = useSelector(
    (state) => state.roadmap
  )

  useEffect(() => {
    organisations.data.length === 0 && dispatch(getRoadmapOrganisations())
    regions.data.length === 0 && dispatch(getRoadmapRegions())
    categories.data.length === 0 && dispatch(getRoadmapCategories())
    data.length === 0 && dispatch(getRoadmap())
  }, [organisations, regions, categories, data])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
