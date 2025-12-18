const createCallbackForm = document.querySelector(".callback-form");

createCallbackForm.addEventListener("submit", function(e){
    e.preventDefault();
    let phoneNumber = document.getElementById("phone-number").value;
    fetch("http://localhost:3000/callbacks", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({phoneNumber})
    }).then((res) => res.text()).then((data) => alert(data));
})