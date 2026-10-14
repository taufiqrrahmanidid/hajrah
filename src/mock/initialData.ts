import { Tenant, TravelPackage, Jamaah, Booking, PaymentRecord, ChartOfAccount, JournalEntry, InventoryItem, Lead, BroadcastLog, Agent } from '../types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-almabrur',
    code: 'ALMABRUR',
    name: 'Al-Mabrur Travel',
    companyName: 'PT Al-Mabrur Wisata Mandiri',
    subdomain: 'almabrur',
    plan: 'Enterprise',
    status: 'active',
    createdAt: '2024-01-15',
    expiresAt: '2027-12-31',
    maxJamaahQuota: 1500,
    currentJamaahCount: 420,
    branding: {
      primaryColor: '#059669', // Emerald
      secondaryColor: '#10b981',
      logoText: 'Al-Mabrur Tour & Umrah',
      tagline: 'Melayani Tamu Allah dengan Amanah & Kenyamanan Terbaik',
      ppiuNumber: 'PPIU Kemenag RI No. 892/2021',
      pihkNumber: 'PIHK No. 104/2023',
      address: 'Jl. KH. Abdullah Syafi\'ie No. 42, Tebet, Jakarta Selatan',
      phone: '+62 21 8299 1234 / +62 811 9876 543',
      email: 'operasional@almabrurtravel.co.id',
      domain: 'almabrurtravel.co.id'
    },
    modules: {
      packages: true,
      jamaah: true,
      payments: true,
      accounting: true,
      inventory: true,
      crmBroadcast: true,
      agency: true,
      dms: true,
      iso9001: true
    }
  },
  {
    id: 'tenant-haramain',
    code: 'HARAMAIN',
    name: 'Nur Haramain Global',
    companyName: 'PT Nur Haramain Global Wisata',
    subdomain: 'haramain',
    plan: 'Pro',
    status: 'active',
    createdAt: '2024-03-01',
    expiresAt: '2026-12-31',
    maxJamaahQuota: 800,
    currentJamaahCount: 195,
    branding: {
      primaryColor: '#0284c7', // Sky / Ocean Blue
      secondaryColor: '#38bdf8',
      logoText: 'Nur Haramain Travel',
      tagline: 'Pilihan Pasti Menuju Tanah Suci dengan Pelayanan Ibadah Khusyuk',
      ppiuNumber: 'PPIU Kemenag RI No. 415/2019',
      address: 'Jl. Raya Manyar No. 88, Kertajaya, Surabaya',
      phone: '+62 31 5998 2211 / +62 812 3456 7890',
      email: 'info@nurharamain.com',
      domain: 'nurharamain.com'
    },
    modules: {
      packages: true,
      jamaah: true,
      payments: true,
      accounting: true,
      inventory: true,
      crmBroadcast: true,
      agency: true,
      dms: true,
      iso9001: false
    }
  },
  {
    id: 'tenant-safina',
    code: 'SAFINA',
    name: 'Safina Tour & Travel',
    companyName: 'PT Safina Wisata Barokah',
    subdomain: 'safina',
    plan: 'Lite',
    status: 'active',
    createdAt: '2024-06-10',
    expiresAt: '2026-06-10',
    maxJamaahQuota: 300,
    currentJamaahCount: 85,
    branding: {
      primaryColor: '#d97706', // Amber / Gold
      secondaryColor: '#f59e0b',
      logoText: 'Safina Umrah Wisata',
      tagline: 'Solusi Umrah Hemat dan Berkualitas untuk Keluarga',
      ppiuNumber: 'PPIU Kemenag RI No. 708/2020',
      address: 'Jl. Ir. H. Juanda No. 15, Dago, Bandung',
      phone: '+62 22 4231 9900',
      email: 'cs@safinawisata.id',
      domain: 'safinawisata.id'
    },
    modules: {
      packages: true,
      jamaah: true,
      payments: true,
      accounting: false,
      inventory: true,
      crmBroadcast: false,
      agency: false,
      dms: true,
      iso9001: false
    }
  }
];

