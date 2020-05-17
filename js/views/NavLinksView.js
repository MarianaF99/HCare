import UserController from '../controllers/UserController.js'

export default class NavLinksView {
    constructor() {

        this.userController = new UserController();

        /* Login Modal */
        this.modal = document.getElementById("myModal");
        this.closeModal = document.querySelector(".closeModal");

        /* Nav Bar Navigation Links */
        this.loginStatusNavLink = document.querySelector('#loginStatusNavLink')
        this.registerNavLink = document.querySelector('#registerNavLink')
        this.editProfileNavLink = document.querySelector('#editProfileNavLink')

        this.loginTitle = "Login"
        this.logoutTitle = "Logout"
        this.editProfileTitle = "Edit Profile"
        this.registerTitle = "Register"
        this.empty = ""
        this.UpdateNavLinksInformation()
        this.BindLoginLogoutLinks()

        /* Login Form */
        this.loginForm = document.querySelector("#loginForm")
        this.loginEmail = document.querySelector("#loginEmail")
        this.loginPassword = document.querySelector("#loginPassword")
        this.loginMessage = document.querySelector("#loginMessage")
        this.BindLoginForm()
    }

    OpenLoginModal() {
        if (this.modal != null) {
            this.modal.style.display = "block";
        }
    }

    CloseLoginModal() {
        if (this.modal != null) {
            this.modal.style.display = "none";
        }
    }

    BindLoginLogoutLinks() {

        if (!this.userController.IsUserLogged()) {
            /* Bind the button to login button click to open the modal */
            if (this.loginStatusNavLink != null) {
                this.loginStatusNavLink.addEventListener("click", event => {
                    this.OpenLoginModal()
                });
            }

            /* Bind the close icon click in modal to close modal */
            if (this.closeModal != null) {
                this.closeModal.addEventListener("click", event => {
                    this.CloseLoginModal()
                });
            }
        } else {
            if (this.loginStatusNavLink != null) {
                this.loginStatusNavLink.addEventListener("click", event => {
                    this.userController.Logout()
                });
            }
        }
    }

    UpdateNavLinksInformation() {
        if (this.userController.IsUserLogged()) {

            this.loginStatusNavLink.innerHTML = this.logoutTitle
            this.editProfileNavLink.classList.add("visible")

            this.registerNavLink.innerHTML = this.empty
            this.registerNavLink.classList.add("invisible")

            this.editProfileNavLink.innerHTML = this.editProfileTitle
            this.editProfileNavLink.classList.add("visible")
        } else {

            this.loginStatusNavLink.innerHTML = this.loginTitle
            this.editProfileNavLink.classList.add("visible")

            this.registerNavLink.innerHTML = this.registerTitle
            this.registerNavLink.classList.add("visible")

            this.editProfileNavLink.innerHTML = this.empty
            this.editProfileNavLink.classList.add("invisible")
        }
    }

    BindLoginForm() {
        if (this.loginForm != null) {
            this.loginForm.addEventListener("submit", event => {
                event.preventDefault()
                try {
                    this.userController.Login(this.loginEmail.value, this.loginPassword.value)
                } catch (exception) {
                    this.LoginMessageHandler(exception, 'danger')
                }
            });
        }
    }

    LoginMessageHandler(message, type) {
        this.loginMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }
}