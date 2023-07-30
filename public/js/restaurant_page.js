const fullURL = window.location.href;
const urlSegments = fullURL.split('/');
const restaurant_id = urlSegments[urlSegments.length - 1];

document.addEventListener('DOMContentLoaded', function() {

        // Review form
        const reviewForm = document.getElementById('reviewForm');
        const reviewError = document.getElementById("review-error");
        reviewForm.addEventListener('submit', async function(event) {
                const reviewFormObj = document.forms.reviewForm;
                event.preventDefault();
                const reviewFormData = new FormData(reviewFormObj);
                const data = {};
                for (const entry of reviewFormData.entries()){
                        data[entry[0]] = entry[1];
                }

                const json = JSON.stringify(data);
                console.log(json);
                const response = await fetch ("/restaurant/" + restaurant_id, {
                        method: "POST",
                        body: json,
                        headers: {
                                "Content-Type": "application/json"
                        }
                });

                if (response.status == 200){
                        location.reload();
                } else {
                        reviewError.innerText = "Check if all the fields are complete."
                }
        });

        // TODO: Fix comments as it:
        // a: wont work,
        // b: if it does, only works on one instance
        const commentForm = document.getElementById("commentForm");
        commentForm.addEventListener('submit', async function(event){
                event.preventDefault();
                const commentFormObj = document.forms.commentForm;
                const commentFormData = new FormData(commentFormObj);
                const data = {}
                for (const entry of commentFormData.entries()){
                        data[entry[0]] = entry[1];
                }

                const json = JSON.stringify(data);
                console.log(json);
        })
});

function postComment(this){
        
}

function toggleMenu() {
        var subMenu = document.getElementById("subMenu");
        subMenu.classList.toggle("open-menu");
}
    
function switchUserNone(){
        const div = document.querySelector("#userIntro");
        const div1 = document.querySelector("#user-menu-intro");
        const img = document.querySelector("#user-pic-id")
        div.innerText = "Log In";
        div1.innerText = "Guest";
        img.src = "../images/blank_user.webp";
        const link = document.querySelector("#user-page-link");
        link.href = "../register.html";
    }

function toggleUpvote(item) {
        // get css of upvote item
        var upVoteStyle = window.getComputedStyle(item); 
        // get downvote item within the same div and its css
        var downVoteItem = item.parentElement.querySelector(".downvote"); 
        var downVoteStyle = window.getComputedStyle(downVoteItem);

        //check if item is not upvoted
        if (upVoteStyle.getPropertyValue("filter") === "grayscale(1)") {
                //check if item has been downvoted
                if(downVoteStyle.getPropertyValue("filter") !== "grayscale(1)"){
                        downVoteItem.style.filter = "grayscale(1)"; //remove downvote from downvote item
                }
                item.style.filter = "none"; // upvote item
        } else {
                item.style.filter = "grayscale(100)"; //remove upvote on click
        }
}

// reverse process of toggleUpVote();
function toggleDownvote(item) {
        var downVoteStyle = window.getComputedStyle(item);

        var upVoteItem = item.parentElement.querySelector(".upvote"); 
        var upVoteStyle = window.getComputedStyle(upVoteItem);

        if (downVoteStyle.getPropertyValue("filter") === "grayscale(1)") {
                if(upVoteStyle.getPropertyValue("filter") !== "grayscale(1"){
                        upVoteItem.style.filter = "grayscale(1)";
                }
                item.style.filter = "none";
        } else {
                item.style.filter = "grayscale(1)";
        }
}

function closeEdit(){
        var overlay = document.getElementById("overlay");
        var divEditProfile = document.getElementById("edit");

        if(divEditProfile.style.display !== "none"){
                overlay.style.display = "none";
                divEditProfile.style.display = "none";
        }
}

function launchEdit(){
        var overlay = document.getElementById("overlay");
        var divEditProfile = document.getElementById("edit");

        if(divEditProfile.style.display === "none"){
        overlay.style.display = "grid";
        divEditProfile.style.display = "flex";
    }
}


