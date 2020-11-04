import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Home } from './Home'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { auth } = useSelector((state) => state.admin)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (Object.keys(auth.data).length > 0) {
          return (
            <Home>
              <Component />
            </Home>
          )
        } else {
          return (
            <Redirect
              to={{ pathname: '/авторизация', state: { from: props.location } }}
            />
          )
        }
      }}
    />
  )
}
