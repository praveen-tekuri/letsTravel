const articlesContainer = document.getElementById("v-pills-articles")

articlesContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("post-delete-btn")){
        let id = e.target.parentNode.parentNode.querySelector(".id").value;
        fetch("http://localhost:3000/posts/" + id, {
            method: "DELETE",
        }).then((res) => res.text()).then((data) => {
            alert(data);
            window.history.go();
        });
    }
})