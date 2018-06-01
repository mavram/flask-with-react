import {Settings} from './Settings'


export class Service {
    constructor(endpoint, version) {
        this.endpoint = endpoint
        this.version = version
    }

    invoke(httpMethod, serviceMethod, onSucces, onError) {
        const getHeaders = () => {
            let h = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const jwt = Settings.getJWT()
            if (jwt) {
                h['Authorization'] = 'JWT ' + jwt
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
