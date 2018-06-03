
import React from 'react'
import {Redirect} from 'react-router-dom'
import {Settings, JWT_KEY, USER_KEY} from '../Settings'
import {withService, Service} from '../modules/Service'
import {LoginService} from '../Services'


class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {status, service, data} = this.props

        const getMessage = (m) => {
            return <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <p className='lead'>{m}</p>
                    </div>
                </div>
            </div>
        }

        if (status === Service.LOADING) {
            return getMessage('Authenticating...')
        }
        if (status === Service.FAILED) {
            return getMessage('Failed to authenticate.')
        }

        if (status === Service.DONE) {
            // save JWT & User
            console.log(JSON.stringify(data)) // eslint-disable-line no-console
            return <Redirect to='/home'/>
        }

        return <div className='container'>
            <div className='row'>
                <div className='col'>
                    <button onClick={() => service.login('admin', 'passwd')}>Login</button>
                </div>
            </div>
        </div>
    }
}


export const LoginWithService = withService(LoginComponent, LoginService)

export const Login = () => {
    return <LoginWithService/>
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
