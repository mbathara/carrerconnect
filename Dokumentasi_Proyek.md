# Dokumentasi Proyek: CareerConnect AI

## 1. Deskripsi Proyek
CareerConnect AI adalah platform rekomendasi karir berbasis kecerdasan buatan (AI) yang dirancang untuk membantu pengguna menemukan potensi tersembunyi mereka. Melalui kuesioner interaktif, sistem menganalisis sifat teknis, kreatif, sosial, dan analitis pengguna untuk memberikan saran pekerjaan yang sangat relevan.

---

## 2. Arsitektur & Teknologi (Tech Stack)

### **Frontend (Tampilan)**
- **HTML5 & CSS3**: Menggunakan teknik desain **Glassmorphism** untuk tampilan yang modern, transparan, dan premium.
- **JavaScript (ES6+)**: Menangani logika interaktif tanpa reload halaman (Single Page Application feel).
- **Lucide Icons**: Library ikon yang bersih dan modern.
- **Google Fonts**: Menggunakan font 'Outfit' dan 'Plus Jakarta Sans' untuk estetika profesional.

### **Backend (Proses Server)**
- **PHP 8.0**: Menangani logika server-side, integrasi API, dan manajemen data.
- **REST API**: Endpoint buatan sendiri (`api/login.php`, `api/register.php`, `api/verify.php`) untuk komunikasi antara frontend dan backend.

### **Penyimpanan Data (Database)**
- **Flat-File Database (Folder-Based)**: Data pengguna disimpan dalam folder `database/` dalam format **JSON**. 
- **Enkripsi Keamanan**: Password pengguna dienkripsi menggunakan algoritma **BCrypt** sebelum disimpan, sehingga sangat aman.

### **Integrasi Pihak Ketiga**
- **Brevo API (SMTP)**: Digunakan untuk mengirimkan email kode verifikasi (OTP) secara nyata ke inbox pengguna.

---

## 3. Alur Pengoperasian (User Flow)

### **A. Tahap Keamanan (Gatekeeping)**
1. **Login First**: Pengguna disambut dengan form Login. Navigasi dan fitur utama terkunci hingga pengguna masuk.
2. **Pendaftaran (Registration)**: Jika belum punya akun, pengguna mendaftar dengan email dan password.
3. **Verifikasi Email (Real OTP)**: Sistem mengirimkan 6 digit kode unik ke email asli pengguna melalui Brevo API.
4. **Auto-Login**: Setelah kode benar, pengguna otomatis masuk ke dashboard tanpa perlu login ulang.

### **B. Tahap Tes Karir (Assessment)**
1. **Kuesioner Interaktif**: Pengguna menjawab pertanyaan yang dirancang untuk menggali minat.
2. **Real-time Scoring**: JavaScript menghitung skor secara dinamis di balik layar berdasarkan 4 pilar (Teknis, Kreatif, Sosial, Analitis).

### **C. Tahap Hasil (Results)**
1. **Analisis AI**: Sistem menampilkan profil karir (misalnya: "Creative Visionary" atau "Technical Strategist").
2. **Rekomendasi Pekerjaan**: Menampilkan daftar pekerjaan spesifik yang cocok dengan profil tersebut.
3. **Penjelasan Logis**: Memberikan rangkuman mengapa profil tersebut dipilih berdasarkan jawaban pengguna.

---

## 4. Keunggulan Sistem
- **Keamanan Mandiri**: Password tidak disimpan dalam teks biasa.
- **Ringan & Cepat**: Tidak membutuhkan database yang berat seperti MySQL; cukup folder lokal.
- **Responsif**: Tampilan menyesuaikan dengan perangkat (HP, Tablet, PC).
- **Interaktif**: Efek **Cursor Glow** dan animasi transisi yang halus memberikan pengalaman pengguna yang premium.

---

## 5. Cara Menjalankan untuk Presentasi
1. Pastikan server PHP berjalan: `php -S localhost:8000`.
2. Buka browser dan akses: `http://localhost:8000`.
3. Tunjukkan alur pendaftarannya hingga email masuk ke inbox sebagai poin utama kecanggihan sistem.
