import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRoles,
  getModules,
  getRoleModules,
  resetModules,
  resetRoleModules,
  resetRoles,
} from '../../features/roles/rolesSlice'

import RoleControllers from './RoleControllers'
import RoleTable from './RoleTable'

//main ROLES module
const Roles = () => {
  const dispatch = useDispatch()
  const { roles, modules, role_modules } = useSelector((state) => state.roles)
  const { auth } = useSelector((state) => state.admin)

  const [options, setOptions] = useState([])

  useEffect(() => {
    //TASK:request all available roles and modules for form options
    dispatch(getRoles(auth.data))
    dispatch(getModules())

    return () => {
      dispatch(resetRoles())
      dispatch(resetModules())
      dispatch(resetRoleModules())
    }
  }, [])

  useEffect(() => {
    //TASK: request all available role's modules
    roles.status === 'success' && dispatch(getRoleModules(roles.data))

    return () => dispatch(resetRoleModules())
  }, [roles])

  useEffect(() => {
    //TASK: if modules are rdy, set options state
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