export const INITIAL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-01',
    tenantId: 'tenant-almabrur',
    title: 'Umrah Reguler Barokah 9 Hari',
    category: 'Umrah Reguler',
    durationDays: 9,
    airline: 'Garuda Indonesia (Direct Flight)',
    flightRoute: 'CGK (Jakarta) - JED (Jeddah) PP',
    makkahHotel: 'Pullman Zamzam Makkah (Bintang 5)',
    makkahHotelStars: 5,
    madinahHotel: 'Anwar Al Madinah Mövenpick (Bintang 5)',
    madinahHotelStars: 5,
    departureDate: '2026-11-15',
    returnDate: '2026-11-23',
    totalSeats: 45,
    bookedSeats: 38,
    tiers: [
      { type: 'Quad', priceIdr: 32500000, description: 'Kamar Berempat (4 pax)' },
      { type: 'Triple', priceIdr: 35000000, description: 'Kamar Bertiga (3 pax)' },
      { type: 'Double', priceIdr: 38500000, description: 'Kamar Berdua (2 pax)' }
    ],
    includes: [
      'Tiket Pesawat Garuda Indonesia PP Economy',
      'Visa Umrah & Asuransi Perjalanan Muassasah',
      'Hotel Bintang 5 Dekat Pelataran Masjidil Haram & Nabawi',
      'Makan 3x Fullboard Buffet Menu Indonesia',
      'Transportasi Bus Full AC Executive Saptco',
      'Muthawwif Berpengalaman Lulusan Universitas Madinah',
      'Air Zamzam 5 Liter (S&K Maskapai)',
      '1 Set Perlengkapan Umrah Eksklusif'
    ],
    status: 'Open',
    kloterCode: 'KL-ALM-2611A',
    programLead: 'Ustadz H. Ahmad Fauzi, Lc. MA'
  },
  {
    id: 'pkg-02',
    tenantId: 'tenant-almabrur',
    title: 'Umrah VIP Awal Ramadhan 12 Hari',
    category: 'Umrah VIP',
    durationDays: 12,
    airline: 'Saudia Airlines (Direct Flight)',
    flightRoute: 'CGK - MED / JED - CGK',
    makkahHotel: 'Fairmont Makkah Clock Royal Tower',
    makkahHotelStars: 5,
    madinahHotel: 'Dar Al Taqwa Madinah',
    madinahHotelStars: 5,
    departureDate: '2027-02-18',
    returnDate: '2027-03-01',
    totalSeats: 40,
    bookedSeats: 32,
    tiers: [
      { type: 'Quad', priceIdr: 45000000, description: 'Kamar Berempat (4 pax)' },
      { type: 'Triple', priceIdr: 49500000, description: 'Kamar Bertiga (3 pax)' },
      { type: 'Double', priceIdr: 54000000, description: 'Kamar Berdua (2 pax)' }
    ],
    includes: [
      'Tiket Saudia Airlines Direct PP Business/Economy',
      'Visa Umrah VIP & Fast Track Airport Service',
      'Hotel Ring 1 View Ka\'bah',
      'Kereta Cepat Haramain High-Speed Rail Makkah-Madinah',
      'Ziarah Khusus Badar & Jabal Magnet VIP Bus',
      'Handling Airport Saudi & Indonesia'
    ],
    status: 'Open',
    kloterCode: 'KL-ALM-2702VIP',
    programLead: 'Dr. KH. M. Syukron, M.Ag'
  },
  {
    id: 'pkg-03',
    tenantId: 'tenant-almabrur',
    title: 'Haji Khusus Furoda / Mujamalah 2027 (Tanpa Antri)',
    category: 'Haji Furoda',
    durationDays: 25,
    airline: 'Garuda Indonesia / Saudia',
    flightRoute: 'CGK - JED / MED - CGK',
    makkahHotel: 'Swissôtel Al Maqam Makkah & Tenda Maktab VIP Furoda Mina/Arafah',
    makkahHotelStars: 5,
    madinahHotel: 'The Oberoi Madinah',
    madinahHotelStars: 5,
    departureDate: '2027-05-20',
    returnDate: '2027-06-14',
    totalSeats: 25,
    bookedSeats: 18,
    tiers: [
      { type: 'Quad', priceIdr: 285000000, description: 'Tenda Mina VIP + Hotel Quad' },
      { type: 'Double', priceIdr: 325000000, description: 'Tenda Mina VIP + Hotel Double' }
    ],
    includes: [
      'Visa Haji Mujamalah Resmi Kementerian Haji Saudi',
      'Maktab Haji Khusus VIP 111-112 Arafah & Mina Ber-AC',
      'Apartemen Transit Shisha sebelum Tarwiyah',
      'Dam / Qurban Haji Tamattu',
      'Bimbingan Ibadah Intensif Sesuai Sunnah'
    ],
    status: 'Open',
    kloterCode: 'HAJI-FUR-2027',
    programLead: 'KH. Zulkifli Harun, MA'
  },
  {
    id: 'pkg-04',
    tenantId: 'tenant-haramain',
    title: 'Umrah Hemat Plus City Tour Thaif 10 Hari',
    category: 'Umrah Reguler',
    durationDays: 10,
    airline: 'Lion Air / Batik Air Premium',
    flightRoute: 'SUB (Surabaya) - MED / JED - SUB',
    makkahHotel: 'Rayyana Makkah Hotel (Bintang 4)',
    makkahHotelStars: 4,
    madinahHotel: 'Rove Al Madinah (Bintang 4)',
    madinahHotelStars: 4,
    departureDate: '2026-11-28',
    returnDate: '2026-12-07',
    totalSeats: 45,
    bookedSeats: 42,
    tiers: [
      { type: 'Quad', priceIdr: 27900000, description: 'Kamar Quad Promo Hemat' },
      { type: 'Triple', priceIdr: 29900000, description: 'Kamar Triple' },
      { type: 'Double', priceIdr: 32900000, description: 'Kamar Double' }
    ],
    includes: [
      'Tiket Pesawat PP Surabaya - Saudi',
      'City Tour Kota Sejuk Thaif & Cable Car Teleferik',
      'Makan Nasi Mandhi Khas Thaif',
      'Visa Umrah & Asuransi Siskopatuh',
      'Perlengkapan Umrah Lengkap'
    ],
    status: 'Open',
    kloterCode: 'KL-NH-2611SUB',
    programLead: 'Ustadz H. Ridwan Mansur'
  }
];

