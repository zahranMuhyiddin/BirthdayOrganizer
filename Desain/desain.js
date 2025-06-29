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



document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".categories button");
    const cards = document.querySelectorAll(".preset-card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Set active button
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filter = button.getAttribute("data-filter");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});

