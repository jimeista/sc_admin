import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

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

  useEffect(() => {
    dispatch(getRoadmapOrganisations())
    dispatch(getRoadmapRegions())
    dispatch(getRoadmapCategories())
    dispatch(getRoadmap())
  }, [])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
