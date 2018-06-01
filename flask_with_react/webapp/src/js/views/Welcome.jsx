
import React from 'react'
import {Link} from 'react-router-dom'


export const Welcome = () => {
    return <div className='container'>
        <div className='row'>
            <div className='col'>
                <p className='lead'>Welcome page. Not-Authenticated.</p>
                <p className='lead'>
                    <Link className='no-hover-decoration' to='/login'>Login...</Link>
                </p>
            </div>
        </div>
    </div>
}
