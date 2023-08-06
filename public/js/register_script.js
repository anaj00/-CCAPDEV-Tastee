const wrapper = document.querySelector(".wrapper");
const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

signupLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

async function registerUser(){
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-pw").value;
    const terms = document.getElementById("register-terms").checked;
    const error = document.getElementById("register-error");
    
    if (username != "" && password != ""){
        if (terms){
            error.textContent = "";

            data = {
                username: username,
                password: password, 
            }

            const json = JSON.stringify(data);

            const response = await fetch ("sign_in/register", {
                method: "POST",
                body: json,
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status == 200){
                window.location.href = "/"
            } 
            else {
                error.textContent = "User taken."
            }
        } else {
            error.textContent = "Please accept Terms."
        }
    } else {
        error.textContent = "Error, make sure to fill all fields.";
    }
};

async function signInUser(){
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-pw").value;
    const rememberMe = document.getElementById("login-rememberMe").checked;
    const error = document.getElementById("login-error");
    
    if (username != "" && password != ""){
        error.textContent = "";

        data = {
            username: username,
            password: password, 
        }

        const json = JSON.stringify(data);
        console.log(json);

        const response = await fetch ("sign_in/sign_in", {
            method: "POST",
            body: json,
            headers: {
                            "Content-Type": "application/json"
            }
        });

        if (response.status == 200){
            window.location.href = "/"
        } 
        else if (response.status == 404){
            error.textContent = "User not found.";
        }
        else if (response.status == 401){
            error.textContent = "Password does not match.";
        }
        else {
            error.textContent = "Error."
        }
    } else {
        error.textContent = "Error, make sure to fill all fields.";
    }
}