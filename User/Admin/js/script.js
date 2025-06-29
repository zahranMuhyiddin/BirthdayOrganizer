window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const currentPage = window.location.pathname;
    console.log("TOKEN SAAT HALAMAN DIMUAT:", token);

    // Jika tidak ada token DAN bukan di halaman login, redirect ke login
    if (!token && !currentPage.includes("/user/Admin/index.html") && currentPage !== "/") {
        window.location.href = "/"; // atau sesuai nama file login-mu
    } else if (token) {
        console.log("Token tersedia. User login sebagai:", username);
    }
});




fetch("/User/Admin/navbar.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;

        // --- Semua logika DOM setelah navbar dimuat ---

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
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.clear();
            alert("Anda telah berhasil logout.");
            window.location.href = "/"; // atau halaman login
        });
    });


// jawaban faq
// const faqQuestions = document.querySelectorAll('.faq-question');

// faqQuestions.forEach(question => {
//     question.addEventListener('click', () => {
//         const answer = question.nextElementSibling;
//         if (answer.style.display === 'block') {
//             answer.style.display = 'none';
//         } else {
//             answer.style.display = 'block';
//         }
//     });
// });
// -------------------------------------------------------------------

// script akses databasenya login disini
// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const data = {
//         email: document.getElementById('email').value,
//         password: document.getElementById('password').value
//     };

//     try {
//         const response = await fetch('http://localhost:5000/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();

//         if (response.ok) {
//             alert('Login berhasil! Token: ' + result.token);
//             res.json({ token, username: user.username });
//         } else {
//             alert(result.message || 'Login gagal');
//         }
//     } catch (err) {
//         alert('Terjadi kesalahan: ' + err.message);
//     }
// });
// -------------------------------------------------------------------

// setelah login--------------------------------------
// document.addEventListener("DOMContentLoaded", () => {
//     const token = localStorage.getItem("token");
//     const username = localStorage.getItem("username");

//     if (token && username) {
//         document.getElementById("nav-auth").style.display = "none";
//         document.getElementById("nav-user").style.display = "flex";
//         document.getElementById("username-display").textContent = username;

//         // Logout
//         document.getElementById("logoutBtn").addEventListener("click", () => {
//             localStorage.clear();
//             window.location.href = "index.html"; // atau halaman login
//         });
//     } else {
//         document.getElementById("nav-auth").style.display = "flex";
//         document.getElementById("nav-user").style.display = "none";
//         if (!localStorage.getItem("token")) {
//             window.location.href = "index.html";
//         }
//     }
// });

// -------------------------------------------------------------------



// desain
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
// --------------------------------------------------------

// daftar
loginBtn2.addEventListener('click', function (e) {
    e.preventDefault();
    loginModal.style.display = 'flex';
    setTimeout(() => {
        loginModal.classList.add('show');
    }, 10);
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

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        nama: document.getElementById('nama').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        noHP: document.getElementById('noHP').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message || 'Registrasi berhasil!');
    } catch (err) {
        alert('Terjadi kesalahan: ' + err.message);
    }
});
// ============================================================================

// profile customer
// Jika sedang di halaman profile.html
if (window.location.pathname.includes('profile.html')) {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Silakan login terlebih dahulu.");
        window.location.href = "/index.html";
    }

    // Tampilkan data
    document.getElementById("profile-username").textContent = username;

    // Ambil data user lengkap dari backend (jika Anda ingin tampilkan email, dll)
    fetch("http://localhost:5000/api/auth/me", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("profile-email").textContent = data.email;
        })
        .catch(err => {
            alert("Gagal mengambil data profil.");
            console.error(err);
        });

    // Tombol logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        alert("Anda telah logout.");
        window.location.href = "/index.html";
    });
}
// =============================================================  
