
import React from 'react'
import {Redirect} from 'react-router-dom'


const isAuthenticated = () => {
    return false
}


export const Index = () => {
    if (isAuthenticated()) {
        return <Redirect to='/home'/>
    }
    return <Redirect to='/welcome'/>
}


export const Login = () => {
    if (isAuthenticated()) {
        return <Redirect to='/'/>
    }
    // login user
    return <p className='lead'>Login Form</p>
}


export const Logout = () => {
    if (isAuthenticated()) {
        // logout user
    }
    return <Redirect to='/'/>
}
