# Product Requirement Document (PRD): SaaS ERP Travel, Haji, & Umrah

---

## 1. Ringkasan Produk & Visi
- **Nama Sistem:** Multi-Tenant SaaS ERP Biro Travel, Haji, & Umrah.
- **Visi:** Platform ERP terlengkap, scalable, dan white-label untuk biro perjalanan haji/umrah di Indonesia.
- **Model Bisnis:** B2B SaaS Subskripsi (Super-Admin menjual lisensi ke Biro Travel).

---

## 2. Aktor & Hak Akses (RBAC)

### A. Level Super-Admin (Pemilik SaaS)
- **Super Admin:** Mengelola tenant, paket langganan, billing, global features, master data template.

### B. Level Tenant (Biro Travel / Client)
- **Owner / Direksi:** Akses seluruh modul, dashboard eksekutif, laporan laba rugi global.
- **Admin Operasional / Ticketing:** Kelola paket, kloter, manifes jamaah, visa, kamar, bus.
- **Kasir / Keuangan:** Input pembayaran, klaim kuitansi, kelola kas/bank, jurnal manual, laporan SAK ETAP.
- **Tim Sales & Marketing:** Kelola leads CRM, broadcast promo WA/Email, atur agen.
- **Agen / Sales Eksternal:** Portal khusus agen melihat komisi, daftar jamaah rujukan, sisa kuota seat.
- **Manager Persediaan / Gudang:** Kelola stok perlengkapan umrah, PO supplier, transfer gudang.
- **HRD Manager:** Kelola presensi karyawan, penggajian, evaluasi KPI, rekrutmen.
- **Jamaah / Calon Jamaah:** Akses portal B2C, cek status pendaftaran, riwayat pembayaran, jadwal manasik.

---

## 3. Spesifikasi Arsitektur & Multi-Tenancy

### A. Arsitektur Multi-Tenancy
- **Isolasi Data:** Multi-Schema atau Multi-Database PostgreSQL per Tenant.
- **Tenant Resolver:** Berdasarkan Subdomain (`clienta.saasdomain.com`), Custom Domain (`booking.travelclienta.com`), atau Tenant ID Header pada REST API.
- **Feature Toggle Engine:** Mengunci/membuka akses modul berdasarkan paket langganan tenant.

### B. White-Labeling Engine
- Dynamic branding: Logo biro, favicon, nama PT, izin Kemenag (PPIU/PIHK).
- Primary & Secondary Color Palette injection pada UI/UX.

---

## 4. Persyaratan Fungsional Detail (Modul ERP)

### Modul 1: Super-Admin CMS
- **Tenant Management:** CRUD Tenant, provisioning otomatis (database, default COA, admin user).
- **Package & Billing:** Paket Lite, Pro, Enterprise. Pembatasan kuota jamaah/bulan atau user operator.
- **Master Data Seeder:** Inject otomatis COA standar, data maskapai, bandara, hotel Makkah & Madinah.

### Modul 2: Manajemen Transaksi & Paket Travel
- **Master Paket:** Umrah Reguler/VIP, Haji Plus/Furoda, Wisata Halal.
- **Konfigurasi Price Tier:** Quad, Triple, Double.
- **Komponen Transaksi:** Tiket pesawat, Land Arrangement (LA), Visa, Katering, Badal, Perlengkapan.
- **Pemesanan & Rooming List:** Form pendaftaran jamaah, pengelompokan mahram, pembagian kamar hotel.

### Modul 3: Payment & Angsuran
- **Metode Pembayaran:** Tunai, Transfer Bank, Payment Gateway (Xendit/Midtrans/BSI Open API).
- **Skema Cicilan:** DP awal, jadwal termin angsuran, konfirmasi pembayaran otomatis via webhook.
- **Penerbitan Kuitansi:** Auto-generate Kuitansi PDF ber-QR Code resmi biro.

