import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'

//components
// import { InfoPanel, Leaders } from './modules/CIP'
import { SignInForm } from './components/form/SignInForm'
import Users from './modules/Users/Users'
import Roles from './modules/Roles/Roles'
import Roadmap from './modules/Roadmap'
import Heads from './modules/Heads/Heads'
import AnalyticIndicator from './modules/AnalyticIndicator/Indicator'
import IndicatorInfo from './modules/IndicatorInfo/IndicatorInfo'

// import { Dictionary, Indicator, IndicatorInfo } from './modules/CMD'

import Home from './components/Home'

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from='/' to='/Роли' />
      <ProtectedRoute exact path='/Роли' component={Roles} />
      <ProtectedRoute exact path='/Пользователи' component={Users} />
      <ProtectedRoute exact path='/Ремонт дорог' component={Roadmap} />
      <ProtectedRoute exact path='/Руководители' component={Heads} />
      <ProtectedRoute exact path='/indicator' component={AnalyticIndicator} />
      <ProtectedRoute exact path='/indicatorinfo' component={IndicatorInfo} />

      {/* <Route
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
      /> */}
      <Route exact path='/авторизация' component={SignInForm} />
    </Switch>
  )
}

export default React.memo(Routes)
