import React, { useEffect } from 'react'
import Routes from './Routes'
import { useDispatch, useSelector } from 'react-redux'

import { getRoles, getModules } from './features/roles/rolesSlice'
import {
  setAuth,
  getOrganisationList,
  getAuthorities,
} from './features/admin/adminSlice'

import 'antd/dist/antd.css'
import './App.css'

function App() {
  const { auth, config } = useSelector((state) => state.admin)
  const { roles, modules } = useSelector((state) => state.roles)

  const dispatch = useDispatch()

  //проверка уже авторизованного пользователя
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && auth.status === 'idle') {
      dispatch(setAuth({ auth: user.auth, config: user.config }))
    }
  }, [auth, dispatch])

  //get запрос ролей
  useEffect(() => {
    if (roles.status === 'success' && auth.status === 'success') {
      roles.data.forEach((role) => {
        if (auth.data.roles.includes(role.repr)) {
          dispatch(getAuthorities({ config, id: role.id, repr: role.repr }))
        }
      })
      // dispatch(getAuthorities({config, roles:roles.data}))
    }
  }, [auth, roles, config, dispatch])

  //get запрос организации
  useEffect(() => {
    if (auth.status === 'success') {
      dispatch(getOrganisationList(config))
    }
  }, [config, auth, dispatch])

  // get запрос доступных ролей и модулей авторизованного пользователя
  useEffect(() => {
    if (auth.status === 'success') {
      if (roles.status === 'idle') {
        dispatch(getRoles({ auth: auth.data, config }))
      }
      if (modules.status === 'idle') {
        dispatch(getModules(config))
      }
    }
  }, [auth, roles, modules, config, dispatch])

  return <Routes />
}

export default App
