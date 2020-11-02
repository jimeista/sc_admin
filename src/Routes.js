import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'

//components
import { InfoPanel, Leaders } from './modules/CIP'
import Users from './modules/Users'
import Roles from './modules/Roles'

export const Routes = ({ isAuth }) => {
  return (
    <Switch>
      <ProtectedRoute path='/Роли' component={Roles} isAuth={isAuth} />
      <Route path='/Пользователи' component={Users} />
      {/* <Route path='/Руководители' component={Leaders} /> */}
      {/* <Route path='/Инфопанели' component={InfoPanel} /> */}
      <Route path='*' render={() => <div>Page not found</div>} />
    </Switch>
  )
}
