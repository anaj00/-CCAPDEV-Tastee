const wrapper = document.querySelector(".wrapper");
const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

signupLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});