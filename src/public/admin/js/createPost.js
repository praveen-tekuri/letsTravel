let createPostForm = document.querySelector(".create-post-form");

createPostForm.addEventListener("submit", function(e){
    e.preventDefault();
    let title = document.getElementById("create-title").value;
    let country = document.getElementById("create-country").value;
    let imageUrl = document.getElementById("create-image").value;
    let text = document.getElementById("create-text").value;

    let createText = text;
    let createDescription;

    if(createText.indexOf('.') === -1){
        createDescription = createText
    }else{
        createDescription = createText.slice(0, createText.indexOf('.') + 1);
    }
    
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title, country, imageUrl,
            text: createText,
            description: createDescription
        })
    }).then((res) => res.text()).then((data) => {
        alert(data);
        window.history.go();
    })
})