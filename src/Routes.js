import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'

//components
// import { InfoPanel, Leaders } from './modules/CIP'
import { SignIn } from './components/SignIn'
import Users from './modules/Users/Users'
import Roles from './modules/Roles/Roles'
import Roadmap from './modules/Roadmap'
import Heads from './modules/Heads/Heads'
import { Dictionary, Indicator, IndicatorInfo } from './modules/CMD'

import { Home } from './components/Home'

export const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/Роли' />
      <ProtectedRoute exact path='/Роли' component={Roles} />
      <ProtectedRoute exact path='/Пользователи' component={Users} />
      <ProtectedRoute exact path='/Карта ремонтных работ' component={Roadmap} />
      <ProtectedRoute exact path='/Руководители' component={Heads} />
      <Route
        path='/Справочники'
        component={() => (
          <Home>
            <Dictionary />
          </Home>
        )}
      />
      <Route
        path='/Аналитические индикаторы'
        component={() => (
          <Home>
            <Indicator />
          </Home>
        )}
      />
      <Route
        path='/Показатели индикаторов'
        component={() => (
          <Home>
            <IndicatorInfo />
          </Home>
        )}
      />
      {/* <Route
        path='/Инфопанели'
        component={() => (
          <Home>
            <InfoPanel />
          </Home>
        )}
      /> */}
      <Route exact path='/авторизация' component={SignIn} />
      <Route exact path='*' render={() => <Redirect to='/Роли' />} />
    </Switch>
  )
}
