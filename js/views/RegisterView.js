import UserController from '../controllers/UserController.js'
import User from '../models/User.js'

export default class RegisterView {
    constructor() {

        this.userController = new UserController();

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

        /* Profile Avatar */
        this.registerAvatarPhoto = document.querySelector("#registerAvatarPhoto")
        this.registerAvatarManNew = document.querySelector("#registerAvatarManNew")
        this.registerAvatarManOld = document.querySelector("#registerAvatarManOld")
        this.registerAvatarWomanNew = document.querySelector("#registerAvatarWomanNew")
        this.registerAvatarWomanOld = document.querySelector("#registerAvatarWomanOld")
        this.BindRegisterAvatar()

    }

    BindRegisterForm() {
        if (this.registerForm != null) {
            this.registerForm.addEventListener("submit", event => {
                event.preventDefault()
                try {
                    if (this.IsRegisterAvatarSelected() === false) {
                        throw Error("The avatar is not selected.")
                    } else if (this.registerPassword.value !== this.registerPasswordConfirmation.value) {
                        throw Error("The passwords must be equal.")
                    } else {
                        this.userController.CreateUser(this.registerFirstName.value, this.registerSurname.value, this.registerEmail.value, this.registerDateOfBirth.value, this.registerGender.value, this.registerAddress.value, this.registerPhone.value, this.registerPassword.value, this.GetRegisterProfileAvaterImageSource())
                        this.RegisterMessageHandler("User has been created", 'success')
                    }
                } catch (exception) {
                    this.RegisterMessageHandler(exception, 'danger')
                }
            });
        }
    }

    GetRegisterProfileAvaterImageSource() {
        let source = "img/avatares/default.png" // fallback mechanism

        if (this.registerAvatarPhoto != null) {
            source = this.registerAvatarPhoto.src
        }
        return source
    }

    RegisterMessageHandler(message, type) {
        this.registerMessage.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`
    }

    IsRegisterAvatarSelected() {
        let imagesArray = []
        let result = false

        imagesArray.push(registerAvatarManNew)
        imagesArray.push(registerAvatarManOld)
        imagesArray.push(registerAvatarWomanNew)
        imagesArray.push(registerAvatarWomanOld)

        if (this.registerAvatarPhoto != null) {
            for (let i = 0; i < imagesArray.length; i++) {
                if (imagesArray[i] != null) {
                    if (this.registerAvatarPhoto.src == imagesArray[i].src) {
                        result = true
                        break;
                    }
                }
            }
        }

        return result
    }

    UpdateProfileAvatar(imgSource) {
        if (this.registerAvatarPhoto != null) {
            registerAvatarPhoto.src = imgSource
        }
    }

    BindRegisterAvatar() {
        if (this.registerAvatarManNew != null) {
            this.registerAvatarManNew.addEventListener("click", event => {
                event.preventDefault()
                this.UpdateProfileAvatar(registerAvatarManNew.src)
            });
        }

        if (this.registerAvatarManOld != null) {
            this.registerAvatarManOld.addEventListener("click", event => {
                event.preventDefault()
                this.UpdateProfileAvatar(registerAvatarManOld.src)
            });
        }

        if (this.registerAvatarWomanNew != null) {
            this.registerAvatarWomanNew.addEventListener("click", event => {
                event.preventDefault()
                this.UpdateProfileAvatar(registerAvatarWomanNew.src)
            });
        }

        if (this.registerAvatarWomanOld != null) {
            this.registerAvatarWomanOld.addEventListener("click", event => {
                event.preventDefault()
                this.UpdateProfileAvatar(registerAvatarWomanOld.src)
            });
        }
    }

}