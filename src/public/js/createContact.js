let contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    let name = document.getElementById("contact-name").value;
    let emailId = document.getElementById("contact-mail").value;
    let message = document.getElementById("contact-message").value;

    fetch("http://localhost:3000/mails", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, emailId, message})
    }).then((res) => res.text()).then((data) => alert(data))

})