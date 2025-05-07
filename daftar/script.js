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


const btnIndi = document.querySelector('#indi');
const btnVendor = document.querySelector('#vendor');

btnVendor.onclick = () => {
    btnIndi.style.background = '#e6e6e6';
    btnIndi.style.color = '#544180';
    btnVendor.style.background = '#544180';
    btnVendor.style.color = '#e6e6e6';
}
btnIndi.onclick = () => {
    btnVendor.style.background = '#e6e6e6';
    btnVendor.style.color = '#544180';
    btnIndi.style.background = '#544180';
    btnIndi.style.color = '#e6e6e6';
}