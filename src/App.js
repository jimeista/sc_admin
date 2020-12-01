import React, { useEffect } from 'react'
import Routes from './Routes'
import { useDispatch, useSelector } from 'react-redux'

import { getRoles, getModules } from './features/roles/rolesSlice'
import { getOrganisationList } from './features/admin/adminSlice'

//styles
import 'antd/dist/antd.css'
import './App.css'

function App() {
  const { auth, config } = useSelector((state) => state.admin)
  const { roles, modules } = useSelector((state) => state.roles)

  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.status === 'success') {
      dispatch(getOrganisationList(config))
    }
  }, [config, auth])

  useEffect(() => {
    //TASK:request all available roles and modules for form options
    if (auth.status === 'success') {
      if (roles.status === 'idle') {
        dispatch(getRoles({ auth: auth.data, config }))
      }
      if (modules.status === 'idle') {
        dispatch(getModules(config))
      }
    }
  }, [auth, roles, modules, config])

  return <Routes />
}

export default App
