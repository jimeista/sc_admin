import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRoleModules } from '../../features/roles/rolesSlice'

import RoleControllers from './RoleControllers'
import RoleTable from './RoleTable'

const Roles = () => {
  const dispatch = useDispatch()
  const { roles, modules, role_modules } = useSelector((state) => state.roles)
  const { config } = useSelector((state) => state.admin)

  const [options, setOptions] = useState([]) //опции доступных модулей

  useEffect(() => {
    //главная страница компоненты Роли
    //делаем get запрос списка доступных модулей по ролям при инициализации компоненты если пользователь авторизовался
    if (config && roles.status === 'success') {
      role_modules.status === 'idle' &&
        dispatch(getRoleModules({ roles: roles.data, config }))
    }
  }, [config, roles, role_modules, dispatch])

  useEffect(() => {
    //создаем состояние списка модулей
    if (modules.status === 'success') {
      let arr = modules.data.map((i) => ({ value: i.name, id: i.id }))
      setOptions(arr)
    }
  }, [modules])

  return (
    <>
      <RoleControllers options={options} />
      <RoleTable
        role_modules={role_modules}
        options={options}
        modules={modules}
      />
    </>
  )
}

export default withRouter(Roles)
