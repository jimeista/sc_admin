import React, { useEffect } from 'react'
import { Routes } from './Routes'
import { useDispatch, useSelector } from 'react-redux'

import { getRoles, getModules } from './features/roles/rolesSlice'
import {
  getCurrentUser,
  getOrganisationList,
} from './features/admin/adminSlice'

//styles
import 'antd/dist/antd.css'
import './App.css'

function App() {
  const { auth } = useSelector((state) => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
    dispatch(getOrganisationList())
  }, [])

  useEffect(() => {
    //TASK:request all available roles and modules for form options
    if (auth.status === 'success') {
      dispatch(getRoles(auth.data))
      dispatch(getModules())
    }
  }, [auth])

  return <Routes />
}

export default App
