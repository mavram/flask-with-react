
import React from 'react'
import {Redirect} from 'react-router-dom'
import {Settings, JWT_KEY, USER_KEY} from '../Settings'


const LoginView = ({isLoading, failedToLoad, data}) => {
    const getMessage = (m) => {
        return <div className='container'>
            <div className='row'>
                <div className='col'>
                    <p className='lead'>{m}</p>
                </div>
            </div>
        </div>
    }
    if (isLoading) {
        return getMessage('Authenticating...')
    }
    if (failedToLoad) {
        return getMessage('Failed to authenticate.')
    }
    console.log(JSON.stringify(data)) // eslint-disable-line no-console
    return <Redirect to='/home'/>
}

// hard-coded for now
import {withService} from '../modules/Service'
const LoginViewWithService = withService(LoginView, {
    name: 'login',
    jwt: Settings.getJWT(),
    verb: 'POST',
    body: {
        username: 'test',
        passwd: 'test'
    }
})

export const Login = () => {
    return <LoginViewWithService/>
}


export const Logout = () => {
    if (Settings.isAuthenticated()) {
        Settings.set(JWT_KEY)
        Settings.set(USER_KEY)
    }
    return <Redirect to='/'/>
}


export const Index = () => {
    if (Settings.isAuthenticated()) {
        return <Redirect to='/home'/>
    }
    return <Redirect to='/welcome'/>
}
