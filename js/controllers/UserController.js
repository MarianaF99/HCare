import UserModel from '../models/UserModel.js'

export default class UserController {

    constructor() {
        this.userModel = new UserModel()
    }

    GetUserLoggedData() {
        let user = this.userModel.GetUserLoggedData()
        return user
    }

    UpdateUser(firstName, surname, address, phone, password, changePasswordState = false) {
        let userLoggedEmail = this.userModel.GetUserLoggedEmail()

        if (changePasswordState === true) {
            if (this.userModel.GetAllUsers().some(user => user.email === userLoggedEmail && password === user.password)) {
                throw Error(`The new password is the same as the actual.`)
            }
        }

        this.userModel.UpdateUser(userLoggedEmail, firstName, surname, address, phone, password, changePasswordState)
    }

    GetAllUsers() {
        return this.userModel.GetAllUsers()
    }

    BlockUnlockUser(email) {
        return this.userModel.BlockUnlockUser(email)
    }

    DeleteUser(email) {
        this.userModel.DeleteUser(email)
    }


    GetUserLoggedEmail() {
        return this.userModel.GetUserLoggedEmail()
    }

    Logout() {
        this.userModel.Logout()
        window.location.replace("index.html")
    }

    IsUserLogged() {
        return this.userModel.IsUserLogged()
    }

    Login(email, password) {
        if (this.userModel.GetAllUsers().some(user => user.email === email)) {
            if (this.userModel.GetAllUsers().some(user => user.email === email && user.password === password)) {
                if (this.userModel.GetAllUsers().some(user => user.email === email && user.password === password && user.blockState === true)) {
                    throw Error(`The user is blocked by the admin.`)
                } else {
                    this.userModel.Login(email)
                    window.location.replace("index.html")
                }
            } else {
                throw Error(`The passord specified is wrong.`)
            }
        } else {
            throw Error(`This email "${email}" is not registered.`)
        }
    }

    CreateUser(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage) {
        if (!this.userModel.GetAllUsers().some(user => user.email === email)) {
            this.userModel.CreateUser(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage)
        } else {
            throw Error(`The email "${email}" specified is already in use by somebody else.`)
        }
    }
}