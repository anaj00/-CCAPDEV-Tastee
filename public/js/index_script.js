function toggleMenu() {
    var subMenu = document.getElementById("subMenu");
    subMenu.classList.toggle("open-menu");
}

async function switchUserNone(){
    const div = document.querySelector("#userIntro");
    const div1 = document.querySelector("#user-menu-intro");
    const img = document.querySelector("#user-pic-id")
    div.innerText = "Sign in";
    div1.innerText = "Guest";
    img.src = "images/blank_user.webp";

    const response = await fetch ("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("Logged out");
    location.reload();
    window.location.href = "/sign_in";
}

async function toggleEditProfile(){
    toggleMenu();
    var overlay = document.getElementById("overlay");
    var divEditProfile = document.getElementById("edit-profile");
    var bioDiv = document.getElementById("edit-bio");

    await fetch("/getBio", {
                method: "GET",
                headers: {
                                "Content-Type": "application/json"
                }
    }).then ((response) => response.json())
    .then((data) => {
        bioDiv.value = data;
    })

    if(divEditProfile.style.display === "none"){
        overlay.style.display = "grid";
        divEditProfile.style.display = "flex";
    }
}


function closeEdit(){
    var overlay = document.getElementById("overlay");
    var divEditProfile = document.getElementById("edit-profile");

    if(divEditProfile.style.display !== "none"){
        overlay.style.display = "none";
        divEditProfile.style.display = "none";
    }
}

const editPFPDiv = document.getElementById("edit-pfp");

function editPFP(){
    editPFPDiv.style.display = "block";
}

function closeEditPFP(){
    if(editPFPDiv.style.display !== "none"){
        editPFPDiv.style.display = "none";
    }
}

function uploadPFP(){
    event.preventDefault();
    console.log("Uploading file");

    const profilePictureInput = document.getElementById('profilePictureInput');
    const formData = new FormData();
    formData.append('profilePicture', profilePictureInput.files[0]);

    fetch('/uploadPFP', {
        method: 'PATCH',
        body: formData,
    })
    .then((response) => {
        if (response.ok) {
            console.log('Profile picture uploaded successfully.');
            location.reload();
        } else {
            console.error('Error uploading profile picture.');
        }
    })
    .catch((error) => {
        console.error('Error uploading profile picture:', error);
    });
}

function editBio(){
    event.preventDefault();
    const bioValue = document.getElementById("edit-bio").value;
    const bio = {bio: bioValue};
    const json = JSON.stringify(bio);
    
    console.log(json);

    fetch ('/editBio', {
        method: "PATCH",
        body: json,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            console.log('Bio uploaded successfully.');
            location.reload();
        } else {
            console.error('Error uploading bio.');
        }
    })
    .catch((error) => {
        console.error('Error uploading bio:', error);
    });
}

const searchBar = document.getElementById("search-input");
const searchBarList = document.getElementById("search-bar-list");
document.addEventListener("DOMContentLoaded", () => {
    let timeoutId; // Variable to store the timeout ID

    searchBar.addEventListener("keyup", function (event) {
        event.preventDefault();

    if (searchBar.value == ""){
        searchBarList.style.display = "none";
    }
    else {
        clearTimeout(timeoutId); // Clear any previous timeouts
        timeoutId = setTimeout(async function () {
        const search = searchBar.value;
        const data = { search: search };
        const json = JSON.stringify(data);
        console.log(json);

        searchBarList.innerHTML = '';

        await fetch("/search", {
            method: "POST",
            body: json,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            for (const i of data) {
                searchBarList.style.display = "block";
                searchBarList.innerHTML += `<a class="search-bar-result" href="http://localhost:3000/restaurant/${i.restaurant_id}">${i.name}</a>`;
            }
        });
    }, 300); 
    }
    });

});