// paket_vendor_admin.js
document.addEventListener("DOMContentLoaded", () => {
    // --- Pastikan URL API Anda benar ---
    const BASE_API_URL = "http://localhost:5000/api"; // UBAH INI JIKA BACKEND ANDA TIDAK DI PORT 5000

    // Ambil role dan token dari localStorage
    const role = localStorage.getItem("role"); // Ini harus diisi saat login
    const token = localStorage.getItem("token"); // Ini harus diisi saat login

    // Elemen HTML (pastikan ID dan kelas ini sesuai di HTML Anda)
    const adminControlsPaket = document.getElementById("admin-controls-paket");
    const adminControlsVendor = document.getElementById("admin-controls-vendor");
    const addPaketButton = adminControlsPaket ? adminControlsPaket.querySelector(".btn-success") : null;
    const addVendorButton = adminControlsVendor ? adminControlsVendor.querySelector(".btn-success") : null;
    const paketContainer = document.querySelector("#paket-ultah .row"); // Pastikan selector ini tepat
    const vendorContainer = document.querySelector("#paket-vendor .row"); // Pastikan selector ini tepat

    // Modals dan Form
    const addPaketModal = document.getElementById("addPaketModal");
    const addVendorModal = document.getElementById("addVendorModal");
    const closeButtons = document.querySelectorAll(".close-button");
    const addPaketForm = document.getElementById("addPaketForm");
    const addVendorForm = document.getElementById("addVendorForm");
    const paketErrorMessage = document.getElementById("paketErrorMessage");
    const vendorErrorMessage = document.getElementById("vendorErrorMessage");

    // --- Variabel Baru untuk Mode Edit ---
    let isEditModePaket = false;
    let currentPaketId = null;
    let isEditModeVendor = false;
    let currentVendorId = null;

    // Elemen judul dan tombol submit di modal yang akan berubah
    // Pastikan ada elemen <h2> di dalam #addPaketModal dan #addVendorModal
    // Contoh HTML: <div class="modal-content"><h2>Tambah Paket Baru</h2> ... <button type="submit">Simpan Paket</button></div>
    const paketModalTitle = addPaketModal ? addPaketModal.querySelector("h2") : null;
    const paketSubmitButton = addPaketForm ? addPaketForm.querySelector("button[type='submit']") : null;

    const vendorModalTitle = addVendorModal ? addVendorModal.querySelector("h2") : null;
    const vendorSubmitButton = addVendorForm ? addVendorForm.querySelector("button[type='submit']") : null;

    const packageDetailModal = document.getElementById("packageDetailModal");
    const closePackageDetailModalBtn = document.getElementById("closePackageDetailModal");
    const packageDetailTitle = document.getElementById("packageDetailTitle");
    const packageDetailDescription = document.getElementById("packageDetailDescription");
    const packageDetailPrice = document.getElementById("packageDetailPrice");
    const goToPaymentButton = document.getElementById("goToPaymentButton");

    // --- Fungsi Bantuan ---
    // Fungsi untuk membuat elemen kartu paket
    function createPaketCard(paket) {
        const col = document.createElement("div");
        col.className = "col mt-3";

        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="judulpaket">${paket.judulpaket}</h3>
                    <p class="deskripsipaket">${paket.deskripsipaket}</p>
                    <p class="hargapaket">Harga: Rp ${formatRupiah(paket.hargapaket)}</p>
                    <button class="btn btn-pilih-paket" data-id="${paket._id}" data-type="paket">Pilih Paket</button>
                    <div class="admin-actions" style="display: ${role === 'admin' ? 'block' : 'none'}; margin-top: 10px">
                        <button class="btn btn-sm btn-warning" data-id="${paket._id}" data-type="paket">Edit</button> <button class="btn btn-sm btn-danger" data-id="${paket._id}" data-type="paket">Hapus</button> </div>
                </div>
            </div>
        `;
        return col;
    }

    // Fungsi untuk membuat elemen kartu vendor
    function createVendorCard(vendor) {
        const col = document.createElement("div");
        col.className = "col mt-3";

        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="judulvendor">${vendor.judulvendor}</h3>
                    <p class="deskrisivendor">${vendor.deskripsivendor}</p>
                    <p class="hargavendor"> Harga mulai dari : Rp ${formatRupiah(vendor.hargavendor)}</p>
                    <button class="btn btn-pilih-vendor" data-id="${vendor._id}" data-type="vendor">Pilih Paket Vendor</button>
                    <div class="admin-actions" style="display: ${role === 'admin' ? 'block' : 'none'}; margin-top: 10px">
                        <button class="btn btn-sm btn-warning" data-id="${vendor._id}" data-type="vendor">Edit</button> <button class="btn btn-sm btn-danger" data-id="${vendor._id}" data-type="vendor">Hapus</button> </div>
                </div>
            </div>
        `;
        return col;
    }

    // Fungsi format rupiah (jika diperlukan)
    function formatRupiah(angka) {
        let reverse = angka.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
        let result = ribuan.join('.').split('').reverse().join('');
        return result;
    }

    // --- Interaksi Admin ---
    // Tampilkan kontrol admin jika role adalah 'admin'
    if (role === "admin") {
        if (adminControlsPaket) adminControlsPaket.style.display = "block";
        if (adminControlsVendor) adminControlsVendor.style.display = "block";
        // Pastikan admin-actions di kartu yang sudah ada juga ditampilkan
        document.querySelectorAll(".admin-actions").forEach((el) => (el.style.display = "block"));

        // Event listener untuk tombol "Tambah Paket"
        // Event listener untuk tombol "Tambah Paket"
        if (addPaketButton) {
            addPaketButton.addEventListener("click", () => {
                isEditModePaket = false; // Set mode tambah
                currentPaketId = null;
                if (paketModalTitle) paketModalTitle.textContent = "Tambah Paket Baru"; // Ubah judul modal
                if (paketSubmitButton) paketSubmitButton.textContent = "Simpan Paket"; // Ubah teks tombol
                addPaketForm.reset();
                paketErrorMessage.textContent = "";
                addPaketModal.style.display = "flex";
                setTimeout(() => {
                    addPaketModal.classList.add('show');
                }, 10);
            });
        }

        // Event listener untuk tombol "Tambah Vendor"
        if (addVendorButton) {
            addVendorButton.addEventListener("click", () => {
                isEditModeVendor = false; // Set mode tambah
                currentVendorId = null;
                if (vendorModalTitle) vendorModalTitle.textContent = "Tambah Vendor Baru"; // Ubah judul modal
                if (vendorSubmitButton) vendorSubmitButton.textContent = "Simpan Vendor"; // Ubah teks tombol
                addVendorForm.reset();
                vendorErrorMessage.textContent = "";
                addVendorModal.style.display = "flex";
                setTimeout(() => {
                    addVendorModal.classList.add('show');
                }, 10);
            });
        }

        // Event listener untuk tombol close modal
        closeButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Hapus kelas 'show' untuk memicu transisi opacity hilang
                addPaketModal.classList.remove('show');
                addVendorModal.classList.remove('show');

                // Setelah transisi selesai, baru sembunyikan display
                setTimeout(() => {
                    addPaketModal.style.display = "none";
                    addVendorModal.style.display = "none";
                    addPaketForm.reset();
                    addVendorForm.reset();
                }, 400); // Sesuaikan dengan durasi transisi CSS Anda (misal 0.4s = 400ms)
            });
        });

        // Close modal when clicking outside of it
        window.addEventListener("click", (event) => {
            if (event.target == addPaketModal) {
                addPaketModal.classList.remove('show');
                setTimeout(() => {
                    addPaketModal.style.display = "none";
                    addPaketForm.reset();
                }, 400);
            }
            if (event.target == addVendorModal) {
                addVendorModal.classList.remove('show');
                setTimeout(() => {
                    addVendorModal.style.display = "none";
                    addVendorForm.reset();
                }, 400);
            }
        });

        // --- Handle Form Submission (Tambah Paket) ---
        if (addPaketForm) {
            addPaketForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const paketData = { // Gunakan nama variabel yang lebih umum
                    judulpaket: document.getElementById("paketJudul").value,
                    deskripsipaket: document.getElementById("paketDeskripsi").value,
                    hargapaket: parseFloat(document.getElementById("paketHarga").value),
                };

                let url = `${BASE_API_URL}/paket`;
                let method = "POST";

                if (isEditModePaket && currentPaketId) { // Logika untuk mode edit
                    url = `${BASE_API_URL}/paket/${currentPaketId}`;
                    method = "PUT";
                }

                try {
                    if (!token) {
                        paketErrorMessage.textContent = "Anda harus login sebagai admin untuk menambah/mengedit paket.";
                        return;
                    }

                    const response = await fetch(url, { // Menggunakan 'url' dan 'method' yang dinamis
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(paketData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `Gagal ${isEditModePaket ? 'mengedit' : 'menambahkan'} paket`);
                    }

                    addPaketModal.classList.remove('show'); // Hapus kelas 'show' setelah berhasil submit
                    setTimeout(() => { // Tunggu transisi fade-out
                        addPaketModal.style.display = "none";
                        addPaketForm.reset();
                    }, 400); // Sesuaikan dengan durasi transisi CSS

                    paketErrorMessage.textContent = "";
                    alert(`Paket berhasil di${isEditModePaket ? 'edit' : 'tambahkan'}!`);
                    loadPaketData(); // Panggil ulang untuk menampilkan data terbaru dari DB
                } catch (error) {
                    console.error(`Error ${isEditModePaket ? 'editing' : 'adding'} paket:`, error);
                    paketErrorMessage.textContent = "Error: " + error.message;
                }
            });
        }

        // --- Handle Form Submission (Tambah Vendor) ---
        if (addVendorForm) {
            addVendorForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const vendorData = { // Gunakan nama variabel yang lebih umum
                    judulvendor: document.getElementById("vendorJudul").value,
                    deskripsivendor: document.getElementById("vendorDeskripsi").value,
                    hargavendor: parseFloat(document.getElementById("vendorHarga").value), // Pastikan ini float jika di backend numerik
                };

                let url = `${BASE_API_URL}/vendor`;
                let method = "POST";

                if (isEditModeVendor && currentVendorId) { // Logika untuk mode edit
                    url = `${BASE_API_URL}/vendor/${currentVendorId}`;
                    method = "PUT";
                }

                try {
                    if (!token) {
                        vendorErrorMessage.textContent = "Anda harus login sebagai admin untuk menambah/mengedit vendor.";
                        return;
                    }

                    const response = await fetch(url, { // Menggunakan 'url' dan 'method' yang dinamis
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(vendorData),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || `Gagal ${isEditModeVendor ? 'mengedit' : 'menambahkan'} vendor`);
                    }

                    addVendorModal.classList.remove('show'); // Hapus kelas 'show' setelah berhasil submit
                    setTimeout(() => { // Tunggu transisi fade-out
                        addVendorModal.style.display = "none";
                        addVendorForm.reset();
                    }, 400); // Sesuaikan dengan durasi transisi CSS

                    vendorErrorMessage.textContent = "";
                    alert(`Vendor berhasil di${isEditModeVendor ? 'edit' : 'tambahkan'}!`);
                    loadVendorData(); // Panggil ulang untuk menampilkan data terbaru dari DB
                } catch (error) {
                    console.error(`Error ${isEditModeVendor ? 'editing' : 'adding'} vendor:`, error);
                    vendorErrorMessage.textContent = "Error: " + error.message;
                }
            });
        }
    } // End of if (role === "admin")

    // --- FUNGSI BARU: EVENT LISTENER UNTUK TOMBOL "PILIH PAKET" DAN "PILIH PAKET VENDOR" ---
    // Event listener delegasi untuk tombol "Pilih Paket"
    if (paketContainer) {
        paketContainer.addEventListener('click', async (event) => {
            const target = event.target;
            // Pastikan yang diklik adalah tombol dengan kelas 'btn-pilih-paket'
            if (target.classList.contains('btn-pilih-paket') && target.dataset.type === 'paket') {
                const paketId = target.dataset.id; // Ambil ID dari data-id atribut

                try {
                    // Ambil detail paket dari API menggunakan ID
                    const response = await fetch(`${BASE_API_URL}/paket/${paketId}`);
                    if (!response.ok) {
                        throw new Error("Gagal mengambil detail paket.");
                    }
                    const paket = await response.json();

                    // Isi modal dengan detail paket
                    packageDetailTitle.textContent = paket.judulpaket;
                    packageDetailDescription.textContent = paket.deskripsipaket;
                    packageDetailPrice.textContent = `Harga: Rp ${formatRupiah(paket.hargapaket)}`;

                    // Simpan ID dan tipe item di tombol "Lanjut ke Pembayaran"
                    goToPaymentButton.dataset.itemId = paket._id;
                    goToPaymentButton.dataset.itemType = 'paket';

                    // Tampilkan modal detail paket
                    if (packageDetailModal) {
                        packageDetailModal.style.display = 'flex'; // Set display ke flex
                        setTimeout(() => {
                            packageDetailModal.classList.add('show'); // Tambah kelas 'show' untuk transisi
                        }, 10);
                    }

                } catch (error) {
                    console.error("Error fetching package details:", error);
                    alert("Gagal memuat detail paket: " + error.message);
                }
            }
        });
    }

    // Event listener delegasi untuk tombol "Pilih Paket Vendor"
    if (vendorContainer) {
        vendorContainer.addEventListener('click', async (event) => {
            const target = event.target;
            // Pastikan yang diklik adalah tombol dengan kelas 'btn-pilih-vendor'
            if (target.classList.contains('btn-pilih-vendor') && target.dataset.type === 'vendor') {
                const vendorId = target.dataset.id; // Ambil ID dari data-id atribut

                try {
                    // Ambil detail vendor dari API menggunakan ID
                    const response = await fetch(`${BASE_API_URL}/vendor/${vendorId}`);
                    if (!response.ok) {
                        throw new Error("Gagal mengambil detail vendor.");
                    }
                    const vendor = await response.json();

                    // Isi modal dengan detail vendor
                    packageDetailTitle.textContent = vendor.judulvendor;
                    packageDetailDescription.textContent = vendor.deskripsivendor;
                    packageDetailPrice.textContent = `Harga mulai dari: Rp ${formatRupiah(vendor.hargavendor)}`;

                    // Simpan ID dan tipe item di tombol "Lanjut ke Pembayaran"
                    goToPaymentButton.dataset.itemId = vendor._id;
                    goToPaymentButton.dataset.itemType = 'vendor';

                    // Tampilkan modal detail vendor
                    if (packageDetailModal) {
                        packageDetailModal.style.display = 'flex';
                        setTimeout(() => {
                            packageDetailModal.classList.add('show');
                        }, 10);
                    }

                } catch (error) {
                    console.error("Error fetching vendor details:", error);
                    alert("Gagal memuat detail vendor: " + error.message);
                }
            }
        });
    }

    // --- FUNGSI BARU: EVENT LISTENER UNTUK MENUTUP MODAL DETAIL PAKET/VENDOR ---
    // Event listener untuk tombol close di dalam modal detail
    if (closePackageDetailModalBtn) {
        closePackageDetailModalBtn.addEventListener('click', () => {
            if (packageDetailModal) {
                packageDetailModal.classList.remove('show'); // Hapus kelas 'show' untuk transisi fade-out
                setTimeout(() => {
                    packageDetailModal.style.display = 'none'; // Sembunyikan setelah transisi
                }, 400); // Sesuaikan dengan durasi transisi CSS Anda
            }
        });
    }

    // Event listener untuk menutup modal detail ketika mengklik area overlay (di luar konten modal)
    if (packageDetailModal) {
        packageDetailModal.addEventListener('click', (event) => {
            // Hanya tutup jika target klik adalah modal-overlay itu sendiri, bukan modal-content
            if (event.target === packageDetailModal) {
                packageDetailModal.classList.remove('show');
                setTimeout(() => {
                    packageDetailModal.style.display = 'none';
                }, 400);
            }
        });
    }

    // --- FUNGSI BARU: EVENT LISTENER UNTUK TOMBOL "LANJUT KE PEMBAYARAN" ---
    if (goToPaymentButton) {
        goToPaymentButton.addEventListener('click', () => {
            const itemId = goToPaymentButton.dataset.itemId;
            const itemType = goToPaymentButton.dataset.itemType;

            // Sebelum redirect, Anda mungkin ingin memastikan user sudah login.
            // Jika belum login, Anda bisa menampilkan modal login di sini, atau redirect ke halaman login.
            // Contoh sederhana:
            // if (!token) {
            //     alert("Anda harus login untuk melanjutkan ke pembayaran.");
            //     // Tampilkan modal login atau redirect ke halaman login
            //     // const loginModal = document.getElementById("loginModal"); // pastikan loginModal bisa diakses
            //     // if (loginModal) {
            //     //     loginModal.style.display = 'flex';
            //     //     setTimeout(() => { loginModal.classList.add('show'); }, 10);
            //     // }
            //     return;
            // }

            if (itemId && itemType) {
                // Redirect ke halaman pembayaran, passing ID dan tipe item sebagai query parameter
                // Contoh URL: /pembayaran.html?type=paket&id=65a3b9d0e2f1a4c5b6d7e8f0
                window.location.href = `/pembayaran.html?type=${itemType}&id=${itemId}`;
            } else {
                alert("Tidak ada item yang dipilih untuk pembayaran.");
            }
        });
    }

    // --- Fungsi untuk Mengambil Data dari Backend dan Menampilkan ---
    // Fungsi ini dipanggil untuk semua user (admin atau bukan), karena menampilkan data paket/vendor
    async function loadPaketData() {
        try {
            paketContainer.innerHTML = ''; // Hapus semua kartu yang ada untuk menghindari duplikasi
            const response = await fetch(`${BASE_API_URL}/paket`); // GET request, tidak perlu token
            if (!response.ok) {
                throw new Error("Gagal mengambil data paket");
            }
            const pakets = await response.json();
            pakets.forEach((paket) => {
                const paketCard = createPaketCard(paket);
                paketContainer.appendChild(paketCard);
            });
        } catch (error) {
            console.error("Error loading paket data:", error);
            // Tampilkan pesan error ke user jika perlu (misalnya di elemen div yang relevan)
        }
    }

    async function loadVendorData() {
        try {
            vendorContainer.innerHTML = ''; // Hapus semua kartu yang ada
            const response = await fetch(`${BASE_API_URL}/vendor`); // GET request, tidak perlu token
            if (!response.ok) {
                throw new Error("Gagal mengambil data vendor");
            }
            const vendors = await response.json();
            vendors.forEach((vendor) => {
                const vendorCard = createVendorCard(vendor);
                vendorContainer.appendChild(vendorCard);
            });
        } catch (error) {
            console.error("Error loading vendor data:", error);
            // Tampilkan pesan error ke user jika perlu
        }
    }

    // Panggil fungsi untuk memuat data saat halaman dimuat
    loadPaketData();
    loadVendorData();

    // --- Implementasi Edit dan Hapus ---
    // Hanya tambahkan event listener ini jika role adalah admin
    if (role === "admin") {
        // Event listener delegasi untuk tombol Edit dan Hapus di Paket
        paketContainer.addEventListener('click', async (event) => {
            const target = event.target;

            if (target.classList.contains('btn-danger') && target.dataset.type === 'paket') {
                const paketId = target.dataset.id;
                if (confirm(`Apakah Anda yakin ingin menghapus paket ini (ID: ${paketId})?`)) {
                    try {
                        if (!token) {
                            alert("Anda tidak memiliki izin untuk menghapus paket.");
                            return;
                        }
                        const response = await fetch(`${BASE_API_URL}/paket/${paketId}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Gagal menghapus paket");
                        }
                        alert("Paket berhasil dihapus!");
                        loadPaketData();
                    } catch (error) {
                        console.error("Error deleting paket:", error);
                        alert("Gagal menghapus paket: " + error.message);
                    }
                }
            } else if (target.classList.contains('btn-warning') && target.dataset.type === 'paket') {
                const paketId = target.dataset.id;
                console.log(`Mengklik Edit Paket ID: ${paketId}`); // Debugging
                // --- Logic untuk Membuka Modal Edit Paket ---
                isEditModePaket = true;
                currentPaketId = paketId;
                if (paketModalTitle) paketModalTitle.textContent = "Edit Paket"; // Ubah judul modal
                if (paketSubmitButton) paketSubmitButton.textContent = "Perbarui Paket"; // Ubah teks tombol

                try {
                    const response = await fetch(`${BASE_API_URL}/paket/${paketId}`, {
                        headers: { 'Authorization': `Bearer ${token}` } // Jika endpoint ini butuh auth
                    });
                    if (!response.ok) {
                        throw new Error("Gagal mengambil data paket untuk diedit.");
                    }
                    const paketToEdit = await response.json();
                    console.log("Data paket untuk diedit:", paketToEdit); // Debugging

                    // Isi form dengan data yang ada
                    document.getElementById("paketJudul").value = paketToEdit.judulpaket;
                    document.getElementById("paketDeskripsi").value = paketToEdit.deskripsipaket;
                    // Pastikan hargapaket adalah number sebelum ditampilkan di input type number
                    document.getElementById("paketHarga").value = paketToEdit.hargapaket;

                    paketErrorMessage.textContent = "";
                    addPaketModal.style.display = "flex";
                    setTimeout(() => {
                        addPaketModal.classList.add('show');
                    }, 10);

                } catch (error) {
                    console.error("Error fetching paket for edit:", error);
                    alert("Gagal memuat data paket untuk diedit: " + error.message);
                }
            }
        });

        // Event listener delegasi untuk tombol Edit dan Hapus di Vendor
        vendorContainer.addEventListener('click', async (event) => {
            const target = event.target;

            if (target.classList.contains('btn-danger') && target.dataset.type === 'vendor') {
                const vendorId = target.dataset.id;
                if (confirm(`Apakah Anda yakin ingin menghapus vendor ini (ID: ${vendorId})?`)) {
                    try {
                        if (!token) {
                            alert("Anda tidak memiliki izin untuk menghapus vendor.");
                            return;
                        }
                        const response = await fetch(`${BASE_API_URL}/vendor/${vendorId}`, {
                            method: 'DELETE',
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (!response.ok) {
                            const errorData = await response.json();
                            throw new Error(errorData.message || "Gagal menghapus vendor");
                        }
                        alert("Vendor berhasil dihapus!");
                        loadVendorData();
                    } catch (error) {
                        console.error("Error deleting vendor:", error);
                        alert("Gagal menghapus vendor: " + error.message);
                    }
                }
            } else if (target.classList.contains('btn-warning') && target.dataset.type === 'vendor') {
                const vendorId = target.dataset.id;
                console.log(`Mengklik Edit Vendor ID: ${vendorId}`); // Debugging
                // --- Logic untuk Membuka Modal Edit Vendor ---
                isEditModeVendor = true;
                currentVendorId = vendorId;
                if (vendorModalTitle) vendorModalTitle.textContent = "Edit Vendor"; // Ubah judul modal
                if (vendorSubmitButton) vendorSubmitButton.textContent = "Perbarui Vendor"; // Ubah teks tombol

                try {
                    const response = await fetch(`${BASE_API_URL}/vendor/${vendorId}`, {
                        headers: { 'Authorization': `Bearer ${token}` } // Jika endpoint ini butuh auth
                    });
                    if (!response.ok) {
                        throw new Error("Gagal mengambil data vendor untuk diedit.");
                    }
                    const vendorToEdit = await response.json();
                    console.log("Data vendor untuk diedit:", vendorToEdit); // Debugging

                    // Isi form dengan data yang ada
                    document.getElementById("vendorJudul").value = vendorToEdit.judulvendor;
                    document.getElementById("vendorDeskripsi").value = vendorToEdit.deskripsivendor;
                    // Pastikan hargavendor adalah number sebelum ditampilkan di input type number
                    document.getElementById("vendorHarga").value = vendorToEdit.hargavendor;

                    vendorErrorMessage.textContent = "";
                    addVendorModal.style.display = "flex";
                    setTimeout(() => {
                        addVendorModal.classList.add('show');
                    }, 10);

                } catch (error) {
                    console.error("Error fetching vendor for edit:", error);
                    alert("Gagal memuat data vendor untuk diedit: " + error.message);
                }
            }
        });
    } // End of if (role === "admin") for edit/delete listeners
});