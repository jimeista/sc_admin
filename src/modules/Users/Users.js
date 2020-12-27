import React, { useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getUsers } from '../../features/users/usersSlice'

import UserTable from './UserTable'
import UserControllers from './UserControllers'

const Users = () => {
  const { data, status } = useSelector((state) => state.users)
  const { roles, modules } = useSelector((state) => state.roles)
  const { organisationList, config } = useSelector((state) => state.admin)

  const dispatch = useDispatch()

  useEffect(() => {
    //главная страница компоненты Пользователи
    //делаем get запрос списка пользователей при инициализации компоненты если он авторизовался
    config && data.length === 0 && dispatch(getUsers(config))
  }, [data, config, dispatch])

  //подготовка селекта списка ролей
  const role_options = useMemo(() => {
    if (roles.status === 'success') {
      return roles.data.map((i) => ({ value: i.repr, id: i.id }))
    }

    return []
  }, [roles])

  //подготовка селекта списка организации
  const organisation_options = useMemo(() => {
    if (organisationList.status === 'success') {
      return organisationList.data.map((i) => ({
        ...i,
        value: `${i['full-name']} - ${i.abbreviation}`,
      }))
    }

    return []
  }, [organisationList])

  //подготовка селекта списка модулей
  const modules_options = useMemo(() => {
    if (modules.status === 'success') {
      return modules.data.map((i) => ({
        ...i,
        value: i.name,
      }))
    }
  }, [modules])

  return (
    <>
      <UserControllers
        roles={role_options}
        organisations={organisation_options}
        modules={modules_options}
      />
      <UserTable
        data={data}
        status={status}
        roles={role_options}
        organisations={organisation_options}
      />
    </>
  )
}

export default withRouter(Users)
