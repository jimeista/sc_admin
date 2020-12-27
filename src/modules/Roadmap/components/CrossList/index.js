import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getIntersections } from '../../../../features/roadmap/roadmapSlice'

import { CrossListModal as Modal } from './CrossListModal'
import { CrossListTable as Table } from './CrossListTable'

//главная страница таба по пересечению дорог
export const CrossList = () => {
  const dispatch = useDispatch()
  const { intersections } = useSelector((state) => state.roadmap)

  useEffect(() => {
    //делаем get запрос на пересечении улиц
    intersections.data.length === 0 && dispatch(getIntersections())
  }, [intersections])

  return (
    <>
      <Modal />
      <Table />
    </>
  )
}