export const INITIAL_JAMAAH: Jamaah[] = [
  {
    id: 'jam-01',
    tenantId: 'tenant-almabrur',
    nik: '3174051203850003',
    namaLengkap: 'H. Bambang Trihatmojo',
    namaPaspor: 'BAMBANG TRIHATMOJO',
    noPaspor: 'C7829104',
    pasporExpiry: '2028-09-14',
    tempatLahir: 'Jakarta',
    tanggalLahir: '1985-03-12',
    gender: 'L',
    phone: '081288991122',
    alamat: 'Jl. Tebet Barat Dalam No. 18, Jakarta Selatan',
    kota: 'Jakarta Selatan',
    packageId: 'pkg-01',
    roomType: 'Double',
    bookingCode: 'BK-ALM-261001',
    status: 'Dokumen Siap',
    documents: {
      ktp: 'Valid',
      paspor: 'Valid',
      bukuNikah: 'Valid',
      vaksinMeningitis: 'Valid',
      visa: 'Issued'
    },
    notes: 'Suami dari Hj. Nurul Hidayati'
  },
  {
    id: 'jam-02',
    tenantId: 'tenant-almabrur',
    nik: '3174055507870002',
    namaLengkap: 'Hj. Nurul Hidayati',
    namaPaspor: 'NURUL HIDAYATI',
    noPaspor: 'C7829105',
    pasporExpiry: '2028-09-14',
    tempatLahir: 'Solo',
    tanggalLahir: '1987-07-15',
    gender: 'P',
    phone: '081288991123',
    alamat: 'Jl. Tebet Barat Dalam No. 18, Jakarta Selatan',
    kota: 'Jakarta Selatan',
    mahramName: 'H. Bambang Trihatmojo',
    mahramRelation: 'Suami',
    packageId: 'pkg-01',
    roomType: 'Double',
    bookingCode: 'BK-ALM-261001',
    status: 'Dokumen Siap',
    documents: {
      ktp: 'Valid',
      paspor: 'Valid',
      bukuNikah: 'Valid',
      vaksinMeningitis: 'Valid',
      visa: 'Issued'
    }
  },
  {
    id: 'jam-03',
    tenantId: 'tenant-almabrur',
    nik: '3275012401600001',
    namaLengkap: 'Drs. H. Mulyadi Kusuma',
    namaPaspor: 'MULYADI KUSUMA',
    noPaspor: 'B4412093',
    pasporExpiry: '2027-01-20', // passport alert < 6 months when booking or valid
    tempatLahir: 'Bandung',
    tanggalLahir: '1960-01-24',
    gender: 'L',
    phone: '081399008877',
    alamat: 'Komplek Harapan Indah Blok B3 No. 7, Bekasi',
    kota: 'Bekasi',
    packageId: 'pkg-01',
    roomType: 'Quad',
    bookingCode: 'BK-ALM-261002',
    status: 'Terdaftar',
    documents: {
      ktp: 'Valid',
      paspor: 'Review',
      bukuNikah: 'Tidak Perlu',
      vaksinMeningitis: 'Review',
      visa: 'Belum'
    },
    notes: 'Perlu pendampingan kursi roda saat Sa\'i'
  },
  {
    id: 'jam-04',
    tenantId: 'tenant-almabrur',
    nik: '3171026509920005',
    namaLengkap: 'Siti Sarah Wardani, S.Farm',
    namaPaspor: 'SITI SARAH WARDANI',
    noPaspor: 'A9918234',
    pasporExpiry: '2029-05-10',
    tempatLahir: 'Bogor',
    tanggalLahir: '1992-09-25',
    gender: 'P',
    phone: '081809091212',
    alamat: 'Jl. Radio Dalam No. 45, Kebayoran Baru',
    kota: 'Jakarta Selatan',
    packageId: 'pkg-01',
    roomType: 'Quad',
    bookingCode: 'BK-ALM-261003',
    status: 'Dokumen Siap',
    documents: {
      ktp: 'Valid',
      paspor: 'Valid',
      bukuNikah: 'Tidak Perlu',
      vaksinMeningitis: 'Valid',
      visa: 'Proses'
    }
  },
  {
    id: 'jam-05',
    tenantId: 'tenant-almabrur',
    nik: '3173091108780004',
    namaLengkap: 'Ir. Hendra Gunawan',
    namaPaspor: 'HENDRA GUNAWAN',
    noPaspor: 'C3319021',
    pasporExpiry: '2026-11-20', // EXPIRING SOON! < 6 months from departure
    tempatLahir: 'Semarang',
    tanggalLahir: '1978-08-11',
    gender: 'L',
    phone: '081122334455',
    alamat: 'Jl. Kemang Timur No. 12, Mampang',
    kota: 'Jakarta Selatan',
    packageId: 'pkg-02',
    roomType: 'Double',
    bookingCode: 'BK-ALM-261004',
    status: 'Terdaftar',
    documents: {
      ktp: 'Valid',
      paspor: 'Expired',
      bukuNikah: 'Valid',
      vaksinMeningitis: 'Belum',
      visa: 'Belum'
    },
    notes: 'PERINGATAN: Paspor habis masa berlaku November 2026! Wajib perpanjangan E-Paspor segera.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-01',
    bookingCode: 'BK-ALM-261001',
    tenantId: 'tenant-almabrur',
    packageId: 'pkg-01',
    jamaahId: 'jam-01',
    roomType: 'Double',
    totalPrice: 77000000, // 2 orang @ 38.5jt
    paidAmount: 77000000,
    remainingAmount: 0,
    bookingDate: '2026-09-10',
    status: 'Lunas',
    payments: []
  },
  {
    id: 'bk-02',
    bookingCode: 'BK-ALM-261002',
    tenantId: 'tenant-almabrur',
    packageId: 'pkg-01',
    jamaahId: 'jam-03',
    roomType: 'Quad',
    totalPrice: 32500000,
    paidAmount: 15000000,
    remainingAmount: 17500000,
    bookingDate: '2026-09-18',
    status: 'Angsuran Sebagian',
    payments: []
  },
  {
    id: 'bk-03',
    bookingCode: 'BK-ALM-261003',
    tenantId: 'tenant-almabrur',
    packageId: 'pkg-01',
    jamaahId: 'jam-04',
    roomType: 'Quad',
    totalPrice: 32500000,
    paidAmount: 10000000,
    remainingAmount: 22500000,
    bookingDate: '2026-09-22',
    status: 'DP Dibayar',
    payments: []
  },
  {
    id: 'bk-04',
    bookingCode: 'BK-ALM-261004',
    tenantId: 'tenant-almabrur',
    packageId: 'pkg-02',
    jamaahId: 'jam-05',
    roomType: 'Double',
    totalPrice: 108000000,
    paidAmount: 20000000,
    remainingAmount: 88000000,
    bookingDate: '2026-10-01',
    status: 'DP Dibayar',
    payments: []
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-01',
    tenantId: 'tenant-almabrur',
    bookingCode: 'BK-ALM-261001',
    receiptNumber: 'KW-ALM-2609-0089',
    jamaahName: 'H. Bambang Trihatmojo & Istri',
    packageTitle: 'Umrah Reguler Barokah 9 Hari',
    amount: 20000000,
    paymentType: 'DP',
    paymentMethod: 'Bank Transfer (BSI)',
    date: '2026-09-10 10:15',
    status: 'Verified',
    receivedBy: 'Fatimah Az-Zahra (Kasir)'
  },
  {
    id: 'pay-02',
    tenantId: 'tenant-almabrur',
    bookingCode: 'BK-ALM-261001',
    receiptNumber: 'KW-ALM-2609-0142',
    jamaahName: 'H. Bambang Trihatmojo & Istri',
    packageTitle: 'Umrah Reguler Barokah 9 Hari',
    amount: 57000000,
    paymentType: 'Pelunasan',
    paymentMethod: 'Bank Transfer (BSI)',
    date: '2026-09-28 14:30',
    status: 'Verified',
    receivedBy: 'Fatimah Az-Zahra (Kasir)'
  },
  {
    id: 'pay-03',
    tenantId: 'tenant-almabrur',
    bookingCode: 'BK-ALM-261002',
    receiptNumber: 'KW-ALM-2609-0118',
    jamaahName: 'Drs. H. Mulyadi Kusuma',
    packageTitle: 'Umrah Reguler Barokah 9 Hari',
    amount: 5000000,
    paymentType: 'DP',
    paymentMethod: 'BCA VA',
    date: '2026-09-18 09:40',
    status: 'Verified',
    receivedBy: 'Auto-Gateway Xendit'
  },
  {
    id: 'pay-04',
    tenantId: 'tenant-almabrur',
    bookingCode: 'BK-ALM-261002',
    receiptNumber: 'KW-ALM-2610-0012',
    jamaahName: 'Drs. H. Mulyadi Kusuma',
    packageTitle: 'Umrah Reguler Barokah 9 Hari',
    amount: 10000000,
    paymentType: 'Cicilan 1',
    paymentMethod: 'Bank Transfer (BSI)',
    date: '2026-10-05 11:20',
    status: 'Verified',
    receivedBy: 'Fatimah Az-Zahra (Kasir)'
  },
  {
    id: 'pay-05',
    tenantId: 'tenant-almabrur',
    bookingCode: 'BK-ALM-261003',
    receiptNumber: 'KW-ALM-2609-0130',
    jamaahName: 'Siti Sarah Wardani, S.Farm',
    packageTitle: 'Umrah Reguler Barokah 9 Hari',
    amount: 10000000,
    paymentType: 'DP',
    paymentMethod: 'QRIS',
    date: '2026-09-22 16:05',
    status: 'Verified',
    receivedBy: 'Auto-Gateway Midtrans'
  },
  {
    id: 'pay-06',
    tenantId: 'tenant-almabrur',
    bookingCode: 'BK-ALM-261004',
    receiptNumber: 'KW-ALM-2610-0005',
    jamaahName: 'Ir. Hendra Gunawan',
    packageTitle: 'Umrah VIP Awal Ramadhan 12 Hari',
    amount: 20000000,
    paymentType: 'DP',
    paymentMethod: 'Bank Mandiri',
    date: '2026-10-01 13:10',
    status: 'Verified',
    receivedBy: 'Fatimah Az-Zahra (Kasir)'
  }
];

