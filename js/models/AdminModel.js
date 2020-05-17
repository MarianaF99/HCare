export default class AdminModel {
    constructor() {}

    IsAdminLogged() {
        return sessionStorage.getItem("loggedAdmin") !== null ? true : false
    }

    AdminLogin(email) {
        /* Store the session to know that admin is logged in */
        sessionStorage.setItem("loggedAdmin", email);
        /* Remove the session for the user as pre-caution */
        sessionStorage.removeItem("loggedUser");
    }

}