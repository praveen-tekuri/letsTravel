
{
    const articlesContainer = document.getElementById("v-pills-articles");
    const updatePostForm = document.querySelector(".update-post-form");

    let id;
    let updateTitle = document.getElementById("update-title");
    let updateText = document.getElementById("update-text");

    articlesContainer.addEventListener("click", async function(e){
        if(e.target.classList.contains("post-edit-btn")){
            id = e.target.parentNode.parentNode.querySelector(".id").value;
            
            const post = await fetch("http://localhost:3000/posts/" + id).then((res) => res.json()).then((data) => data);
    
            updateTitle.value = post.title,
            updateText.value = post.text

            let triggerEditPostTab = document.getElementById("v-pills-edit-post-tab");
            triggerEditPostTab.click();
        }
    })

    updatePostForm.addEventListener("submit", function(e){
        e.preventDefault();
        fetch("http://localhost:3000/posts/" + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: updateTitle.value,
                text: updateText.value
            })
        }).then((res) => res.text()).then((data) => {
            alert(data);
            window.history.go();
        })
    })
}