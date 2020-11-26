import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchIntersections } from '../../../../features/roadmap/roadmapSlice'

import { CrossListModal as Modal } from './CrossListModal'
import { CrossListTable as Table } from './CrossListTable'

export const CrossList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIntersections())
  }, [])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
