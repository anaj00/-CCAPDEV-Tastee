function toggleDivReviews(){
    var divReviews = document.getElementById("user-reviews");
    var divComments = document.getElementById("user-comments");
    console.log(divReviews.style.color);    
    if(divReviews.style.display === "none"){
        divReviews.style.display = "grid";
        if(divComments.style.display !== "none"){
            divComments.style.display = "none";
            alterRevComCss(false);
        }
        alterRevComCss(true);
    }

}

function toggleDivComments(){
    var divReviews = document.getElementById("user-reviews");
    var divComments = document.getElementById("user-comments");

    if(divComments.style.display === "none"){
        divComments.style.display = "grid";
        if(divReviews.style.display !== "none"){
            divReviews.style.display = "none";
            alterRevComCss(false);
        }
    }
}

function alterRevComCss(boolParam){
    var cReviews = document.getElementsByClassName("review-selector");
    var cComments = document.getElementsByClassName("comments-selector");
    if(boolParam){
        cComments[0].style.color = "#CFCFCF";
        cReviews[0].style.color = "#44AF69";
        
    }else{
        cReviews[0].style.color = "#CFCFCF";
        cComments[0].style.color = "#44AF69";
    }
    
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