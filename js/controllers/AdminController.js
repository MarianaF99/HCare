import AdminModel from '../models/AdminModel.js'

export default class AdminController {

    constructor() {
        this.adminModel = new AdminModel()
    }

    IsAdminLogged() {
        return this.adminModel.IsAdminLogged()
    }

    AdminLogin(email, password) {
        if (email === "admin@hcare.com") {
            if (password === "admin") {
                this.adminModel.AdminLogin(email)
                window.location.replace("admin.html")
            } else {
                throw Error(`The passord specified is wrong.`)
            }
        } else {
            throw Error(`This admin email "${email}" is incorrect.`)
        }
    }
}