window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const currentPage = window.location.pathname;
    console.log("TOKEN SAAT HALAMAN DIMUAT:", token);

    // Jika tidak ada token DAN bukan di halaman login, redirect ke login
    if (!token && !currentPage.includes("/User/Admin/index.html") && currentPage !== "/") {
        window.location.href = "/"; // atau sesuai nama file login-mu

    } else if (token) {
        console.log("Token tersedia. User login sebagai:", username);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ... (kode Anda yang sudah ada, misalnya deklarasi BASE_API_URL, role, token, dll.) ...

    // Ambil elemen tombol Logout
    const logoutButton = document.getElementById("logoutButton");

    // Pastikan tombol logout ditemukan sebelum menambahkan event listener
    if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
            event.preventDefault(); // Mencegah link berpindah halaman secara default

            // Hapus token dan role dari localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("role");

            // Opsional: berikan notifikasi ke pengguna
            alert("Anda telah berhasil logout.");

            // Redirect ke halaman login atau halaman utama
            // Sesuaikan dengan path halaman login Anda yang sebenarnya
            window.location.href = "/";
        });
    }

    // ... (sisa kode Anda untuk loadPaketData, loadVendorData, event listener edit/hapus, dll.) ...

}); // End of DOMContentLoaded

fetch("/User/Customer/navbar.html")
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

        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const loginContent = document.querySelector('.modal-content');

        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            setTimeout(() => {
                loginModal.classList.add('show');
            }, 10);
        });

        document.addEventListener('click', function (e) {
            if (loginModal.style.display === 'flex' &&
                !loginContent.contains(e.target) &&
                !loginBtn.contains(e.target)) {
                loginModal.classList.remove('show');
                setTimeout(() => {
                    loginModal.style.display = 'none';
                }, 400);
            }
        });

        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (response.ok) {
                    // Login berhasil
                    localStorage.setItem('token', result.token); // Simpan token
                    localStorage.setItem('username', result.token);
                    localStorage.setItem('role', result.user.role); // Simpan role user

                    localStorage.setItem('userNama', result.user.nama);
                    localStorage.setItem('userUsername', result.user.username);
                    localStorage.setItem('userEmail', result.user.email);
                    localStorage.setItem('userNoHP', result.user.noHP); // Simpan noHP
                    localStorage.setItem('userId', result.user.id);

                    alert('Login berhasil! Selamat datang, ' + result.user.username);
                    // Arahkan ke halaman admin jika role admin, atau halaman lain
                    if (result.user.role === 'admin') {
                        window.location.href = '/User/Admin/index.html'; // Arahkan ke halaman paket
                    } else {
                        window.location.href = '/'; // Arahkan ke halaman user biasa
                    }

                } else {
                    alert(result.message || 'Login gagal');
                }
            } catch (err) {
                alert('Terjadi kesalahan: ' + err.message);
            }
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
