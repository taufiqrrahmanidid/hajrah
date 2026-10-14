# Panduan UI/UX Universal: Menghindari "AI Slop"

Dokumen ini berisi panduan prinsip desain untuk sistem, aplikasi, dan website guna memastikan antarmuka pengguna (UI) dan pengalaman pengguna (UX) terasa autentik, memiliki tujuan, dan menghindari jebakan "AI Slop" (desain yang terasa generik, dihasilkan secara otomatis, berlebihan secara visual tanpa makna fungsional, dan kehilangan sentuhan manusia).

## 1. Definisi "AI Slop" dalam Desain
"AI Slop" merujuk pada tren desain yang dipengaruhi oleh alat generatif atau template instan yang ditandai dengan:
- Ilustrasi 3D generik (seperti karakter tanpa wajah/korporat).
- Gradien warna yang berlebihan dan tidak memiliki tujuan hierarkis.
- *Layout* yang terlalu sempurna secara matematis namun mengabaikan alur baca manusia.
- Penggunaan elemen visual hanya sebagai dekorasi (pengisi ruang) tanpa mendukung konten.
- Teks atau *copywriting* yang kaku, berbunga-bunga, namun tidak menyelesaikan masalah pengguna.

---

## 2. Prinsip Inti (The Anti-Slop Manifesto)

### A. *Intentionality* (Semua Harus Punya Alasan)
Setiap piksel, bayangan, warna, dan garis harus memiliki alasan fungsional. Jika sebuah elemen (misalnya, ilustrasi robot atau efek *glowing*) dihapus dan pesan atau fungsi halaman tetap utuh, maka elemen tersebut adalah *slop*.

### B. *Content-First, Decoration-Second*
Desain harus melayani konten, bukan sebaliknya. Mulailah dengan tipografi dan teks yang jelas sebelum menambahkan ornamen visual. 
- Gunakan hierarki tipografi yang kuat.
- Biarkan *white space* (ruang kosong) menjadi elemen desain, jangan merasa harus mengisi setiap sudut.

### C. Sentuhan Manusia dan Otentisitas
Manusia memiliki ketidaksempurnaan dan konteks. Desain yang baik mencerminkan empati terhadap penggunanya.
- Pilih foto asli manusia (atau tim Anda) daripada gambar *stock* hasil *render* AI.
- Jika menggunakan ilustrasi, gunakan gaya yang memiliki karakter dan selaras dengan *brand voice*, bukan *clipart* generik.

---

## 3. Eksekusi Visual

### Tipografi
- **Pilih karakter:** Gunakan *typeface* yang memiliki kepribadian (baik serif maupun sans-serif yang terkurasi) daripada gaya *system font* standar jika memungkinkan.
- **Keterbacaan di atas segalanya:** Hindari teks dengan kontras rendah.

### Warna dan Gaya
- **Warna Fungsional:** Gunakan warna untuk menyorot aksi utama (Call to Action) dan status (Error, Success).
- **Hindari *Over-Styling*:** Kurangi penggunaan bayangan (*drop shadow*) yang terlalu tebal, efek kaca (*glassmorphism*) yang berlebihan, atau animasi yang tidak memberikan umpan balik (feedback) berguna kepada pengguna.

### Ikonografi & Ilustrasi
- Gunakan *icon set* yang konsisten dan sederhana (seperti Lucide, Phosphor, atau Radix).
- Hindari ilustrasi 3D *gloomy* atau aset isometrik generik kecuali memang itu bagian dari identitas inti *brand*.

---

## 4. Eksekusi UX (Pengalaman Pengguna)

- **Kejelasan > Kepintaran:** Jangan menyembunyikan navigasi di balik ikon yang ambigu hanya agar terlihat "bersih". Gunakan label teks yang jelas.
- **Aksesibilitas (A11y):** Pastikan desain dapat digunakan oleh semua orang, termasuk mereka yang menggunakan *screen reader* atau memiliki keterbatasan penglihatan. Desain AI sering kali mengabaikan kontras warna dan struktur HTML semantik.
- **Umpan Balik Mikro (Micro-feedback):** Berikan respons visual kecil saat pengguna berinteraksi (hover, klik, loading) yang terasa natural, bukan animasi *bouncy* yang berlebihan.

---

## 5. Ceklis Evaluasi "Anti-Slop"
Sebelum merilis desain, tanyakan pada diri sendiri:
- [ ] Apakah saya bisa menghapus 20% elemen visual di halaman ini tanpa mengurangi pemahaman pengguna? (Jika ya, hapus).
- [ ] Apakah ilustrasi/gambar yang digunakan memiliki makna spesifik, atau sekadar pengisi ruang kosong?
- [ ] Apakah teks di tombol dan *header* berbicara langsung kepada pengguna seperti manusia nyata?
- [ ] Apakah desain ini terasa seperti sesuatu yang hanya bisa dibuat oleh *brand* ini?