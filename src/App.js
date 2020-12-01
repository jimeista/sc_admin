import React, { useEffect } from 'react'
import Routes from './Routes'
import { useDispatch, useSelector } from 'react-redux'

import { getRoles, getModules } from './features/roles/rolesSlice'
import {
  setAuth,
  getOrganisationList,
  getAuthorities,
} from './features/admin/adminSlice'

//styles
import 'antd/dist/antd.css'
import './App.css'

function App() {
  const { auth, config } = useSelector((state) => state.admin)
  const { roles, modules } = useSelector((state) => state.roles)

  const dispatch = useDispatch()

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && auth.status === 'idle') {
      dispatch(setAuth({ auth: user.auth, config: user.config }))
    }
  }, [])

  useEffect(() => {
    if (roles.status === 'success' && auth.status === 'success') {
      let arr = auth.data.roles.map((r) =>
        r === 'SUPER-ADMIN' ? 'Супер-Администратор' : r
      )
      roles.data.forEach((role) => {
        if (arr.includes(role.repr)) {
          dispatch(getAuthorities({ config, id: role.id, repr: role.repr }))
        }
      })
    }
  }, [auth, roles, config])

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
