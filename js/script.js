// js/script.js
window.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const currentPage = window.location.pathname;
    console.log("TOKEN SAAT HALAMAN DIMUAT:", token);

    // Daftar halaman yang boleh diakses tanpa login
    const publicPages = [
        "/",                 // Halaman utama (biasanya mengarah ke index.html di root)
        "/index.html",       // Jika root Anda juga bisa diakses via /index.html
        "/paket/paket.html", // Ini adalah halaman Paket & Vendor Anda
        "/daftar/daftar.html", // Halaman pendaftaran
        "/tentang/tentangkami.html", // Jika ada halaman tentang kami di folder 'tentang'
        // Tambahkan path lengkap untuk halaman lain yang boleh diakses tanpa login
    ];

    // Jika tidak ada token DAN halaman saat ini BUKAN termasuk halaman publik,
    // DAN halaman saat ini BUKAN di dalam folder admin, maka redirect ke halaman utama.
    // Gunakan .startsWith() untuk mengecek apakah path dimulai dengan '/User/Admin/'
    if (!token && !publicPages.includes(currentPage) && !currentPage.startsWith("/User/Admin/")) {
        window.location.href = "/"; // atau '/index.html' jika itu yang benar
    } else if (token) {
        console.log("Token tersedia. User login sebagai:", username);
    }
});

fetch("/navbar.html")
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
                    localStorage.setItem('token', result.token);
                    localStorage.setItem('username', result.user.username); // Perbaiki ini ke username, bukan token lagi
                    localStorage.setItem('role', result.user.role);

                    localStorage.setItem('userNama', result.user.nama);
                    localStorage.setItem('userUsername', result.user.username);
                    localStorage.setItem('userEmail', result.user.email);
                    localStorage.setItem('userNoHP', result.user.noHP);
                    localStorage.setItem('userId', result.user.id);

                    alert('Login berhasil! Selamat datang, ' + result.user.username);
                    if (result.user.role === 'admin') {
                        window.location.href = '/User/Admin/index.html';
                    } else {
                        window.location.href = '/';
                    }

                } else {
                    alert(result.message || 'Login gagal');
                }
            } catch (err) {
                alert('Terjadi kesalahan: ' + err.message);
            }
        });
    });

document.addEventListener("DOMContentLoaded", () => {
    // ... (kode Anda yang sudah ada, misalnya deklarasi BASE_API_URL, role, token, dll.) ...

    const logoutButton = document.getElementById("logoutButton");

    if (logoutButton) {
        logoutButton.addEventListener("click", (event) => {
            event.preventDefault();

            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("username"); // Hapus juga username saat logout
            localStorage.removeItem("userNama");
            localStorage.removeItem("userUsername");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userNoHP");
            localStorage.removeItem("userId");


            alert("Anda telah berhasil logout.");

            window.location.href = "/";
        });
    }
});

// desain
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".categories button");
    const cards = document.querySelectorAll(".preset-card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
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

// daftar (pastikan loginBtn2 ini didefinisikan atau diambil dari DOM)
// Asumsi loginBtn2 adalah tombol untuk memicu modal login/daftar
// Pastikan Anda mendefinisikan loginBtn2 di scope yang tepat.
// Contoh: const loginBtn2 = document.getElementById('loginBtn2');

const btnIndi = document.querySelector('#indi');
const btnVendor = document.querySelector('#vendor');

if (btnVendor) { // Pastikan elemen ada sebelum menambahkan event listener
    btnVendor.onclick = () => {
        btnIndi.style.background = '#e6e6e6';
        btnIndi.style.color = '#544180';
        btnVendor.style.background = '#544180';
        btnVendor.style.color = '#e6e6e6';
    }
}
if (btnIndi) { // Pastikan elemen ada sebelum menambahkan event listener
    btnIndi.onclick = () => {
        btnVendor.style.background = '#e6e6e6';
        btnVendor.style.color = '#544180';
        btnIndi.style.background = '#544180';
        btnIndi.style.color = '#e6e6e6';
    }
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

// profile customer
// Jika sedang di halaman profile.html
if (window.location.pathname.includes('profile.html')) { // Asumsi halaman profile ada di path yang mengandung 'profile.html'
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Silakan login terlebih dahulu.");
        window.location.href = "/"; // Arahkan ke halaman utama/login
    }

    document.getElementById("profile-username").textContent = username;

    fetch("http://localhost:5000/api/auth/me", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("profile-email").textContent = data.email;
            // Anda bisa menampilkan data lain di sini jika ada (misal nama, noHP)
            // document.getElementById("profile-nama").textContent = data.nama;
            // document.getElementById("profile-noHP").textContent = data.noHP;
        })
        .catch(err => {
            alert("Gagal mengambil data profil.");
            console.error(err);
        });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.clear();
        alert("Anda telah logout.");
        window.location.href = "/";
    });
}