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
});



async function toggleUpvote(item, review_id) {
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
        
        const response = await fetch("/restaurant/" + restaurant_id + "/" + review_id + "/upvote", {
                        method: "PATCH",
                        headers: {
                                "Content-Type": "application/json"
                        }
                });
                
                if (response.status == 200){
                        location.reload();
                } else {
                        console.log("ERROR");     
        }
}

// reverse process of toggleUpVote();
async function toggleDownvote(item, review_id) {
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

        const response = await fetch("/restaurant/" + restaurant_id + "/" + review_id + "/downvote", {
                        method: "PATCH",
                        headers: {
                                "Content-Type": "application/json"
                        }
                });
                
                if (response.status == 200){
                        location.reload();
                } else {
                        console.log("ERROR");     
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

async function launchEdit(review_id){
        const commentTitle = document.getElementById("edit-review-title");
        const commentContent = document.getElementById("edit-review-review");
        const editReviewIdDiv = document.getElementById("edit-review-id");

        var overlay = document.getElementById("overlay");
        var divEditProfile = document.getElementById("edit");
        
        if(divEditProfile.style.display === "none"){
                overlay.style.display = "grid";
                divEditProfile.style.display = "flex";
        }
        
        await fetch("/restaurant/" + restaurant_id + "/" + review_id, {
                method: "GET",
                headers: {
                                "Content-Type": "application/json"
                }
        })
        .then ((response) => response.json())
        .then((data) => {
                commentTitle.value = data.title;
                commentContent.value = data.content;
                editReviewIdDiv.innerText = review_id;
                // BUG: WHAT A LOW MOMENT FOR ME ONCE AGAIN
                switch (data.rating_given){
                        case 5:
                                document.getElementById("review-five").checked = true;
                                break;
                        case 4:
                                document.getElementById("review-four").checked = true;
                                break;
                        case 3:
                                document.getElementById("review-three").checked = true;
                                break;
                        case 2:
                                document.getElementById("review-two").checked = true;
                                break;
                        case 1:
                                document.getElementById("review-one").checked = true;
                                break;
                };
        })
}

async function submitEdit(){
        const review_id = document.getElementById("edit-review-id").textContent;
        const editReviewError = document.getElementById("edit-review-error");
        event.preventDefault();
        const reviewTitle = document.getElementById('edit-review-title').value;
        const starRating = document.querySelector('input[name="edit-star_rating"]:checked').id;
        console.log(review_id);

        // BUG: EW WTF IS THIS,,, I AM ASHAMED
        let rating = 1;
        switch (starRating){
                case "five":
                        rating = 5;
                        break;
                case "four":
                        rating = 4;
                        break;
                case "three":
                        rating = 3;
                        break;
                case "two":
                        rating = 2;
                        break;
                case "one":
                        rating = 1
                        break;
        };
                                        
        const reviewContent = document.getElementById('edit-review-review').value;

        if (reviewTitle == "" | reviewContent == ""){
                editReviewError.innerText = "Check if all the fields are complete."
        } else {       
                const data = {
                        title: reviewTitle,
                        rating_given: rating,
                        content: reviewContent,
                        isEdited: true,
                };
                
                const json = JSON.stringify(data);
                console.log(json);
                
                const response = await fetch("/restaurant/" + restaurant_id + "/" + review_id + "/edit", {
                        method: "PATCH",
                        body: json,
                        headers: {
                                "Content-Type": "application/json"
                        }
                });
                
                if (response.status == 200){
                        location.reload();
                } else {
                        console.log("ERROR");
        }
        }
}

async function deletePost(){
        const review_id = document.getElementById("edit-review-id").textContent;
        const response = await fetch ("/restaurant/" + restaurant_id + "/" + review_id + "/delete", {
                method: "DELETE",
                headers: {
                                "Content-Type": "application/json"
                        }
        })

        if (response.status == 200){
                location.reload();
        } else {
                console.log("Error")
        }

}

async function addComment(review_id){
        event.preventDefault();
        const commentError = document.getElementById("")
        const commentContent = document.getElementById("add-comment-"+review_id).value;
        // console.log(review_id);
        console.log(commentContent);

        const response = await fetch("/restaurant/" + restaurant_id + "/" + review_id + "/comment", {
                method: "POST",
                body: JSON.stringify({ content: commentContent }),
                headers: {
                        "Content-Type": "application/json"
                }
        });

        if (response.status == 200){
                location.reload();
        } else {
                commentError.innerText = "Nothing to post."
        }
}




