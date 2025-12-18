async function getPosts() {
    return await fetch("http://localhost:3000/posts")
                .then((res) => res.json())
                .then((data) => data);
}


document.addEventListener("DOMContentLoaded", function(e){
    loadPosts();
})


async function loadPosts(){
    const posts = await getPosts();
    let landmarksContainer = document.querySelector(".landmarks > .row");
    posts.forEach((post) => {
        postHtml = `
            <div class="col">
                    <div class="card">
                        <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.description}</p>
                            <a href="landmarks?id=${post._id}" class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
        `
        landmarksContainer.insertAdjacentHTML("beforeend", postHtml);
    })
}

