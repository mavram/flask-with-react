
import React from 'react'
import {Link} from 'react-router-dom'
import {ApplicationVersionTag} from './ApplicationVersionTag'


export const Home = () => {
    return <div className='container'>
        <div className='row'>
            <div className='col'>
                <p className='lead'>Home page. Authenticated.</p>
                <ApplicationVersionTag/>
                <p className='lead'>
                    <Link className='no-hover-decoration' to='/logout'>Click to logout.</Link>
                </p>
            </div>
        </div>
    </div>
}