### Modul 4: CRM & Broadcast System
- **Lead Collection:** Lead magnet form publik untuk pengumpulan prospek calon jamaah.
- **Pipeline Sales:** Status prospek (Lead -> Follow Up -> DP -> Lunas -> Berangkat).
- **Broadcast Engine:** Whatsapp Gateway API & Email Blast blast berita, pengumuman, dan reminder invoice.

### Modul 5: Akuntansi Keuangan (SAK ETAP)
- **Chart of Accounts (COA):** Peta akun standar khusus operasional travel umrah.
- **Auto-Journal Engine:** Transaksi booking, pembayaran, dan operasional otomatis tercatat ke jurnal.
- **Laporan Utama:**
  - Laporan Laba Rugi (Profit & Loss).
  - Laporan Neraca (Balance Sheet).
  - Laporan Arus Kas (Cash Flow: Operasional, Investasi, Pendanaan).
  - Laporan Buku Besar (General Ledger).
  - Laporan Keuangan per Pemberangkatan/Kloter (Margin Analysis).

### Modul 6: Manajemen Persediaan (Inventory)
- **Master Barang:** Koper, kain ihram, mukena, seragam, buku doa, tas paspor.
- **Multi-Gudang & Transfer:** Tracking stok gudang pusat, cabang, atau lokasi transit.
- **Penilaian Stok:** FIFO / Average.
- **Assembly / Bundling:** Penggabungan item eceran menjadi 1 Paket Perlengkapan.

### Modul 7: HRIS & Manajemen SDM
- **Manajemen Karyawan:** Profil, jabatan, dokumen kerja.
- **Presensi Real-Time:** Clock-in/out berbasis lokasi/web.
- **Payroll:** Perhitungan gaji, tunjangan, potongan denda, dan slip gaji PDF.
- **Penilaian KPI & Psikotes Online:** Form evaluasi kinerja dan tes kepribadian calon karyawan.

### Modul 8: Document Management System (DMS)
- **Arsip Jamaah:** Upload KTP, KK, Paspor, Buku Nikah, Kartu Meningitis.
- **Status Dokumen:** Marker validasi (Belum Upload -> Review -> Valid / Expiry Alert Paspor < 6 bulan).
- **Cloud Storage Security:** S3 Encrypted Storage dengan Signed URL access.

### Modul 9: Keagenan & Cabang
- **Sistem Komisi:** Fixed amount atau persentase.
- **Komisi Berjenjang (Overriding):** Komisi agen direct vs agen sponsor.
- **Portal Agen:** Dashboard pencapaian sales dan withdrawal komisi.

### Modul 10: Standardisasi ISO 9001:2015
- **Kuesioner Kepuasan Jamaah:** Survey pasca-kepulangan.
- **SLA & Incident Log:** Pencatatan komplain jamaah dan resolusinya.

---

## 5. Persyaratan Non-Fungsional

### A. Performa & Scalability
- Response time API < 200ms untuk read operation.
- Mendukung hingga 500+ tenant aktif bersamaan.

### B. Keamanan & Kepatuhan
- Isolation test: Tenant A dilarang membaca data Tenant B (Strict Tenant Query Scope).
- Password Hashing (Bcrypt/Argon2), JWT Token / Laravel Sanctum.
- Enkripsi data sensitif (Nomor Paspor, KTP).

### C. Backup & Disaster Recovery
- Auto backup database harian ke S3 bucket terpisah.
- RPO (Recovery Point Objective) < 24 jam.
- RTO (Recovery Time Objective) < 2 jam.

---

## 6. Stack Teknologi & Infrastruktur

- **Backend:** Laravel 11 (PHP 8.2+).
- **Super-Admin & ERP Frontend:** Vue.js 3 + Vuexy Admin Template.
- **B2C Public Portal:** Nuxt.js 3 (SSR untuk SEO).
- **Database:** PostgreSQL.
- **Cache & Queue:** Redis.
- **Cloud Infrastructure:** DigitalOcean Droplet + Managed PostgreSQL + Spaces Object Storage.
