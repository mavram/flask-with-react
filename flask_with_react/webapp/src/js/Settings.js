
export const JWT_KEY = '__jwt_key__'

export class Settings {
    static getJWT() {
        return localStorage.getItem(JWT_KEY)
    }

    static isAuthenticated() {
        return this.getJWT()
    }

    static set(name, value) {
        value ? localStorage.setItem(name, value) : localStorage.removeItem(name)
    }
}
