Posts = []

const Modal = document.querySelector(".MyModal")
const CloseBtn = document.getElementById("Close")
const AddPostBtn = document.querySelector(".AddBtn")
const BlogTitleInput = document.getElementById("Title")
const BlogTitleError = document.getElementById("TitleREQ")
const BlogCommentInput = document.getElementById("Content")
const BlogCommentError = document.getElementById("CommentREQ")
const Submit = document.getElementById("Submit")
const Postcard = document.querySelector(".Postcard")
let count = 0
function CloseModal() {
    Modal.style.display = "none"
    console.log("Modal Closed ")
}
function OpenModal() {
    Modal.style.display = "inline"
    console.log("Modal Opened")
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
    Postcard.innerHTML = ""
    PostToRender.forEach((p) => {
        const NewpostTag = document.createElement(`div`)
        NewpostTag.dataset.id = p.id;
        NewpostTag.classList.add("post-card");
        NewpostTag.innerHTML = `
         <div class="d-flex flex-row justify-content-between align-items-center" id ="Post${p.id}">
                <h3>${p.Title}</h3>
        
                <div >
                        <button class="Deletebtn">Delete Post</button>
                        <button class="EditBtn"> Edit Post </button>
                </div>
           </div>
        
        <p><strong>Comment:<strong>  ${p.Post}<p>
        `
        Postcard.appendChild(NewpostTag)
    })

}
Postcard.addEventListener("click", (event) => {
  const postDiv = event.target.closest(".post-card");
  if (!postDiv) return;

  const postID = parseInt(postDiv.dataset.id);
  const postIndex = Posts.findIndex(p => p.id === postID);

  // 🗑 Delete
  if (event.target.classList.contains("Deletebtn")) {
    Posts.splice(postIndex, 1);
    UpdatePage(Posts);
    return;
  }

  //  Edit
  if (event.target.classList.contains("Editbtn")) {
    const postToEdit = Posts[postIndex];
    
    // Fill modal inputs with post content
    BlogTitleInput.value = postToEdit.Title;
    BlogCommentInput.value = postToEdit.Post;

    // Show modal
    OpenModal();

    // Temporarily change Submit behavior to "Update"
    Submit.onclick = (e) => {
      e.preventDefault();
      postToEdit.Title = BlogTitleInput.value.trim();
      postToEdit.Post = BlogCommentInput.value.trim();
      
      UpdatePage(Posts);
      CloseModal();

      // Reset submit back to normal add mode
      Submit.onclick = handleNewPostSubmit;
    };
  }
});
Submit.addEventListener("click", (event) => {
    event.preventDefault();

    const isTitleValid = CheckValidity(BlogTitleInput, BlogTitleError);
    const isCommentValid = CheckValidity(BlogCommentInput, BlogCommentError);

    if (isTitleValid && isCommentValid) {
        let NewPost = {
            id: count,
            Title: BlogTitleInput.value.trim(),
            Post: BlogCommentInput.value.trim(),
            Date: new Date()
        };
        Posts.push(NewPost);
        count++;

        UpdatePage();
        CloseModal();

        BlogTitleInput.value = "";
        BlogCommentInput.value = "";
    }

    console.log("Submit button clicked");
});
CloseBtn.addEventListener("click", CloseModal)
AddPostBtn.addEventListener("click", OpenModal)





