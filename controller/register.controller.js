var $ctrl = this;

$ctrl.handleRegister = handleRegister;
$ctrl.liveValidatePasswordConfirmation = liveValidatePasswordConfirmation;
$ctrl.liveHandlePhone = liveHandlePhone;

const inputIds= {
    username: "username",
    password: "password",
    email: "email",
    passwordConfirmation: "password-confirmation",
    phone: "phone"
}

document.getElementById("btn-register").addEventListener("click", $ctrl.handleRegister);
document.getElementById(inputIds.passwordConfirmation).addEventListener("keyup", $ctrl.liveValidatePasswordConfirmation);
document.getElementById(inputIds.phone).addEventListener("input", $ctrl.liveHandlePhone);

function handleRegister() {

    const objUserRegister = getUserFormRegister();

    validateForm(objUserRegister);

    if (!objUserRegister.hasErrors) {
        window.location.href = "home-page.html";
    }

}

function validateForm(objUserRegister) {

    let hasErrors = false;

    hasErrors |= !validateField(() => validEmail(objUserRegister.email), inputIds.email, "O campo email é obrigatório", objUserRegister);
    hasErrors |= !validateField(() => validPasswordConfirmation(objUserRegister), inputIds.passwordConfirmation, "As senhas não coincidem", objUserRegister);
    hasErrors |= !validateField(() => objUserRegister.username, inputIds.username, "O campo nome é obrigatório", objUserRegister)
    hasErrors |= !validateField(() => objUserRegister.password, inputIds.password, "O campo senha é obrigatório", objUserRegister)
    hasErrors |= !validateField(() => UtilPhoneValidator.isValidPhone(objUserRegister.phoneNumber), inputIds.phone, "Telefone inválido", objUserRegister);

    objUserRegister.hasErrors = hasErrors;

}

function liveValidatePasswordConfirmation() {

    if (!validPasswordConfirmation(getUserFormRegister())) {
        addValidationMessageInput(inputIds.passwordConfirmation, "As senhas não coincidem");
    } else {
        removeValidationMessage(inputIds.passwordConfirmation);
    }

}

function getUserFormRegister() {

    let username = document.getElementById(inputIds.username).value;
    let password = document.getElementById(inputIds.password).value;
    let passwordConfirmation = document.getElementById(inputIds.passwordConfirmation).value;
    let email = document.getElementById(inputIds.email).value;
    let phoneNumber = document.getElementById(inputIds.phone).value

    return {
        username: username,
        password: password,
        email: email,
        passwordConfirmation: passwordConfirmation,
        phoneNumber: phoneNumber,
        hasErrors: false
    }

}

function addValidationMessageInput(inputId, message) {
    document.getElementById(inputId).classList.add("is-invalid");
    document.getElementById("error-message-" + inputId).textContent = message;
}

function removeValidationMessage(inputId) {
    document.getElementById(inputId).classList.remove("is-invalid");
    document.getElementById("error-message-" + inputId).textContent = "";
}

function validEmail(email) {
    return email && email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);
}

function validPasswordConfirmation(objUserRegister) {
    return objUserRegister && objUserRegister.password && (objUserRegister.password === objUserRegister.passwordConfirmation)
}


function validateField(validField, inputId, errorMessage) {

    if (!validField()) {

        addValidationMessageInput(inputId, errorMessage);

        return false;

    } else {

        removeValidationMessage(inputId);

        return true;

    }

}

function liveHandlePhone() {

    let phoneInput = document.getElementById(inputIds.phone);
    let phoneNumber = phoneInput.value.replace(/\D/g, "");

    if (phoneNumber.length <= 2) {
        phoneInput.value = `(${phoneNumber}`;
    } else if (phoneNumber.length <= 7) {
        phoneInput.value = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2)}`;
    } else {
        phoneInput.value = `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7)}`;
    }

}
