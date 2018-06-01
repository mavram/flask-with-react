
export const USER_KEY = '__user_key__'
export const JWT_KEY = '__jwt_key__'
export const VERSION_KEY = '__version_key__'

export class Settings {
    static getVersion() {
        return localStorage.getItem(VERSION_KEY)
    }

    static getJWT() {
        return localStorage.getItem(JWT_KEY)
    }

    static getUser() {
        const userData = localStorage.getItem(USER_KEY)
        return userData ? JSON.parse(userData) : {}
    }

    static isAuthenticated() {
        return this.getJWT()
    }

    static set(name, value) {
        value ? localStorage.setItem(name, value) : localStorage.removeItem(name)
    }
}
