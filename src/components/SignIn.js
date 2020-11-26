import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const SignIn = (props) => {
  const { auth } = useSelector((state) => state.admin)

  if (auth.data && auth.data.username) {
    return (
      <Route
        render={() => (
          <Redirect
            exact
            // to={props.history.location.state.pathname}
            to={'/Карта ремонтных работ'}
            from='/авторизация'
          />
        )}
      />
    )
  }

  return ''
}
