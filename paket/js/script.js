// toggle class active
const navbarNav = document.querySelector('.navbar-nav');
// ketika hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active')
}

// klik menghilangkan menu side bar
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) || navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
})


// LOGIN FUNCTION YAHHHH INGAT!!!
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.querySelector('.modal-overlay');

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    loginModal.style.display = 'flex';
    setTimeout(() => {
        loginModal.classList.add('show');
    }, 10);
});

document.addEventListener('click', function (e) {
    if (loginModal.contains(e.target)) {
        loginModal.classList.remove('show');
        setTimeout(() => {
            loginModal.style.display = 'none';
        }, 400);
    }
});