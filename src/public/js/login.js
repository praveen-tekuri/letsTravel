const signInForm = document.querySelector(".sign-in-form");
const registerForm = document.querySelector(".register-form");

signInForm.addEventListener("submit", function(e){
    e.preventDefault();
    let emailId = document.getElementById("sign-in-email").value;
    let password = document.getElementById("sign-in-password").value;
    fetch("http://localhost:3000/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({emailId, password})
    }).then((res) => res.json()).then((data) => {
        let redirectUrl = data.redirectUrl
        console.log(redirectUrl);
        if(redirectUrl){
            window.location.href = redirectUrl
        }else {
            alert(data.message);
        }
    })
})

registerForm.addEventListener("submit", function(e){
    e.preventDefault();
    let emailId = document.getElementById("register-email").value;
    let password = document.getElementById("register-password").value;
    let rePassword = document.getElementById("re-register-password").value;

    if(password !== rePassword){
        alert("Password mismatch")
    }

    fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({emailId, password})
    }).then((res) => res.json()).then((data) => {
        alert(data.message);
        window.history.go();
    }).catch((err) => console.log(err));
})