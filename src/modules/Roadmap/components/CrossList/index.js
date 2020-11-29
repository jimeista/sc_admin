import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getIntersections } from '../../../../features/roadmap/roadmapSlice'

import { CrossListModal as Modal } from './CrossListModal'
import { CrossListTable as Table } from './CrossListTable'

export const CrossList = () => {
  const dispatch = useDispatch()
  const { intersections } = useSelector((state) => state.roadmap)

  useEffect(() => {
    intersections.data.length === 0 && dispatch(getIntersections())
  }, [intersections])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
