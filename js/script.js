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
const loginModal = document.getElementById('loginModal');

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    loginModal.style.display = 'flex';
});

function closeLoginModal(event) {
    loginModal.style.display = 'none';
}





// jawaban faq
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});