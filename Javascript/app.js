const defaultUser = "user";
const defaultPassword = "password"

window.history.forward();
function noBack() {
    window.history.forward();
}

function CredentialValidation(event) {

    localStorage.setItem('userN', document.getElementById('Login-User').value);
    localStorage.setItem('userP', document.getElementById('Login-Password').value)
    console.log("Funvtion called")

    passedUser = localStorage.getItem('userN');
    passedPassword = localStorage.getItem('userP');

    console.log(defaultPassword, passedPassword, "USEr", defaultUser, passedUser);
    if (passedPassword == defaultPassword && passedUser == defaultUser) {
        console.log("Validation Success");
        callResume();

    } else {
        console.log("Invalid username/password")
        document.getElementsByClassName('Login-Container')[0].style.background = "Red";
        document.getElementById('error').innerText = "Invalid Credentails !!"
    }
}

function callResume() {
    window.location.href = "../Html/Resume.html"
}