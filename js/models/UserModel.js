import User from '../models/User.js'

export default class LoginModel {
    constructor() {
        this.users = this.GetAllUsersFromLocalStorage()
    }

    Logout() {
        sessionStorage.removeItem("loggedUser");
    }

    Login(email) {
        /* Store the session to know that user is logged in */
        sessionStorage.setItem("loggedUser", email);
        /* Remove the session for the admin as pre-caution */
        sessionStorage.removeItem("loggedAdmin");
    }

    IsUserLogged() {
        return sessionStorage.getItem("loggedUser") !== null ? true : false
    }

    BlockUnlockUser(email) {
        let blockState = false
        this.UpdateAllUsersFromLocalStorage()

        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                this.users[i].blockState = !this.users[i].blockState
                blockState = this.users[i].blockState
                break
            }
        }
        this._Persist()

        return blockState
    }

    DeleteUser(email) {
        this.users = this.users.filter(user => user.email != email)
        this._Persist()
    }

    GetUserLoggedData() {
        let userLoggedEmail = this.GetUserLoggedEmail()
        return this.users.find(user => user.email === userLoggedEmail)
    }

    UpdateUser(email, firstName, surname, address, phone, password, changePasswordState) {
        this.UpdateAllUsersFromLocalStorage()
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].email === email) {
                this.users[i].firstName = firstName
                this.users[i].password = (changePasswordState === true) ? password : this.users[i].password
                this.users[i].surname = surname
                this.users[i].address = address
                this.users[i].phone = phone
                this._Persist()
            }
        }
    }

    GetUserLoggedEmail() {
        let email = ""
        let auxiliar = sessionStorage.getItem("loggedUser")

        if (auxiliar !== null) {
            email = auxiliar
        }
        return email
    }

    GetAllUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem('users')) || []
    }

    UpdateAllUsersFromLocalStorage() {
        this.users = this.GetAllUsersFromLocalStorage()
    }

    GetAllUsers() {
        this.UpdateAllUsersFromLocalStorage()
        return this.users
    }

    CreateUser(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage) {
        this.UpdateAllUsersFromLocalStorage()
        var newUser = new User(firstName, surname, email, dateOfBirth, gender, address, phone, password, avatarSourceImage);
        this.users.push(newUser);
        this._Persist();
    }

    _ClearPersistent() {
        this.users = []
        localStorage.setItem('users', JSON.stringify(this.users))
    }

    PrintAllUsersFromLocalStorage() {
        this.UpdateAllUsersFromLocalStorage()
        this.users.forEach(function(user, i) {
            console.log(i + " - " + user.firstName + " %% " + user.surname +
                " %% " + user.email + " %% " + user.dateOfBirth +
                " %% " + user.phone + " %% " + user.gender +
                " %% " + user.address + " %% " + user.password + " %% " + user.avatarSourceImage)
        });
    }

    _Persist() {
        localStorage.setItem('users', JSON.stringify(this.users))
    }
}