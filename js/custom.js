function OnPageLoaded() {
    var loginInformation = GetLoginUser()

    if (loginInformation.loginStatus != undefined) {
        document.getElementById("loginStatus").innerHTML = "Logout"
    }
    else {
        document.getElementById("loginStatus").innerHTML = "Login"
    }
}

function ProcessLoginLogout() {

    var loginInformation = GetLoginUser()

    if (loginInformation.loginStatus != undefined) {
        /* a fazer logout */
        localStorage.removeItem("loginInformation")
        window.location.href = "index.html"
    }
    else {
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


function PrintAllUsersProfilesFromLocalStorage() {
    var userProfiles = GetAllUsersProfilesFromLocalStorage()

    userProfiles.forEach(function (userProfile, i) {
        console.log(i + " - " + userProfile.email + " %% " + userProfile.name + " %% " + userProfile.lastName + " %% " + userProfile.mobile + " %% " + userProfile.location)
    });
}

function ProcessEditProfileForm(e) {

    e.preventDefault()

    var userProfiles = GetAllUsersProfilesFromLocalStorage()

    let userProfile = {
        email: "andrea@gmail.com",//document.getElementById("editEmail").value,
        name: document.getElementById("editName").value,
        lastName: document.getElementById("editLastName").value,
        mobile: document.getElementById("editMobile").value,
        location: document.getElementById("editLocation").value,

    }

    var index = GetUserProfileFromEmail(userProfile.email, userProfiles)

    if (index == -1) {
        userProfiles.push(userProfile);
        alert("1")

    } else {
        userProfiles[index].email = userProfile.email
        userProfiles[index].name = userProfile.name
        userProfiles[index].lastName = userProfile.lastName
        userProfiles[index].mobile = userProfile.mobile
        userProfiles[index].location = userProfile.location
        alert("2")

    }


    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));

    PrintAllUsersProfilesFromLocalStorage()

    return false
}

function GetUserProfileFromEmail(email, userProfiles) {

    var index = -1
    for (var i = 0; (i < userProfiles.length) && (index == -1); i++) {
        if (userProfiles[i].email === email) {
            index = i
        }
    }

    return index
}

function ProcessRegisterForm(e) {

    e.preventDefault()
    var users = GetAllUsersFromLocalStorage()

    let user = {
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value
    }

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));


    alert("Registo com sucesso")

    return false
}

function GetAllUsersFromLocalStorage() {
    var users = JSON.parse(localStorage.getItem("users") || "[]");

    return users;
}
function GetAllUsersProfilesFromLocalStorage() {
    var userProfiles = JSON.parse(localStorage.getItem("userProfiles") || "[]");

    return userProfiles;
}

function PrintAllUsersFromLocalStorage() {
    var users = GetAllUsersFromLocalStorage()

    users.forEach(function (user, i) {
        console.log(i + " - " + user.email + " %% " + user.password)
    });
}



function ValidateLogin(email, password) {

    PrintAllUsersFromLocalStorage()
    var users = GetAllUsersFromLocalStorage()

    let result = false;

    users.forEach(function (user, i) {

        if (user.email === email && user.password === password) {
            result = true;
        }
    });

    return result;
}