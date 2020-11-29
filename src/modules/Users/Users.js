import React, { useEffect, useMemo } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getUsers } from '../../features/users/usersSlice'
import UserTable from './UserTable'
import UserControllers from './UserControllers'

const Users = () => {
  const { data, status } = useSelector((state) => state.users)
  const { roles } = useSelector((state) => state.roles)
  const { organisationList } = useSelector((state) => state.admin)

  const dispatch = useDispatch()

  useEffect(() => {
    data.length === 0 && dispatch(getUsers())
  }, [data])

  const role_options = useMemo(() => {
    if (roles.status === 'success') {
      return roles.data.map((i) => ({ value: i.repr, id: i.id }))
    }

    return []
  }, [roles])

  const organisation_options = useMemo(() => {
    if (organisationList.status === 'success') {
      return organisationList.data.map((i) => ({
        ...i,
        value: `${i.abbreviation}-${i['full-name']}`,
      }))
    }

    return []
  }, [organisationList])

  return (
    <>
      <UserControllers
        roles={role_options}
        organisations={organisation_options}
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
