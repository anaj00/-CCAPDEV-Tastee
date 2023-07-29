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
        //get css of upvote item
        var upVoteStyle = window.getComputedStyle(item); 
        //get downvote item within the same div and its css
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

//reverse process of toggleUpVote();
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