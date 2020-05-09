function OnPageLoadedProcessLoginState() {
    var loginInformation = GetLoginUser()

    if (loginInformation.loginStatus != undefined) {
        document.getElementById("loginStatus").innerHTML = "Logout"
    } else {
        document.getElementById("loginStatus").innerHTML = "Login"
    }
}

function GetUserByEmail(email, users) {

    var index = -1
    for (var i = 0;
        (i < users.length) && (index == -1); i++) {
        if (users[i].email === email) {
            index = i
        }
    }

    return index
}

function ProcessEditProfileForm(e) {

    e.preventDefault()

    var users = GetAllUsersFromLocalStorage()
    var loginInformation = GetLoginUser()

    var sucess = false
    var erroMessage = ""
    var isUserChangingPassword = false

    if ((document.getElementById("editPassword").value != "") || (document.getElementById("editPasswordConfirmation").value != "")) {
        isUserChangingPassword = true
    }

    if (document.getElementById("editPassword").value != document.getElementById("editPasswordConfirmation").value) {
        erroMessage += "New Passwords does not match. Leave blank to not change password.</br>"
    }

    document.getElementById("errorEditMessage").innerHTML = erroMessage

    if (erroMessage === "") {

        if (loginInformation.loginStatus != undefined) {

            var index = GetUserByEmail(loginInformation.email, users)

            if (index != -1) {

                users[index].firstName = document.getElementById("editFirstName").value
                users[index].lastName = document.getElementById("editLastName").value
                users[index].address = document.getElementById("editAddress").value
                users[index].phone = document.getElementById("editPhone").value

                if (isUserChangingPassword === true) {
                    users[index].password = document.getElementById("editPassword").value
                }

                localStorage.setItem("users", JSON.stringify(users));
                sucess = true

            }
        }
    }
    if (sucess === true) {
        document.getElementById("sucessEditMessage").innerHTML = "Data has been updated."
    } else {
        document.getElementById("sucessEditMessage").innerHTML = ""
    }
}



function OnPageLoadedFillProfileInformation() {
    var loginInformation = GetLoginUser()

    if (loginInformation.loginStatus != undefined) {
        /* User is Logggd in */
        var user = GetLoginUserData(loginInformation.email)

        if (user != undefined) {
            document.getElementById("editFirstName").value = user.firstName
            document.getElementById("editLastName").value = user.lastName
            document.getElementById("editAddress").value = user.address
            document.getElementById("editPhone").value = user.phone

        } else {
            alert("errrrrror")
        }
    } else {
        /* no use logged im */
        window.location.href = "index.html"
    }
}

function GetLoginUserData(email) {
    let user = undefined
    var users = GetAllUsersFromLocalStorage()

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            user = Object.create(users[i])
        }
    }

    return user
}


function ProcessLoginLogout() {

    var loginInformation = GetLoginUser()

    if (loginInformation.loginStatus != undefined) {
        /* a fazer logout */
        localStorage.removeItem("loginInformation")
        window.location.href = "index.html"
    } else {
        window.location.href = "login.html"
    }
}

function PrintLoginInformationFromLocalStorage() {
    var loginInformation = GetLoginUser()

    if (loginInformation != null) {
        console.log(loginInformation.email + " %% " + loginInformation.loginStatus)
    }
}

function GetLoginUser() {
    var loginInformation = JSON.parse(localStorage.getItem("loginInformation") || "[]");

    return loginInformation
}

function SetLoginUser(email, type) {
    let loginInformation = {
        loginStatus: true,
        email: email,
        loginType: type
    }

    localStorage.setItem("loginInformation", JSON.stringify(loginInformation));
}

function ProcessLoginForm(e) {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let result = ValidateLogin(email, password);

    if (result === true) {

        SetLoginUser(email, "user")

    } else {
        alert("Please register first")
    }

    return result
}

function IsEmailDuplicated(email, users) {

    var duplicate = false
    for (var i = 0;
        (i < users.length) && (duplicate == false); i++) {
        if (users[i].email === email) {
            duplicate = true
        }
    }

    return duplicate
}

function ProcessRegisterForm(e) {

    e.preventDefault()

    var users = GetAllUsersFromLocalStorage()
    var erroMessage = ""

    if (document.getElementById("registerPassword").value != document.getElementById("registerPasswordConfirmation").value) {
        erroMessage += "New Passwords does not match. Leave blank to not change password.</br>"
    }

    if (IsEmailDuplicated(document.getElementById("registerEmail").value, users) === true) {
        erroMessage += "Email exists already.</br>"
    }

    document.getElementById("errorRegisterMessage").innerHTML = erroMessage

    if (erroMessage === "") {
        let user = {
            firstName: document.getElementById("registerFirstName").value,
            lastName: document.getElementById("registerLastName").value,
            email: document.getElementById("registerEmail").value,
            dateOfBirth: document.getElementById("registerDateOfBirth").value,
            gender: document.getElementById("registerGender").value,
            address: document.getElementById("registerAddress").value,
            phone: document.getElementById("registerPhone").value,
            password: document.getElementById("registerPassword").value
        }

        users.push(user);

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "index.html"
    }
}

function GetAllUsersFromLocalStorage() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    return users;
}

function PrintAllUsersFromLocalStorage() {
    var users = GetAllUsersFromLocalStorage()

    users.forEach(function(user, i) {
        console.log(i + " - " + user.firstName + " %% " + user.lastName +
            " %% " + user.email + " %% " + user.dateOfBirth +
            " %% " + user.phone + " %% " + user.gender +
            " %% " + user.address + " %% " + user.password)
    });
}

function ValidateLogin(email, password) {

    PrintAllUsersFromLocalStorage()
    var users = GetAllUsersFromLocalStorage()

    let result = false;

    users.forEach(function(user, i) {

        if (user.email === email && user.password === password) {
            result = true;
        }
    });

    return result;
}