let Posts = [];
let count = 0;
let editingPost = null; //  track what we’re editing
const Modal = document.querySelector(".MyModal");
const CloseBtn = document.getElementById("Close");
const AddPostBtn = document.querySelector(".AddBtn");
const BlogTitleInput = document.getElementById("Title");
const BlogTitleError = document.getElementById("TitleREQ");
const BlogCommentInput = document.getElementById("Content");
const BlogCommentError = document.getElementById("CommentREQ");
const Submit = document.getElementById("Submit");
const Postcard = document.querySelector(".Postcard");

function CloseModal() {
    Modal.style.display = "none";
    BlogTitleInput.value = "";
    BlogCommentInput.value = "";
    editingPost = null; // reset mode
}
function SaveStorage() {
  localStorage.setItem("Posts", JSON.stringify(Posts));
}

function Load() {
  const stored = localStorage.getItem("Posts");
  if (stored) {
    Posts = JSON.parse(stored);
    count = Posts.length ? Math.max(...Posts.map(p => p.id)) + 1 : 0;
    UpdatePage(Posts);
  }
}
function OpenModal() {
    Modal.style.display = "inline";
}

function CheckValidity(input, message) {
    if (input.value.trim() === "") {
        message.style.display = 'inline';
        return false;
    } else {
        message.style.display = 'none';
        return true;
    }
}

function UpdatePage(PostToRender = Posts) {
    Postcard.innerHTML = "";

    PostToRender.forEach((p) => {
        const NewpostTag = document.createElement("div");
        NewpostTag.dataset.id = p.id;
        NewpostTag.classList.add("post-card");

        NewpostTag.innerHTML = `
        <div class="rounded">
            <div class="d-flex flex-row justify-content-between align-items-start mb-3" style= "width:auto;"id="Post${p.id}">
            
            <h4 style=  "width:400px;" class ="fs-2">${p.Title}</h4>
                <div class="ms-5">
                <button class="Deletebtn btn btn-primary my-hover-btn me-2">Delete Post</button>
                <button class="EditBtn btn btn-primary my-hover-btn">Edit Post</button>
                </div>
            </div>
            
            <p><strong>Comment:</strong> ${p.Post}</p>
            <small>${p.Date}
      </div>
    `;

        Postcard.appendChild(NewpostTag);
    });
}

// Handle Add / Edit in one Submit
Submit.addEventListener("click", (event) => {
    event.preventDefault();

    const isTitleValid = CheckValidity(BlogTitleInput, BlogTitleError);
    const isCommentValid = CheckValidity(BlogCommentInput, BlogCommentError);
    if (!isTitleValid || !isCommentValid) return;

    if (editingPost) {
        //  Edit existing post
        editingPost.Title = BlogTitleInput.value.trim();
        editingPost.Post = BlogCommentInput.value.trim();

    } else {
        //  Add new post
        Posts.push({
            id: count++,
            Title: BlogTitleInput.value.trim(),
            Post: BlogCommentInput.value.trim(),
            Date: new Date().toLocaleString()
        });
    }

    UpdatePage(Posts);
    SaveStorage()
    CloseModal();
});

//  Event delegation for Delete / Edit
Postcard.addEventListener("click", (event) => {
    const postDiv = event.target.closest(".post-card");
    if (!postDiv) return;

    const postID = parseInt(postDiv.dataset.id);
    const postToEdit = Posts.find(p => p.id === postID);

    if (event.target.classList.contains("Deletebtn")) {
        Posts = Posts.filter(p => p.id !== postID);
        UpdatePage(Posts);
        SaveStorage()
    }

    if (event.target.classList.contains("EditBtn")) {
        editingPost = postToEdit;
        BlogTitleInput.value = postToEdit.Title;
        BlogCommentInput.value = postToEdit.Post;
        OpenModal();
    }
});

AddPostBtn.addEventListener("click", OpenModal);
CloseBtn.addEventListener("click", CloseModal);
window.addEventListener("DOMContentLoaded", Load);