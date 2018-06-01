
import React from 'react'
import {Redirect} from 'react-router-dom'
import {Settings, JWT_KEY, USER_KEY} from '../Settings'


export const Login = () => {
    if (Settings.isAuthenticated()) {
        return <Redirect to='/'/>
    }
    return <div className='container'>
        <div className='row'>
            <div className='col'>
                <p className='lead'>Login form.</p>
            </div>
        </div>
    </div>
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