export const INITIAL_COA: ChartOfAccount[] = [
  // Aktiva
  { code: '1-1100', name: 'Kas Kantor Utama', category: 'Aktiva Lancar', balance: 45000000, normalBalance: 'Debit', isDefault: true },
  { code: '1-1110', name: 'Bank Syariah Indonesia (BSI Giro Operasional)', category: 'Aktiva Lancar', balance: 1420500000, normalBalance: 'Debit', isDefault: true },
  { code: '1-1120', name: 'Bank Mandiri Giro Escrow Jamaah', category: 'Aktiva Lancar', balance: 890000000, normalBalance: 'Debit', isDefault: true },
  { code: '1-1200', name: 'Piutang Pelunasan Jamaah', category: 'Aktiva Lancar', balance: 128000000, normalBalance: 'Debit', isDefault: true },
  { code: '1-1300', name: 'Uang Muka Hotel Saudi (Makkah & Madinah)', category: 'Aktiva Lancar', balance: 650000000, normalBalance: 'Debit', isDefault: true },
  { code: '1-1310', name: 'Uang Muka Tiket Maskapai (Garuda / Saudia)', category: 'Aktiva Lancar', balance: 520000000, normalBalance: 'Debit', isDefault: true },
  { code: '1-1400', name: 'Persediaan Perlengkapan Jamaah', category: 'Aktiva Lancar', balance: 94500000, normalBalance: 'Debit', isDefault: true },
  { code: '1-2100', name: 'Inventaris & Peralatan Kantor', category: 'Aktiva Tetap', balance: 185000000, normalBalance: 'Debit', isDefault: true },
  
  // Kewajiban
  { code: '2-1100', name: 'Hutang Vendor Land Arrangement (LA Saudi)', category: 'Kewajiban', balance: 240000000, normalBalance: 'Kredit', isDefault: true },
  { code: '2-1200', name: 'Pendapatan Diterima Dimuka (DP Jamaah)', category: 'Kewajiban', balance: 485000000, normalBalance: 'Kredit', isDefault: true },
  { code: '2-1300', name: 'Hutang Komisi Mitra Agen', category: 'Kewajiban', balance: 35000000, normalBalance: 'Kredit', isDefault: true },

  // Modal
  { code: '3-1000', name: 'Modal Disetor Pemegang Saham', category: 'Modal', balance: 1500000000, normalBalance: 'Kredit', isDefault: true },
  { code: '3-2000', name: 'Laba Ditahan (Retained Earnings)', category: 'Modal', balance: 798000000, normalBalance: 'Kredit', isDefault: true },
  { code: '3-3000', name: 'Laba Tahun Berjalan', category: 'Modal', balance: 370000000, normalBalance: 'Kredit', isDefault: true },

  // Pendapatan
  { code: '4-1000', name: 'Pendapatan Paket Umrah Reguler', category: 'Pendapatan', balance: 1235000000, normalBalance: 'Kredit', isDefault: true },
  { code: '4-1100', name: 'Pendapatan Paket Umrah VIP', category: 'Pendapatan', balance: 640000000, normalBalance: 'Kredit', isDefault: true },
  { code: '4-1200', name: 'Pendapatan Paket Haji Khusus / Furoda', category: 'Pendapatan', balance: 855000000, normalBalance: 'Kredit', isDefault: true },
  { code: '4-2000', name: 'Pendapatan Pengurusan Visa & Asuransi', category: 'Pendapatan', balance: 52000000, normalBalance: 'Kredit', isDefault: true },

  // HPP / Biaya Pokok Kloter
  { code: '5-1000', name: 'Beban Tiket Pesawat Internasional', category: 'Beban Pokok (HPP)', balance: 890000000, normalBalance: 'Debit', isDefault: true },
  { code: '5-2000', name: 'Beban Land Arrangement & Hotel Saudi', category: 'Beban Pokok (HPP)', balance: 945000000, normalBalance: 'Debit', isDefault: true },
  { code: '5-3000', name: 'Beban Visa Muassasah & Kemenag', category: 'Beban Pokok (HPP)', balance: 125000000, normalBalance: 'Debit', isDefault: true },
  { code: '5-4000', name: 'Beban Perlengkapan Jamaah & Koper', category: 'Beban Pokok (HPP)', balance: 85000000, normalBalance: 'Debit', isDefault: true },
  { code: '5-5000', name: 'Beban Honor Muthawwif & Tour Leader', category: 'Beban Pokok (HPP)', balance: 62000000, normalBalance: 'Debit', isDefault: true },

  // Beban Operasional
  { code: '6-1000', name: 'Beban Gaji & Tunjangan Karyawan', category: 'Beban Operasional', balance: 145000000, normalBalance: 'Debit', isDefault: true },
  { code: '6-2000', name: 'Beban Komisi Penjualan Agen', category: 'Beban Operasional', balance: 48000000, normalBalance: 'Debit', isDefault: true },
  { code: '6-3000', name: 'Beban Pemasaran Digital & Manasik', category: 'Beban Operasional', balance: 32000000, normalBalance: 'Debit', isDefault: true },
  { code: '6-4000', name: 'Beban Sewa Kantor & Utilitas', category: 'Beban Operasional', balance: 25000000, normalBalance: 'Debit', isDefault: true }
];

