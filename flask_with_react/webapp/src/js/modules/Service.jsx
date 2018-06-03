
import React from 'react'


export class Service {
    constructor(options) {
        this.options = options
        this.handlers = []
        this.onSuccess = this.onSuccess.bind(this)
        this.onError = this.onError.bind(this)
    }

    getDefaultData() {
        return this.options.defaultData
    }

    addHandler(h) {
        this.handlers.push(h)
    }

    removeHandler(h) {
        this.handlers = this.handlers.filter((o) => o!== h)
    }

    onSuccess(data) {
        this.handlers.forEach((h) => h(Service.DONE, data))
    }

    onError() {
        this.handlers.forEach((h) => h(Service.FAILED, this.options.defaultData))
    }

    call(params) {
        const getHeaders = () => {
            let h = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if (params.jwt) {
                h['Authorization'] = 'JWT ' + params.jwt
            }
            return h
        }

        let uri = this.options.endpoint
        if (!uri) {
            uri = window.location.origin + '/api'
        }
        if (this.options.version) {
            uri = uri + '/' + this.options.version
        }
        uri = uri + '/' + this.options.name
        if (params.uri) {
            uri = uri + '/' + params.uri
        }

        let fetchOptions = {
            headers: getHeaders(),
            method: this.options.verb ? this.options.verb : 'GET'
        }
        if (this.options.verb === 'POST') {
            if (params.body) {
                fetchOptions.body = JSON.stringify(params.body)
            }
        }

        this.handlers.forEach((h) => h(Service.LOADING, this.options.defaultData))

        fetch(uri, fetchOptions).then(
            (r) => {
                if (r.ok) {
                    return r
                }
                throw new Error(r.status + ':' + r.statusText)
            }
        ).then(
            (r) => r.json()
        ).then(
            this.onSuccess
        ).catch(
            this.onError
        )
    }
}
Service.INITIALIZING = 'initializing'
Service.LOADING = 'loading'
Service.DONE = 'done'
Service.FAILED = 'error'


export const withService = (WrappedComponent, Service) => {
    class WithService extends React.Component {
        constructor(props) {
            super(props)
            this.service = new Service()
            this.state = {
                status: Service.INITIALIZING,
                data: this.service.defaultData
            }
            this.onServiceMethod = this.onServiceMethod.bind(this)
        }

        onServiceMethod(status, data) {
            this.setState({
                status: status,
                data: data
            })
        }

        componentDidMount() {
            this.service.addHandler(this.onServiceMethod)
        }

        componentWillUnmount() {
            this.service.removeHandler(this.onServiceMethod)
        }

        render() {
            return <WrappedComponent
                service={this.service}
                status={this.state.status}
                data={this.state.data}
                {...this.props}
                />
        }
    }

    const getDisplayName = () => {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component'
    }
    WithService.displayName = `WithService(${getDisplayName()})`

    return WithService
}
