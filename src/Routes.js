import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'

//components
// import { InfoPanel, Leaders } from './modules/CIP'
import { SignIn } from './components/SignIn'
import Users from './modules/Users'
import Roles from './modules/Roles'

export const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/Роли' />

      {/* <Route path='/Руководители' component={Leaders} /> */}
      {/* <Route path='/Инфопанели' component={InfoPanel} /> */}
      <ProtectedRoute exact path='/Роли' component={Roles} />
      <ProtectedRoute exact path='/Пользователи' component={Users} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='*' render={() => <div>Page not found</div>} />
    </Switch>
  )
}
