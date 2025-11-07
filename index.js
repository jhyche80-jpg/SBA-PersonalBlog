Posts=[]

const Modal = document.querySelector(".MyModal")
const CloseBtn = document.getElementById("Close")
const AddPostBtn = document.querySelector(".AddBtn")
const BlogTitleInput = document.getElementById("Title")
const BlogTitleError = document.getElementById("TitleREQ")
const BlogCommentInput = document.getElementById("Content")
const BlogCommentError = document.getElementById("CommentREQ")
const Submit = document.getElementById("Submit")
const MainConent = document.getElementById("MainContent")
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
    if (!input.validity.valid || input.textContent.trim() === "") {
        message.style.display = 'inline';


    } else {
        message.style.display = 'none';

    }
}
function UpdatePage(PostToRender = ItemList){
     MainConent.innerHTML =""
     PostToRender.forEach((p)=>{
        const NewpostTag = document.createElement(`div`)
        NewpostTag.dataset.id = p.id;
        NewpostTag.innerHTML = `
        <h3>${p.Title}<h3>
        <p>${p.Post}<p>
        
        `
     })

}
Submit.addEventListener("click", (event) => {
    event.preventDefault()
    CheckValidity(BlogTitleInput, BlogTitleError)
    CheckValidity(BlogCommentInput, BlogCommentError)
    console.log("Submited")
    const ValidPost = BlogCommentInput.validity.valid &&
        BlogTitleInput.validity.valid
        if(ValidPost){
            let NewPost= {
                id: count
                Title: BlogTitleInput.value.trim(),
                Post: BlogCommentInput.value.trim(),
                Date: Date(now)
            }
            count++

        }
    console.log("button Clicked ")
})
CloseBtn.addEventListener("click", CloseModal)
AddPostBtn.addEventListener("click", OpenModal)





