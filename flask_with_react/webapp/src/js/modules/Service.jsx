
import React from 'react'


export class Service {
    constructor(endpoint) {
        this.endpoint = endpoint ? endpoint : window.location.origin + '/api'
        this.handlers = []
    }

    addHandler(h) {
        this.handlers.push(h)
    }

    removeHandler(h) {
        this.handlers = this.handlers.filter((o) => o!== h)
    }

    onSuccess(data) {
        this.handlers.forEach((h) => h(false, false, data))
    }

    onError(defaultData) {
        this.handlers.forEach((h) => h(false, true, defaultData))
    }

    invoke(options) {
        const getHeaders = () => {
            let h = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            if (options.jwt) {
                h['Authorization'] = 'JWT ' + options.jwt
            }
            return h
        }

        let uri = this.endpoint
        if (options.version) {
            uri = uri + '/' + options.version
        }
        uri = uri + '/' + options.name

        let fetchOptions = {
            headers: getHeaders(),
            method: options.verb
        }
        if (options.verb === 'POST') {
            fetchOptions.body = JSON.stringify(options.body)
        }

        this.handlers.forEach((h) => h(true, false, options.defaultData))

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
            this.onSucces
        ).catch(
            () => this.onError(options.defaultData)
        )
    }
}


export const withService = (WrappedComponent, options) => {
    class WithService extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                isLoading: false,
                failedToLoad: false,
                data: options.defaultData
            }
            this.service = new Service()
            this.onServiceMethod = this.onServiceMethod.bind(this)
        }

        onServiceMethod(isLoading, failedToLoad, data) {
            this.setState({
                isLoading: isLoading,
                failedToLoad: failedToLoad,
                data: data
            })
        }

        componentDidMount() {
            this.service.addHandler(this.onServiceMethod)
            this.service.invoke(options)
        }

        componentWillUnmount() {
            this.service.removeHandler(this.onServiceMethod)
        }

        render() {
            return <WrappedComponent
                isLoading={this.state.isLoading}
                failedToLoad={this.state.failedToLoad}
                data={this.state.data}
                {...this.props}
                />
        }
    }

    const getDisplayName = () => {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component'
    }
    const getMethodName = () => {
        return `${options.version}:${options.name}`
    }
    WithService.displayName = `WithService(${getMethodName()})(${getDisplayName()})`
    return WithService
}
