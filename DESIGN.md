# Panduan UI/UX Universal: Menghindari "AI Slop"

Dokumen ini berisi panduan prinsip desain untuk sistem, aplikasi, dan website guna memastikan antarmuka pengguna (UI) dan pengalaman pengguna (UX) terasa autentik, memiliki tujuan, dan menghindari jebakan "AI Slop" (desain yang terasa generik, dihasilkan secara otomatis, berlebihan secara visual tanpa makna fungsional, dan kehilangan sentuhan manusia).

## 1. Definisi "AI Slop" dalam Desain

"AI Slop" merujuk pada tren desain yang dipengaruhi oleh alat generatif atau template instan (seperti *mockup* generik di Dribbble) yang ditandai dengan:
* Estetika "Neon & Glow" pada tema gelap (biru/indigo gelap dengan aksen neon terang).
* Tampilan "Bubbly" dengan sudut (border-radius) yang terlalu membulat pada aplikasi serius/industrial.
* *Over-carding* (kotak di dalam kotak) dan penggunaan *badge/pill* berlebihan untuk informasi statis.
* Gradien warna yang berlebihan dan tidak memiliki tujuan hierarkis.
* Penggunaan elemen visual hanya sebagai dekorasi tanpa mendukung konten.

## 2. Prinsip Inti (The Anti-Slop Manifesto)

### A. *Intentionality* (Semua Harus Punya Alasan)
Setiap piksel, bayangan, warna, dan garis harus memiliki alasan fungsional. Jika sebuah elemen dihapus dan pesan atau fungsi halaman tetap utuh, maka elemen tersebut adalah *slop*.

### B. *Content-First, Decoration-Second*
Desain harus melayani konten, bukan sebaliknya. Mulailah dengan tipografi dan teks yang jelas sebelum menambahkan ornamen visual.
* Biarkan ruang kosong (*white space*) menjadi elemen desain utama untuk memisahkan informasi.
* Gunakan garis pemisah tipis (divider) alih-alih selalu menggunakan kotak/card untuk memisahkan konten.

### C. Sentuhan Manusia dan Fungsionalitas Nyata
Aplikasi tingkat profesional (seperti ERP atau sistem manajemen) harus terasa industrial, tegas, dan menunjang produktivitas, bukan sekadar memanjakan mata dengan tren sesaat.

## 3. Eksekusi Visual

### Bentuk dan Struktur (Layouting)
* **Kurangi Kesan "Bubbly":** Untuk sistem profesional/ERP, hindari sudut melengkung berlebihan (`rounded-xl` atau `rounded-full`). Gunakan sudut yang lebih tegas (`rounded-md` atau `rounded-sm` sekitar 4px-6px) untuk card dan input.
* **Hindari *Over-carding*:** Jangan meletakkan card di dalam card. Jika sudah ada di dalam satu wadah, gunakan spasi atau garis horizontal untuk menstrukturkan informasi di dalamnya.
* **Minimalkan *Badge/Pill*:** Jangan masukkan semua teks di navigasi atau header ke dalam bentuk oval/pill dengan *background color*. Gunakan bentuk ini HANYA untuk status yang butuh perhatian (misal: "Tertunda", "Kadaluarsa").

### Tipografi
* **Tipografi Keuangan/Data:** Gunakan font *tabular* (angka dengan lebar tetap) atau *monospace* untuk nominal uang dan data metrik agar angka sejajar sempurna secara vertikal.
* **Keterbacaan:** Hindari teks dengan kontras rendah. Gunakan warna abu-abu redup (muted) untuk label, dan warna solid tegas untuk data utama.

### Warna dan Gaya
* **Hindari Estetika "Futuristik/Neon":** Jika menggunakan *Dark Mode*, gunakan warna latar abu-abu netral (zinc/neutral) daripada biru navy/indigo, dan hindari warna aksen neon terang yang menyilaukan untuk grafik.
* **Pertimbangkan *Light Mode*:** Untuk aplikasi padat data (data-heavy), latar belakang putih bersih seringkali jauh lebih profesional, lebih mudah dibaca dalam durasi lama, dan terasa lebih "nyata".
* **Grafik Fungsional:** Grafik kecil (sparklines) tidak membutuhkan gradien transparan di bawahnya jika hanya berfungsi sebagai indikator tren. Gunakan garis solid.

## 4. Eksekusi UX (Pengalaman Pengguna)

* **Kejelasan > Kepintaran:** Jangan menyembunyikan navigasi di balik ikon yang ambigu. Gunakan label teks yang jelas tanpa harus selalu dibungkus *background fill*.
* **Aksesibilitas (A11y):** Pastikan desain dapat digunakan oleh semua orang. Estetika "glow" sering gagal dalam uji rasio kontras.
* **Umpan Balik Mikro (Micro-feedback):** Berikan respons visual kecil saat pengguna berinteraksi yang terasa natural, bukan animasi memantul (*bouncy*) yang berlebihan.

## 5. Ceklis Evaluasi "Anti-Slop"

Sebelum merilis desain, tanyakan pada diri sendiri:
* [ ] Apakah aplikasi ini terasa terlalu "bubbly" (sudut terlalu bulat) untuk sebuah sistem profesional?
* [ ] Apakah saya menggunakan *card* di dalam *card*? Bisakah saya menggantinya dengan ruang kosong atau garis pembatas?
* [ ] Apakah elemen navigasi dan informasi statis terlalu banyak menggunakan *background pill/badge*?
* [ ] (Khusus Dark Mode) Apakah kombinasi warna terlalu menyerupai tema "Cyberpunk/Neon" alih-alih alat kerja profesional?
* [ ] Apakah angka/nominal keuangan sudah menggunakan format *tabular* agar sejajar?