export const INITIAL_JOURNALS: JournalEntry[] = [
  {
    id: 'jrn-01',
    tenantId: 'tenant-almabrur',
    referenceNo: 'JV-ALM-260901',
    date: '2026-09-10',
    description: 'Penerimaan DP Umrah Reguler Jamaah Bambang Trihatmojo (KW-ALM-2609-0089)',
    kloterCode: 'KL-ALM-2611A',
    isAutoGenerated: true,
    lines: [
      { accountCode: '1-1110', accountName: 'BSI Giro Operasional', debit: 20000000, credit: 0 },
      { accountCode: '2-1200', accountName: 'Pendapatan Diterima Dimuka (DP Jamaah)', debit: 0, credit: 20000000 }
    ]
  },
  {
    id: 'jrn-02',
    tenantId: 'tenant-almabrur',
    referenceNo: 'JV-ALM-260902',
    date: '2026-09-28',
    description: 'Pelunasan Umrah Reguler Bambang Trihatmojo & Pengakuan Pendapatan Paket',
    kloterCode: 'KL-ALM-2611A',
    isAutoGenerated: true,
    lines: [
      { accountCode: '1-1110', accountName: 'BSI Giro Operasional', debit: 57000000, credit: 0 },
      { accountCode: '2-1200', accountName: 'Pendapatan Diterima Dimuka', debit: 20000000, credit: 0 },
      { accountCode: '4-1000', accountName: 'Pendapatan Paket Umrah Reguler', debit: 0, credit: 77000000 }
    ]
  },
  {
    id: 'jrn-03',
    tenantId: 'tenant-almabrur',
    referenceNo: 'JV-ALM-261001',
    date: '2026-10-02',
    description: 'Pembayaran DP Tiket Pesawat 45 Seat Garuda Indonesia Kloter KL-ALM-2611A',
    kloterCode: 'KL-ALM-2611A',
    isAutoGenerated: false,
    lines: [
      { accountCode: '1-1310', accountName: 'Uang Muka Tiket Maskapai', debit: 250000000, credit: 0 },
      { accountCode: '1-1110', accountName: 'BSI Giro Operasional', debit: 0, credit: 250000000 }
    ]
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    tenantId: 'tenant-almabrur',
    sku: 'KPR-FIB-24',
    name: 'Koper Fiber Spinner 24 Inch (Branded Al-Mabrur)',
    category: 'Perlengkapan Utama',
    unit: 'Pcs',
    stockPusat: 120,
    stockBandara: 45,
    stockCabang: 25,
    unitCost: 385000,
    minThreshold: 30
  },
  {
    id: 'inv-02',
    tenantId: 'tenant-almabrur',
    sku: 'IHR-KAT-01',
    name: 'Kain Ihram Pria Katun Jacquard Tebal 1200gr',
    category: 'Pakaian Ibadah',
    unit: 'Set (2 Helai)',
    stockPusat: 210,
    stockBandara: 50,
    stockCabang: 40,
    unitCost: 145000,
    minThreshold: 40
  },
  {
    id: 'inv-03',
    tenantId: 'tenant-almabrur',
    sku: 'MUK-SLK-01',
    name: 'Mukena Silk Premium Bordir Kerancang + Sajadah Muka',
    category: 'Pakaian Ibadah',
    unit: 'Set',
    stockPusat: 180,
    stockBandara: 35,
    stockCabang: 30,
    unitCost: 195000,
    minThreshold: 35
  },
  {
    id: 'inv-04',
    tenantId: 'tenant-almabrur',
    sku: 'TAS-PSP-02',
    name: 'Tas Paspor Anti-Theft + Tali Leher RFID Blocker',
    category: 'Aksesoris',
    unit: 'Pcs',
    stockPusat: 350,
    stockBandara: 80,
    stockCabang: 60,
    unitCost: 45000,
    minThreshold: 50
  },
  {
    id: 'inv-05',
    tenantId: 'tenant-almabrur',
    sku: 'BK-DOA-01',
    name: 'Buku Saku Panduan Doa & Manasik Sesuai Sunnah',
    category: 'Buku Panduan',
    unit: 'Buku',
    stockPusat: 420,
    stockBandara: 100,
    stockCabang: 80,
    unitCost: 25000,
    minThreshold: 60
  },
  {
    id: 'inv-06',
    tenantId: 'tenant-almabrur',
    sku: 'SRG-BAT-01',
    name: 'Bahan Kain Batik Seragam Resmi Biro (2.5 Meter)',
    category: 'Pakaian Ibadah',
    unit: 'Potong',
    stockPusat: 280,
    stockBandara: 20,
    stockCabang: 45,
    unitCost: 95000,
    minThreshold: 50
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-01',
    tenantId: 'tenant-almabrur',
    name: 'dr. H. Rahmat Hidayat, Sp.A',
    phone: '081290887766',
    city: 'Jakarta Selatan',
    interestedPackage: 'Umrah VIP Awal Ramadhan 12 Hari',
    source: 'Website Form',
    stage: 'Kirim Penawaran',
    notes: 'Rencana mendaftar untuk 4 orang sekeluarga (kamar Quad/Double)',
    assignedTo: 'Sales Konsultan: Amanda Putri',
    updatedAt: '2026-10-12'
  },
  {
    id: 'lead-02',
    tenantId: 'tenant-almabrur',
    name: 'Ibu Hj. Ratna Juwita',
    phone: '081344556677',
    city: 'Tangerang Selatan',
    interestedPackage: 'Haji Khusus Furoda 2027',
    source: 'Instagram Ad',
    stage: 'Follow Up',
    notes: 'Menanyakan kepastian visa mujamalah dan skema cicilan DP',
    assignedTo: 'Sales Konsultan: Amanda Putri',
    updatedAt: '2026-10-13'
  },
  {
    id: 'lead-03',
    tenantId: 'tenant-almabrur',
    name: 'Keluarga Bpk. Teguh Wibowo',
    phone: '081722334411',
    city: 'Bekasi',
    interestedPackage: 'Umrah Reguler Barokah 9 Hari',
    source: 'Mitra Agen',
    stage: 'Booking DP',
    notes: 'Sudah transfer DP Rp 10 Juta via agen Ust. Salman',
    assignedTo: 'Agen: Ustadz Salman Al-Farisi',
    updatedAt: '2026-10-11'
  }
];

