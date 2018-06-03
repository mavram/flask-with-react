
import React from 'react'
import {Redirect} from 'react-router-dom'
import {Settings, JWT_KEY} from '../Settings'
import {withService, Service} from '../modules/Service'
import {LoginService} from '../Services'


const LoginView = ({status, service, data}) => {
    if (status === Service.DONE) {
        Settings.set(JWT_KEY, data)
        return <Redirect to='/home'/>
    }

    const getMessage = () => {
        if (status === Service.LOADING) {
            return 'Authenticating...'
        } else if (status === Service.FAILED) {
            return 'Failed to authenticate.'
        } else if (status === Service.INITIALIZING) {
            return 'Initializing...'
        }
        return 'N/A'
    }

    return <div className='container'>
        <div className='row'>
            <div className='col'>
                <p className='lead'>{getMessage()}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <button onClick={() => service.login('admin', 'passwd')}>Login</button>
            </div>
        </div>
    </div>
}


const LoginWithService = withService(LoginView, LoginService)


export const Login = () => {
    return <LoginWithService/>
}


export const Logout = () => {
    if (Settings.isAuthenticated()) {
        Settings.set(JWT_KEY)
    }
    return <Redirect to='/'/>
}


export const Index = () => {
    if (Settings.isAuthenticated()) {
        return <Redirect to='/home'/>
    }
    return <Redirect to='/welcome'/>
}
