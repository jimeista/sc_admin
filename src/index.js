import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import adminReducer from './features/admin/adminSlice'
import roadmapReducer from './features/roadmap/roadmapSlice'
import rolesReducer from './features/roles/rolesSlice'
import usersReducer from './features/users/usersSlice'
import headsReducer from './features/heads/headsSlice'
import dictionaryReducer from './features/dictionary/dictionarySlice'
import indicatorReducer from './features/indicator/indicatorSlice'
import indicatorinfoReducer from './features/indicatorinfo/indicatorinfoSlice'

import './index.css'
import App from './App'

//база состояния данных редакс
const store = configureStore({
  reducer: {
    roadmap: roadmapReducer,
    admin: adminReducer,
    roles: rolesReducer,
    users: usersReducer,
    heads: headsReducer,
    dictionary: dictionaryReducer,
    indicator: indicatorReducer,
    indicatorinfo: indicatorinfoReducer,
  },
})

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <Router basename='/admin'>
      <App />
    </Router>
    {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
)
