import {Service} from './modules/Service'
import {Settings} from './Settings'


export class LoginService extends Service {
    constructor() {
        super({
            name: 'login',
            verb: 'POST'
        })
    }

    login(username, password) {
        return this.call({jwt: Settings.getJWT(), body: {username: username, password: password}})
    }
}
