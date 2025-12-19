let createPostForm = document.querySelector(".create-post-form");

let title = document.getElementById("create-title");
let country = document.getElementById("create-country");
let imageUrl = document.getElementById("create-image");
let text = document.getElementById("create-text");

let imageFile = document.getElementById("upload-image");

createPostForm.addEventListener("submit", function(e){
    e.preventDefault();
    
    let createText = text.value;
    let createDescription;

    if(createText.indexOf('.') === -1){
        createDescription = createText
    }else{
        createDescription = createText.slice(0, createText.indexOf('.') + 1);
    }

    let data = new FormData();
    data.append('title', title.value);
    data.append('country', country.value);
    data.append('imageUrl', imageUrl.value);
    data.append('text', createText);
    data.append('description', createDescription);
    data.append('imageFile', imageFile.files[0])
    
    fetch("http://localhost:3000/posts", {
        method: "POST",
        body: data
    }).then((res) => res.text()).then((data) => {
        alert(data)
        window.history.go();
    })
})


const disableInput = (input1, input2) => {
    if(input1.value){
        input2.disabled = true
    }
    else{
        input2.disabled = false
    }
}

imageUrl.addEventListener('change', () => disableInput(imageUrl, imageFile));
imageFile.addEventListener('change', () => disableInput(imageFile, imageUrl));