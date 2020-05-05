function ProcessLoginForm(e) {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let result = ValidateLogin(email, password);

    if (result === true) {
        alert("Login com sucesso")
    } else {
        alert("Please register first")
    }

    return result
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

function PrintAllUsersFromLocalStorage() {
    var users = GetAllUsersFromLocalStorage()

    users.forEach(function(user, i) {
        console.log(i + " - " + user.email + " %% " + user.password)
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