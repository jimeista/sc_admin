import React, { useEffect } from 'react'
import { Routes } from './Routes'
import { useDispatch, useSelector } from 'react-redux'

import { getRoles, getModules } from './features/roles/rolesSlice'
import { getOrganisationList } from './features/admin/adminSlice'

//styles
import 'antd/dist/antd.css'
import './App.css'

function App() {
  const { auth } = useSelector((state) => state.admin)
  const { roles, modules } = useSelector((state) => state.roles)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrganisationList())
  }, [])

  useEffect(() => {
    //TASK:request all available roles and modules for form options
    if (auth.status === 'success') {
      roles.data.length === 0 && dispatch(getRoles(auth.data))
      modules.data.length === 0 && dispatch(getModules())
    }
  }, [auth, roles, modules])

  return <Routes />
}

export default App
