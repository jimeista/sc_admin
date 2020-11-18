import React from 'react'
import { withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import roadmapReducer from './features/roadmap/roadmapSlice'
import { RoadMap } from './components/RoadMap'

import './index.css'
import 'antd/dist/antd.css'

const store = configureStore({
  reducer: {
    roadmap: roadmapReducer,
  },
})

const Roadmap = () => (
  <Provider store={store}>
    <RoadMap />
  </Provider>
)

export default withRouter(Roadmap)
