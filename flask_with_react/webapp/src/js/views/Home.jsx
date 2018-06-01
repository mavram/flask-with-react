
import React from 'react'
import {Link} from 'react-router-dom'


export const Home = () => {
    return <div className='container'>
        <div className='row'>
            <div className='col'>
                <p className='lead'>Home page. Authenticated.</p>
                <p className='lead'>
                    <Link className='no-hover-decoration' to='/logout'>Logout...</Link>
                </p>
            </div>
        </div>
    </div>
}