export const INITIAL_BROADCASTS: BroadcastLog[] = [
  {
    id: 'bc-01',
    tenantId: 'tenant-almabrur',
    channel: 'WhatsApp',
    title: 'Reminder Pelunasan Kloter KL-ALM-2611A (Batas H-30)',
    recipientGroup: 'Jamaah Kloter 15 Nov 2026',
    recipientCount: 38,
    sentAt: '2026-10-10 09:30',
    status: 'Delivered',
    messagePreview: 'Assalamu\'alaikum Wr. Wb. Bpk/Ibu {{nama_jamaah}}, mengingatkan batas akhir pelunasan paket {{nama_paket}} adalah 15 Oktober 2026...'
  },
  {
    id: 'bc-02',
    tenantId: 'tenant-almabrur',
    channel: 'WhatsApp',
    title: 'Undangan Manasik Akbar 1 di Hotel Bidakara Jakarta',
    recipientGroup: 'Seluruh Jamaah Keberangkatan Nov-Des 2026',
    recipientCount: 82,
    sentAt: '2026-10-05 14:00',
    status: 'Delivered',
    messagePreview: 'Yth. Calon Jamaah Baitullah, kami mengundang Bpk/Ibu dalam Pelatihan Manasik Akbar Teori & Praktik Thawaf/Sa\'i pada hari Sabtu, 24 Oktober...'
  },
  {
    id: 'bc-03',
    tenantId: 'tenant-almabrur',
    channel: 'Email',
    title: 'E-Manifest & Itinerary Perjalanan Resmi Kloter November',
    recipientGroup: 'Jamaah Terverifikasi Dokumen',
    recipientCount: 45,
    sentAt: '2026-10-02 11:15',
    status: 'Delivered',
    messagePreview: 'Terlampir E-Ticket Garuda Indonesia, Rooming List Hotel Makkah/Madinah, serta kontak Muthawwif pembimbing...'
  }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agt-01',
    tenantId: 'tenant-almabrur',
    name: 'Ustadz Salman Al-Farisi, S.Pd.I',
    code: 'AG-JKT-001',
    level: 'Master Distributor',
    phone: '081199887711',
    city: 'Jakarta Timur',
    referralCount: 42,
    totalCommission: 63000000,
    paidCommission: 52500000,
    pendingCommission: 10500000
  },
  {
    id: 'agt-02',
    tenantId: 'tenant-almabrur',
    name: 'Hj. Mardhiah Sukamto',
    code: 'AG-BKS-014',
    level: 'Gold',
    phone: '081233445588',
    city: 'Bekasi Barat',
    referralCount: 24,
    totalCommission: 36000000,
    paidCommission: 30000000,
    pendingCommission: 6000000,
    sponsorAgentId: 'agt-01'
  },
  {
    id: 'agt-03',
    tenantId: 'tenant-almabrur',
    name: 'Bpk. Hendro Subagio',
    code: 'AG-TNG-022',
    level: 'Silver',
    phone: '081388776655',
    city: 'Tangerang',
    referralCount: 11,
    totalCommission: 16500000,
    paidCommission: 13500000,
    pendingCommission: 3000000,
    sponsorAgentId: 'agt-01'
  }
];
