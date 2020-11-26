import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
  fecthOrganizations,
  fetchCategories,
  fecthRegions,
  fetchRoadMap,
} from '../../../../features/roadmap/roadmapSlice'

import { WorkListModal as Modal } from './WorkListModal'
import { WorkListTable as Table } from './WorkListTable'

export const WorkList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fecthOrganizations())
    dispatch(fecthRegions())
    dispatch(fetchCategories())
    dispatch(fetchRoadMap())
  }, [])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
