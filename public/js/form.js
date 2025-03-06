//error messages
var emailError = document.getElementById('email-error');
var passwordError = document.getElementById('password-error');
var submitError = document.getElementById('submit-error');


//mail validation
function validateEmail() {
    var email = document.getElementById('email-field').value;
    if (email.length == 0) {
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        emailError.innerHTML = 'Email invalid';
        return false;
    }
    emailError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#11ff00"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';
    return true;

}


//password validation
function validatePassword() {
    var password = document.getElementById('password-field').value;
    if (password.length == 0) {
        passwordError.innerHTML = 'Password is required';
        return false;
    } 

    if (password.length < 6 || password.length > 20) {
        passwordError.innerHTML = 'Password length must be between 6 and 20 characters';
        return false;
    }

    if (!/[0-9]/.test(password)) {
        passwordError.innerHTML = 'Password must contain at least one number';
        return false;
    }

    if (!/[a-z]/.test(password)) {
        passwordError.innerHTML = 'Password must contain at least one lowercase letter';
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        passwordError.innerHTML = 'Password must contain at least one uppercase letter';
        return false;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        passwordError.innerHTML = 'Password must contain at least one special character';
        return false;
    }

    passwordError.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#11ff00"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';

    return true;
}

//submit validation
function submitForm() {
    if (!validateEmail() || !validatePassword()) {
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(function () {
            submitError.style.display = 'none';
         }, 3000);

        return false;
    }
}


const message = document.getElementById('message').value;

  if (message) {
    swal(message);
  }