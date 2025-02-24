
var $ctrl = this;

$ctrl.handleLogin = handleLogin;

document.getElementById("btn-login").addEventListener("click", $ctrl.handleLogin);

async function handleLogin() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var userLogin = await fetch('../constants/user-auth.json')
        .then((response) => response.json())
        .then((json) => {
            return json
        });

    if (username === userLogin.username && password === userLogin.password) {
        window.location.href = "home-page.html";
    }

}
