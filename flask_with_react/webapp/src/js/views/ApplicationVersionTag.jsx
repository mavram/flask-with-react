
import React from 'react'
import {withService, Service} from '../modules/Service'
import {ApplicationService} from '../Services'


const ApplicationVersionTagView = ({service, status, data}) => {
    if (status === Service.INITIALIZING) {
        return <p className='lead' onClick = {() => service.get()}> Not loaded. Click to load </p>
    } else if (status === Service.FAILED) {
        return <p className='lead'>Failed to load application version. {data.message}</p>
    } else if (status === Service.LOADING) {
        return <p className='lead'>Loading application version...</p>
    }
    return <p className='lead'>{data.version}</p>
}


export const ApplicationVersionTag = withService(ApplicationVersionTagView, ApplicationService)
