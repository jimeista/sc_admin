import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import { getCurrentUser } from '../features/admin/adminSlice'

export const SignIn = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  if (auth.data && auth.data.username) {
    return (
      <Route render={() => <Redirect exact to='/Роли' from='/авторизация' />} />
    )
  }

  return ''
}
