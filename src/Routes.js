import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'

//components
// import { InfoPanel, Leaders } from './modules/CIP'
import { SignIn } from './components/SignIn'
import Users from './modules/Users'
import Roles from './modules/Roles'

export const Routes = ({ auth }) => {
  return (
    <Switch>
      <Redirect exact from='/' to='/signin' />
      <ProtectedRoute exact path='/Роли' render={Roles} />
      <ProtectedRoute exact path='/Пользователи' render={Users} />
      {/* <Route path='/Руководители' component={Leaders} /> */}
      {/* <Route path='/Инфопанели' component={InfoPanel} /> */}

      <Route exact path='/signin' component={SignIn} />
      <Route exact path='*' render={() => <div>Page not found</div>} />
    </Switch>
  )
}
