# Manual Book: CareerConnect AI

Selamat datang di panduan penggunaan **CareerConnect AI**. Dokumen ini dirancang untuk membantu Anda memahami, menginstal, dan mengoperasikan platform rekomendasi karir berbasis AI ini.

---

## 1. Pendahuluan
**CareerConnect AI** adalah aplikasi web interaktif yang menggunakan algoritma kecerdasan buatan sederhana untuk menganalisis minat dan bakat pengguna. Dengan menjawab beberapa pertanyaan strategis, sistem akan memberikan profil karir yang paling sesuai beserta rekomendasi pekerjaan spesifik.

### Fitur Utama:
- **Analisis Berbasis 4 Pilar**: Teknis, Kreatif, Sosial, dan Analitis.
- **Sistem Keamanan**: Enkripsi password dengan BCrypt.
- **Verifikasi OTP**: Pengiriman kode keamanan langsung ke email (via Brevo API).
- **Desain Modern**: Antarmuka berbasis *Glassmorphism* yang elegan dan responsif.
- **Simpan Hasil**: Kemampuan untuk menyimpan hasil tes ke dalam database lokal.

---

## 2. Persyaratan Sistem
Sebelum menjalankan aplikasi, pastikan perangkat Anda memenuhi syarat berikut:
- **PHP**: Versi 8.0 atau lebih tinggi.
- **Web Browser**: Google Chrome, Firefox, atau Microsoft Edge versi terbaru.
- **Koneksi Internet**: Diperlukan untuk proses pengiriman email OTP (Brevo API).
- **Text Editor**: VS Code atau Sublime Text (opsional, untuk pengembangan).

---

## 3. Panduan Instalasi & Menjalankan Aplikasi
Aplikasi ini bersifat ringkas karena menggunakan *Flat-File Database* (tidak perlu instalasi MySQL).

### Langkah-langkah:
1. **Ekstrak File**: Letakkan folder proyek di direktori kerja Anda.
2. **Konfigurasi API**:
   - Buka file `config.php`.
   - Pastikan API Key dari Brevo sudah terpasang dengan benar untuk fitur pengiriman email.
3. **Jalankan Server Lokal**:
   - Buka terminal/command prompt di dalam folder proyek.
   - Jalankan perintah: 
     ```bash
     php -S localhost:8000
     ```
4. **Akses Browser**:
   - Buka `http://localhost:8000` di browser Anda.

---

## 4. Panduan Penggunaan

### A. Pendaftaran Akun (Register)
1. Klik **"Daftar Sekarang"** pada halaman login.
2. Masukkan email aktif dan buat password yang kuat.
3. Sistem akan mengirimkan **6 digit kode OTP** ke email Anda.

### B. Verifikasi OTP
1. Buka inbox email yang Anda daftarkan.
2. Masukkan kode tersebut pada halaman verifikasi di aplikasi.
3. Jika benar, Anda akan langsung diarahkan ke halaman utama.

### C. Menjalankan Tes Karir
1. Klik tombol **"Mulai Tes Sekarang"**.
2. Jawablah 10 pertanyaan yang muncul dengan jujur sesuai preferensi pribadi Anda.
3. Progress bar di atas akan menunjukkan sejauh mana Anda telah mengerjakan tes.

### D. Melihat & Menyimpan Hasil
1. Setelah pertanyaan terakhir dijawab, sistem akan melakukan analisis otomatis.
2. Hasil berupa **Profil Karir** (contoh: *Tech Wizard*) dan **Daftar Pekerjaan** akan muncul.
3. Klik tombol **"Simpan Hasil"** untuk menyimpan data ke database sistem. Anda dapat melihatnya kembali di lain waktu (fitur admin/riwayat akan segera hadir).

---

## 5. Struktur Proyek
Memahami organisasi file untuk kemudahan pengembangan:
- `/api`: Berisi endpoint PHP untuk login, register, verifikasi, dan simpan data.
- `/database`: Penyimpanan data user dan hasil tes dalam format JSON.
- `index.html`: Struktur utama tampilan aplikasi.
- `style.css`: Logika desain dan animasi (Glassmorphism).
- `script.js`: Otak dari aplikasi (Logika tes AI, interaksi UI, dan komunikasi API).

---

## 6. Troubleshooting (Tanya Jawab)
- **Email OTP Tidak Masuk?**
  - Periksa folder *Spam*.
  - Pastikan koneksi internet stabil.
  - Cek API Key di `config.php`.
- **Gagal Login?**
  - Pastikan email dan password sudah benar.
  - Pastikan akun sudah diverifikasi via OTP.
- **Tombol "Simpan Hasil" Tidak Berfungsi?**
  - Fitur ini memerlukan status Anda sudah **Login**. Jika sesi habis, silakan login kembali.

---

**CareerConnect AI** – *Membantumu Menemukan Masa Depan dengan Satu Klik.*
