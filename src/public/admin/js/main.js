// simulate create post
let addPostBtn = document.querySelector(".add-post-btn");
let createPostBtn = document.getElementById("v-pills-add-post-tab");
addPostBtn.addEventListener("click", () => createPostBtn.click());

const getPosts = async () => {
    return await fetch("http://localhost:3000/posts")
                    .then((res) => res.json())
                    .then((data) => data);
}

document.addEventListener("DOMContentLoaded", function(e){
    loadArticles();
});

const loadArticles = async () => {
    const posts = await getPosts();
    let id = 1;
    let articlesContainer = document.querySelector("#v-pills-articles tbody");
    posts.forEach((post) => {
        let postHtml = `
            <tr>
                <th scope="row">${id++} <input type="hidden" class="id" value=${post._id}></th>
                <td>${post.title}</td>
                <td>${post.date}</td>
                <td>${post.country}</td>
                <td><button class=" post-edit-btn link-primary border-0 bg-transparent">Edit</button></td>
                <td><button class=" post-delete-btn link-primary border-0 bg-transparent">X</button></td>
            </tr>
        `
        articlesContainer.insertAdjacentHTML("beforeend", postHtml);
    })
}
