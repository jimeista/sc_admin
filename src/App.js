import React, { useState } from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import { Home } from './components/Home'
import adminReducer from './features/admin/adminSlice'

//styles
import 'antd/dist/antd.css'
import './App.css'

const store = configureStore({
  reducer: {
    admin: adminReducer,
  },
})

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <Provider store={store}>
      <Router basename='/admin'>
        <Home>
          <Routes isAuth={isAuth} />
        </Home>
      </Router>
    </Provider>
  )
}

export default App
