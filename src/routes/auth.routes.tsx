import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'

const AuthRoute: React.FC = () => (
    <Switch>
      <Route path={`/`} component={SignIn}></Route>
    </Switch>
)

export default AuthRoute