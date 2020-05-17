import UserController from '../controllers/UserController.js'
import User from '../models/User.js'

export default class EditProfileView {
    constructor() {

        this.userController = new UserController();

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
}