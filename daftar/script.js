// // script.js (Pastikan ini adalah file script.js Anda yang lengkap)

// // --- Kode Navbar & Hamburger Menu (dari kode Anda sebelumnya) ---
// // toggle class active
// const navbarNav = document.querySelector('.navbar-nav');
// // ketika hamburger menu di klik
// document.querySelector('#hamburger-menu').onclick = () => {
//     navbarNav.classList.toggle('active')
// }

// // klik menghilangkan menu side bar
// const hamburger = document.querySelector('#hamburger-menu');

// document.addEventListener('click', function (e) {
//     // Pastikan klik di luar hamburger dan di luar navbarNav (jika tidak aktif)
//     // Atau jika navbarNav aktif dan klik di luar navbarNav tapi bukan di hamburger
//     if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
//         navbarNav.classList.remove('active');
//     }
// });


// // --- Kode Login Modal (dari kode Anda sebelumnya) ---
// const loginBtn = document.getElementById('loginBtn'); // Tombol login di navbar
// const loginBtn2 = document.getElementById('loginBtn2'); // Tombol "login disini" di halaman daftar
// const loginModal = document.getElementById('loginModal'); // Modal itu sendiri
// const loginForm = document.getElementById('loginForm'); // Form di dalam modal login

// // Memastikan modal login awalnya display none (jika belum di CSS)
// if (loginModal) {
//     loginModal.style.display = 'none';
//     loginModal.classList.remove('show');
// }

// // Listener untuk tombol login di navbar
// if (loginBtn) { // Pastikan elemen ada
//     loginBtn.addEventListener('click', function (e) {
//         e.preventDefault();
//         if (loginModal) {
//             loginModal.style.display = 'flex';
//             setTimeout(() => {
//                 loginModal.classList.add('show');
//             }, 10);
//         }
//     });
// }

// // Listener untuk menutup modal ketika mengklik overlay (bukan konten)
// // Karena modal-content memiliki onclick="event.stopPropagation()", ini akan berfungsi
// document.addEventListener('click', function (e) {
//     if (loginModal && e.target === loginModal) { // Hanya tutup jika target klik adalah overlay modal itu sendiri
//         loginModal.classList.remove('show');
//         setTimeout(() => {
//             loginModal.style.display = 'none';
//         }, 400);
//     }
// });

// // Listener untuk tombol "login disini" di halaman daftar
// if (loginBtn2) { // Pastikan elemen ada
//     loginBtn2.addEventListener('click', function (e) {
//         e.preventDefault();
//         if (loginModal) {
//             loginModal.style.display = 'flex';
//             setTimeout(() => {
//                 loginModal.classList.add('show');
//             }, 10);
//         }
//     });
// }

// // Logika submit form login (dari script.js Anda sebelumnya)
// if (loginForm) {
//     loginForm.addEventListener('submit', async function (e) {
//         e.preventDefault();

//         const email = document.getElementById('loginEmail').value; // Menggunakan ID yang baru
//         const password = document.getElementById('loginPassword').value; // Menggunakan ID yang baru

//         try {
//             const response = await fetch('http://localhost:5000/api/auth/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, password })
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 localStorage.setItem('token', result.token);
//                 localStorage.setItem('username', result.user.username);
//                 localStorage.setItem('role', result.user.role);
//                 localStorage.setItem('userNama', result.user.nama);
//                 localStorage.setItem('userUsername', result.user.username);
//                 localStorage.setItem('userEmail', result.user.email);
//                 localStorage.setItem('userNoHP', result.user.noHP);
//                 localStorage.setItem('userId', result.user.id);

//                 alert('Login berhasil! Selamat datang, ' + result.user.username);
//                 // Tutup modal login setelah berhasil login
//                 if (loginModal) {
//                     loginModal.classList.remove('show');
//                     setTimeout(() => {
//                         loginModal.style.display = 'none';
//                     }, 400);
//                 }

//                 if (result.user.role === 'admin') {
//                     window.location.href = '/User/Admin/index.html';
//                 } else {
//                     window.location.href = '/';
//                 }

//             } else {
//                 alert(result.message || 'Login gagal');
//             }
//         } catch (err) {
//             alert('Terjadi kesalahan: ' + err.message);
//         }
//     });
// }


// // --- Kode Pemilihan Individual/Vendor (dari kode Anda sebelumnya) ---
// const btnIndi = document.querySelector('#indi');
// const btnVendor = document.querySelector('#vendor');

// // Memastikan elemen ada sebelum menambahkan event listener
// if (btnVendor) {
//     btnVendor.onclick = () => {
//         btnIndi.style.background = '#e6e6e6';
//         btnIndi.style.color = '#544180';
//         btnVendor.style.background = '#544180';
//         btnVendor.style.color = '#e6e6e6';
//     }
// }
// if (btnIndi) {
//     btnIndi.onclick = () => {
//         btnVendor.style.background = '#e6e6e6';
//         btnVendor.style.color = '#544180';
//         btnIndi.style.background = '#544180';
//         btnIndi.style.color = '#e6e6e6';
//     }
// }


// --- BAGIAN REGISTRASI YANG DIPERBAIKI ---
// Targetkan elemen form dengan ID "registerFormElement"
document.getElementById('registerFormElement').addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah refresh halaman saat submit form

    // Validasi checkbox "syarat penggunaan"
    const termsAccepted = document.getElementById('termsCheckbox').checked;
    if (!termsAccepted) {
        alert('Anda harus menyetujui syarat penggunaan.');
        return; // Hentikan proses pendaftaran jika checkbox tidak dicentang
    }


    const nama = document.getElementById('nama').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const noHP = document.getElementById('noHP').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, username, email, password, noHP })
        });

        const result = await response.json();

        if (response.ok) { // Jika respons dari server adalah sukses (status 2xx)
            alert(result.message || 'Registrasi berhasil! Silakan login.');
            e.target.reset(); // Kosongkan form setelah berhasil registrasi

            // Opsional: Tampilkan modal login secara otomatis setelah registrasi berhasil
            const loginModal = document.querySelector('.modal-overlay'); // Pastikan ini di scope yang benar
            if (loginModal) {
                loginModal.style.display = 'flex';
                setTimeout(() => {
                    loginModal.classList.add('show');
                }, 10);
            }

        } else { // Jika respons dari server adalah error (misal status 4xx, 5xx)
            alert(result.message || 'Registrasi gagal.');
        }
    } catch (err) {
        alert('Terjadi kesalahan saat pendaftaran: ' + err.message);
        console.error('Error pendaftaran:', err);
    }
});