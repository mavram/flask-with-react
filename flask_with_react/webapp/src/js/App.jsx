
import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {SettingsComponent} from './containers/SettingsComponent'
import {Index, Login, Logout} from './views/Index'
import {Home} from './views/Home'
import {Welcome} from './views/Welcome'


export const App = () => {
    return <BrowserRouter>
        <SettingsComponent>
            <Switch>
                <Route exact path='/' render={Index}/>
                <Route exact path='/home' render={Home}/>
                <Route exact path='/welcome' render={Welcome}/>
                <Route exact path='/login' render={Login}/>
                <Route exact path='/logout' render={Logout}/>
            </Switch>
        </SettingsComponent>
    </BrowserRouter>
}
