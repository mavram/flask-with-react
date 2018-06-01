
import React from 'react'


export class Service {
    constructor(endpoint, jwt, version) {
        this.endpoint = endpoint
        this.jwt = jwt
        this.version = version
    }

    invoke(httpMethod, serviceMethod, onSucces, onError) {
        const getHeaders = () => {
            let h = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if (this.jwt) {
                h['Authorization'] = 'JWT ' + this.jwt
            }
            return h
        }

        let uri = this.endpoint + '/api'
        if (this.version) {
            uri = uri + '/v' + this.version
        }
        uri = uri + '/' + serviceMethod

        let options = {
            headers: getHeaders(),
            method: httpMethod.verb
        }
        if (httpMethod.verb === 'POST') {
            options.body = httpMethod.body
        }

        fetch(uri, options).then((r) => {
            if (r.ok) {
                return r
            }
            throw new Error(r.status + ':' + r.statusText)
        }).then((r) => r.json()).then(onSucces).catch(onError)
    }

    get(serviceMethod, onSucces, onError) {
        return this.invoke({verb: 'GET'}, serviceMethod, onSucces, onError)
    }

    post(serviceMethod, data, onSucces, onError) {
        return this.invoke({verb: 'POST', body: data}, serviceMethod, onSucces, onError)
    }
}


export const withService = (WrappedComponent, httpVerb, serviceMethod, defaultData) => {
    class WithService extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                status: WithService.INITIALIZED,
                data: defaultData
            }
        }

        componentDidMount() {
        }

        render() {
            return <wrappedComponent status={this.status} data={this.data} {...this.props}/>
        }
    }

    const getDisplayName = () => {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component'
    }
    WithService.displayName = `WithService(${serviceMethod})(${getDisplayName()})`

    WithService.INITIALIZED = 'initialized'
    WithService.LOADING = 'loading'
    WithService.FAILED = 'failed'
    WithService.DONE = 'done'

    return WithService
}
