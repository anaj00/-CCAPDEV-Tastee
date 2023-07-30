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
        // const commentForm = document.getElementById("commentForm");
        // commentForm.addEventListener('submit', async function(event){
        //         event.preventDefault();
        //         const commentFormObj = document.forms.commentForm;
        //         const commentFormData = new FormData(commentFormObj);
        //         const data = {}
        //         for (const entry of commentFormData.entries()){
        //                 data[entry[0]] = entry[1];
        //         }

        //         const json = JSON.stringify(data);
        //         console.log(json);
        // })
});

// TODO: Continue doing
function submitEdit(review_id){
        const editReviewForm = document.getElementById("editReview");
        const editReviewError = document.getElementById("edit-review-error");
        const editReviewObj = new FormData(editReviewForm);
        console.log(editReviewObj);
        event.preventDefault();
        const reviewTitle = document.getElementById('edit-review-title').value;
        const starRating = document.querySelector('input[name="edit-star_rating"]:checked').id;
        console.log(starRating);

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

        const data = {
                title: reviewTitle,
                rating: rating,
                content: reviewContent
        };

        console.log(data);
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

async function launchEdit(review_id){
        const commentTitle = document.getElementById("edit-review-title");
        const commentContent = document.getElementById("edit-review-review")

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
                console.log("CLIENT", data);
                commentTitle.value = data.title;
                commentContent.value = data.content;
        })
}




