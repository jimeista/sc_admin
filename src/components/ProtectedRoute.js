import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import Home from './Home'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('user') ? (
          <Home>
            <Component />
          </Home>
        ) : (
          <Redirect
            to={{ pathname: '/авторизация', state: { from: props.location } }}
          />
        )
      }
    />
  )
}
