import UserController from '../controllers/UserController.js'
import User from '../models/User.js'

/**
 * @class View
 *
 * Visual representation of the model.
 */
export default class UserView {
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

        /* Register Form */
        this.registerForm = document.querySelector("#registerForm")
        this.registerFirstName = document.querySelector("#registerFirstName")
        this.registerSurname = document.querySelector("#registerSurname")
        this.registerEmail = document.querySelector("#registerEmail")
        this.registerDateOfBirth = document.querySelector("#registerDateOfBirth")
        this.registerGender = document.querySelector("#registerGender")
        this.registerAddress = document.querySelector("#registerAddress")
        this.registerPhone = document.querySelector("#registerPhone")
        this.registerPassword = document.querySelector("#registerPassword")
        this.registerPasswordConfirmation = document.querySelector("#registerPasswordConfirmation")
        this.registerMessage = document.querySelector("#registerMessage")
        this.BindRegisterForm()

        /* Edit Profile Form */
        this.editProfileForm = document.querySelector("#editProfileForm")
        this.editProfileFirstName = document.querySelector("#editFirstName")
        this.editProfileSurname = document.querySelector("#editSurname")
        this.editProfileAddress = document.querySelector("#editProfileAddress")
        this.editProfilePhone = document.querySelector("#editProfilePhone")
        this.editProfilePassword = document.querySelector("#editProfilePassword")
        this.editProfilePasswordConfirmation = document.querySelector("#editProfilePasswordConfirmation")
        this.editProfileMessage = document.querySelector("#editProfileMessage")
        this.FillEditProfileDataInForm()
        this.BindEditProfileForm()
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

    FillEditProfileDataInForm() {

        if (this.editProfileForm != null) {
            let user = this.userController.GetUserLoggedData()

            if (user != null) {
                this.editProfileFirstName.value = user.firstName
                this.editProfileSurname.value = user.surname
                this.editProfileAddress.value = user.address
                this.editProfilePhone.value = user.phone
            }
        }
    }

    BindEditProfileForm() {
        if (this.editProfileForm != null) {
            this.editProfileForm.addEventListener("submit", event => {
                event.preventDefault()
                try {
                    if (this.editProfilePassword.value !== this.editProfilePasswordConfirmation.value) {
                        throw Error("To change passwords the passwords must be equal. Leave blank to not change the password.")
                    }

                    if (this.editProfilePassword.value === "") {
                        /* The last parameter is omitted due to the fact that the function has a default parameter as false for the changePasswordState*/
                        this.userController.UpdateUser(this.editProfileFirstName.value, this.editProfileSurname.value, this.editProfileAddress.value, this.editProfilePhone.value, this.editProfilePassword.value)
                    } else {
                        /* The last parameter will force the change of a password */
                        this.userController.UpdateUser(this.editProfileFirstName.value, this.editProfileSurname.value, this.editProfileAddress.value, this.editProfilePhone.value, this.editProfilePassword.value, true)
                    }

                    this.EditProfileMessageHandler("Data has been updated successfully.", 'success')
                } catch (exception) {
                    this.EditProfileMessageHandler(exception, 'danger')
                }
            });
        }
    }

    EditProfileMessageHandler(message, type) {
        this.editProfileMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }

    BindRegisterForm() {
        if (this.registerForm != null) {
            this.registerForm.addEventListener("submit", event => {
                event.preventDefault()
                try {
                    if (this.registerPassword.value !== this.registerPasswordConfirmation.value) {
                        throw Error("The passwords must be equal.")
                    } else {
                        this.userController.CreateUser(this.registerFirstName.value, this.registerSurname.value, this.registerEmail.value, this.registerDateOfBirth.value, this.registerGender.value, this.registerAddress.value, this.registerPhone.value, this.registerPassword.value)
                        this.RegisterMessageHandler("User has been created", 'success')
                    }
                } catch (exception) {
                    this.RegisterMessageHandler(exception, 'danger')
                }
            });
        }
    }

    RegisterMessageHandler(message, type) {
        this.registerMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }
}