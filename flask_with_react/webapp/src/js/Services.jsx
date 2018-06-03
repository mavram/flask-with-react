import {Service} from './modules/Service'
import {Settings} from './Settings'


export class LoginService extends Service {
    constructor() {
        super({
            name: 'login',
            verb: 'POST'
        })
    }

    login(username, passwd) {
        return this.call({jwt: Settings.getJWT(), body: {username: username, password: passwd}})
    }
}


export class ApplicationService extends Service {
    constructor() {
        super({
            name: 'application'
        })
    }

    get() {
        return this.call({jwt: Settings.getJWT()})
    }
}
