# Rencana Fase Pengembangan: SaaS ERP Travel, Haji, & Umrah

Dokumen peta jalan implementasi bertahap dari fondasi hingga peluncuran.

---

## Fase 1: Fondasi Arsitektur & Core Multi-Tenancy
**Fokus:** Fondasi database, backend tenant routing, dan Super-Admin CMS.

1. **Inisialisasi Project & Environment:**
   - Setup Laravel 11 API Backend.
   - Setup PostgreSQL (arsitektur multi-schema atau multi-database).
   - Setup Vue 3 + Vuexy untuk Super-Admin CMS & ERP App.
2. **Multi-Tenancy Engine:**
   - Tenant isolation & domain/subdomain routing.
   - Tenant lifecycle: create, migrate, seed, suspend, delete.
   - Feature toggle engine (enable/disable modul per tenant).
   - White-label engine (logo, custom color HEX, domain mapping).
3. **Autentikasi & RBAC (Role-Based Access Control):**
   - Super-Admin credentials & session/token management.
   - Tenant-level roles: Owner, Admin Operasional, Kasir/Akuntan, Agen, Staff Gudang, HRD.
4. **Default Master Data Generator:**
   - Auto-seeder COA akuntansi standar travel umrah saat tenant baru dibuat.
   - Seeder master maskapai, bandara, hotel Saudi (Makkah/Madinah).

---

## Fase 2: Core Transaksi Travel, Haji, & Umrah
**Fokus:** Operasional utama biro perjalanan.

1. **Manajemen Master Produk & Paket:**
   - Paket Umrah, Haji Plus/Furoda, Wisata Halal.
   - Konfigurasi kamar: Quad, Triple, Double.
   - Konfigurasi kuota seat, jadwal keberangkatan, batas waktu pelunasan.
   - Tiket pesawat, Land Arrangement (LA), Visa, Katering, Badal Haji/Umrah.
2. **Booking Engine & Manajemen Jamaah (Internal ERP):**
   - Input data jamaah (biodata, nomor paspor, masa berlaku, mahram).
   - Manifest jamaah per kloter.
   - Rooming list otomatis & manual override.
3. **Sistem Pembayaran & Angsuran:**
   - Skema DP, termin, dan pelunasan.
   - Integrasi Payment Gateway (Xendit / Midtrans / Open API BSI).
   - Notifikasi status pembayaran otomatis ke kasir dan jamaah.

---

## Fase 3: Modul Akuntansi Keuangan (SAK ETAP)
**Fokus:** Otomasi akuntansi dari seluruh transaksi bisnis.

1. **Struktur Akun (Chart of Accounts):**
   - COA hierarkis dan penyesuaian fleksibel per biro.
   - Klasifikasi: Aktiva, Kewajiban, Modal, Pendapatan, HPP, Beban.
2. **Jurnal Otomatis & Manual:**
   - Auto-journaling saat transaksi booking, pembayaran, atau pembelian operasional terjadi.
   - Entry jurnal penyesuaian manual.
3. **Buku Besar (General Ledger):**
   - Rekap transaksi per akun dengan filter periode dan tenant.
4. **Laporan Keuangan Otomatis:**
   - Laporan Laba Rugi (Profit & Loss).
   - Laporan Neraca (Balance Sheet).
   - Laporan Arus Kas (Cash Flow: Operasional, Investasi, Pendanaan).
   - Laporan Keuangan per Kloter/Pemberangkatan (Unit Cost & Margin Analisis).

---

## Fase 4: Modul Manajemen Persediaan (Inventory)
**Fokus:** Logistik perlengkapan umrah & integrasi biaya akuntansi.

1. **Master Item & Multi-Gudang:**
   - Manajemen koper, kain ihram, seragam, mukena, buku doa, oleh-oleh.
   - Pencatatan stok multi-gudang (gudang pusat, cabang, bandara).
2. **Operasional Inventory:**
   - Purchase Order (PO) & Penerimaan Barang dari supplier.
   - Transfer stok antar gudang.
   - Retur pembelian & pencatatan barang rusak/hilang (stock opname).
3. **Produksi / Assembly Paket Perlengkapan:**
   - Bundling item satuan menjadi 1 paket perlengkapan siap serah.
4. **Integrasi Akuntansi Persediaan:**
   - Metode penilaian: FIFO / Average.
   - Auto-update nilai persediaan dan jurnal beban saat barang diserahkan ke jamaah.

---

## Fase 5: Modul CRM, Broadcast, & Keagenan
**Fokus:** Penjualan, retensi jamaah, dan jaringan distribusi.

1. **CRM & Lead Management:**
   - Lead collection engine (form magnet calon jamaah).
   - Segmentasi prospek & riwayat kontak / log aktivitas sales.
2. **Broadcast Engine:**
   - Integrasi WhatsApp Gateway & Email SMTP.
   - Pengiriman pesan promo, reminder angsuran, jadwal manasik, dan pengumuman.
3. **Manajemen Cabang, Agen, & Sales:**
   - Struktur hierarki cabang dan keagenan.
   - Aturan komisi dinamis: nominal tetap, persentase, komisi berjenjang (*overriding*).
   - Settlement dan pembayaran komisi ke agen.

---

## Fase 6: Modul HRIS & Document Management System (DMS)
**Fokus:** Internal SDM biro dan keamanan berkas legalitas.

1. **HRIS Core:**
   - Data karyawan, struktur jabatan, kontrak.
   - Presensi real-time berbasis mobile/web.
   - Kontrol aktivitas harian & Key Performance Indicator (KPI).
   - Payroll terintegrasi akuntansi (gaji pokok, tunjangan, denda keterlambatan).
   - Modul rekrutmen & evaluasi psikotes online sederhana.
2. **DMS (Document Management System):**
   - Unggah dan enkripsi dokumen jamaah (KTP, KK, Paspor, Buku Nikah, Kartu Kuning).
   - Manajemen dokumen legalitas biro (Izin Kemenag/PPIU/PIHK, kontrak vendor/hotel).
   - Penyimpanan aman di S3-compatible cloud storage.

---

## Fase 7: Frontend B2C Booking Web & White-Label Portal
**Fokus:** Halaman publik biro untuk calon jamaah.

1. **Nuxt 3 SSR Application:**
   - Katalog paket travel/umrah publik dengan SEO optimal.
   - Cek sisa kuota seat real-time.
   - Form pendaftaran jamaah mandiri.
2. **White-Label Integration:**
   - Domain resolver (deteksi domain kustom/subdomain tenant).
   - Injeksi dinamis logo, tema warna, kontak resmi biro.
   - Integrasi direct checkout & payment gateway checkout link.

---

## Fase 8: Manajemen Mutu ISO 9001, Hardening & Launching
**Fokus:** Kualitas sistem, keamanan, dan deployment produksi.

1. **Modul Standar Mutu ISO 9001:2015:**
   - Formulir kuesioner digital kepuasan jamaah.
   - Modul audit internal operasional dan kepatuhan SLA.
2. **Security & Data Hardening:**
   - Audit isolasi data antar tenant (anti cross-tenant data leak).
   - Rate limiting, firewall, enkripsi data sensitif.
   - Otomasi backup harian database & berkas ke cloud storage terpisah.
3. **Deployment DigitalOcean:**
   - Setup Droplet/K8s/Docker Swarm + Managed PostgreSQL.
   - Nginx reverse proxy dengan auto-SSL (Let's Encrypt wildcard/custom domain).
   - CI/CD deployment pipeline.
