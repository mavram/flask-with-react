
import React from 'react'
import {Link} from 'react-router-dom'
import {ApplicationVersionTag} from './ApplicationVersionTag'


export const Welcome = () => {
    return <div className='container'>
        <div className='row'>
            <div className='col'>
                <p className='lead'>Welcome page. Not-Authenticated.</p>
                <ApplicationVersionTag/>
                <p className='lead'>
                    <Link className='no-hover-decoration' to='/login'>Click to login.</Link>
                </p>
            </div>
        </div>
    </div>
}
