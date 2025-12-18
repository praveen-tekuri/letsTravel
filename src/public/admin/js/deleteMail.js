let mailsContainer = document.getElementById("v-pills-mails");

mailsContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("mail-delete-btn")){
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        fetch("http://localhost:3000/mails/" + id, {
            method: "DELETE"
        }).then((resp) => resp.text()).then((data) => {
            alert(data);
            window.history.go();
        })
    }
})