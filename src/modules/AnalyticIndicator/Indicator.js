import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import IndicatorTable from './IndicatorTable'
import IndicatorControllers from './IndicatorControllers'

import {
  getIndicator,
  getDictionaries,
} from '../../features/indicator/indicatorSlice'

const Indicator = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getIndicator())
    dispatch(getDictionaries())
  }, [])

  return (
    <div>
      <IndicatorControllers />
      <IndicatorTable />
    </div>
  )
}

export default withRouter(Indicator)
