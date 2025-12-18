// simulate create post
let addPostBtn = document.querySelector(".add-post-btn");
let createPostBtn = document.getElementById("v-pills-add-post-tab");
addPostBtn.addEventListener("click", () => createPostBtn.click());

const getPosts = async () => {
    return await fetch("http://localhost:3000/posts")
                    .then((res) => res.json())
                    .then((data) => data);
}

const getMails = async () => {
    return await fetch("http://localhost:3000/mails")
                    .then((res) => res.json())
                    .then((data) => data)
}

const getCallbacks = async () => {
    return await fetch("http://localhost:3000/callbacks")
                        .then((res) => res.json())
                        .then((data) => data);
}

document.addEventListener("DOMContentLoaded", function(e){
    loadArticles();
    loadMails();
    loadCallbacks();
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

const loadMails = async () => {
    let mailsContainer = document.querySelector("#v-pills-mails tbody");
    const mails = await getMails();
    let i = 1;
    mails.forEach((mail) => {
        let mailHtml = `
            <tr>
                <th scope="row">${i++} <input type="hidden" class="id" value="${mail._id}"></th>
                <td>${mail.name}</td>
                <td>${mail.createdAt}</td>
                <td>${mail.emailId}</td>
                <td><button class="mail-delete-btn link-primary border-0 bg-transparent">X</button></td>
            </tr>
            <tr>
                <td colspan="5">${mail.message}</td>
            </tr>
        `
        mailsContainer.insertAdjacentHTML("beforeend", mailHtml);
    })
}

const loadCallbacks = async() => {
    let callBacksContainer = document.querySelector("#v-pills-callback-requests tbody");
    const callbacks = await getCallbacks();
    let i = 1;
    callbacks.forEach((callback) => {
        callbacksHtml = `
            <tr>
                <th scope="row">${i++}<input type="hidden" class="id" value="${callback._id}"></th>
                <td>${callback.phoneNumber}</td>
                <td>${callback.createdAt}}</td>
                <td><button class="callback-delete-btn link-primary border-0 bg-transparent">X</button></td>
            </tr>
        `
        callBacksContainer.insertAdjacentHTML("beforeend", callbacksHtml);
    })
}

let logOutBtn = document.querySelector(".logout-btn");

logOutBtn.addEventListener("click", function(e){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href="/";
})