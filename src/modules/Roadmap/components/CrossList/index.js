import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getIntersections } from '../../../../features/roadmap/roadmapSlice'

import { CrossListModal as Modal } from './CrossListModal'
import { CrossListTable as Table } from './CrossListTable'

export const CrossList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIntersections())
  }, [])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
