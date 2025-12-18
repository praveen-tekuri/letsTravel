const callBacksContainer = document.getElementById("v-pills-callback-requests");

callBacksContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("callback-delete-btn")){
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        fetch("http://localhost:3000/callbacks/" + id, {
            method: "DELETE"
        }).then((res) => res.text()).then((data) => {
            alert(data);
            window.history.go();
        })
    }
})