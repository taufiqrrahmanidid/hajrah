import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkline } from '../common/Sparkline';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  AlertTriangle, 
  Plane, 
  Calendar, 
  Clock, 
  ArrowRight,
  Building,
  BedDouble,
  FileText,
  BadgePercent,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Filter,
  Plus,
  ArrowUpRight,
  Download,
  Star
} from 'lucide-react';

export const DashboardModule: React.FC<{
  onOpenRegisterJamaah: () => void;
  onOpenNewPackage: () => void;
  onOpenPaymentModal: () => void;
}> = ({ onOpenRegisterJamaah, onOpenNewPackage, onOpenPaymentModal }) => {
  const { 
    currentTenant, 
    packages, 
    jamaahList, 
    bookings, 
    payments, 
    formatIdr, 
    setCurrentView 
  } = useApp();

  const [dateFilterOpen, setDateFilterOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState('Bulan Ini (Okt 2026)');

  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalCollectedCash = payments.filter(p => p.status === 'Verified').reduce((sum, p) => sum + p.amount, 0);
  const totalReceivables = bookings.reduce((sum, b) => sum + b.remainingAmount, 0);

  // Passport alert check (< 6 months from today)
  const passportAlerts = jamaahList.filter(j => {
    if (!j.pasporExpiry) return false;
    const expiryDate = new Date(j.pasporExpiry);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    return expiryDate <= sixMonthsFromNow || j.documents.paspor === 'Expired';
  });

  // Calculate document readiness metrics
  const validPassports = jamaahList.filter(j => j.documents.paspor === 'Valid').length;
  const issuedVisas = jamaahList.filter(j => j.documents.visa === 'Issued').length;
  const vaccinated = jamaahList.filter(j => j.documents.vaksinMeningitis === 'Valid').length;

  // Mock trend data for Cruip Sparklines
  const sparklineRevenue = [420000000, 480000000, 530000000, 610000000, 590000000, 720000000, totalRevenue || 750000000];
  const sparklineCash = [280000000, 310000000, 390000000, 420000000, 460000000, 510000000, totalCollectedCash || 540000000];
  const sparklineJamaah = [18, 22, 29, 35, 38, 44, jamaahList.length || 52];
  const sparklineReceivables = [210000000, 195000000, 180000000, 160000000, 150000000, 140000000, totalReceivables || 135000000];

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Cruip Mosaic Page Header with Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{currentTenant.companyName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{currentTenant.branding.ppiuNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight mt-1">
            Dashboard Eksekutif
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Ringkasan performa operasional biro, jadwal keberangkatan kloter, dan arus kas SAK ETAP.
          </p>
        </div>

        {/* Action Buttons Toolbar (Cruip Mosaic Style in Neutral Zinc) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Picker Button */}
          <div className="relative">
            <button
              onClick={() => setDateFilterOpen(!dateFilterOpen)}
              className="btn bg-white dark:bg-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-750 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-750 text-xs px-3 py-2 rounded-lg gap-2 shadow-2xs"
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              <span>{selectedRange}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>
            {dateFilterOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-1.5 z-40 text-xs">
                {['Hari Ini', 'Minggu Ini', 'Bulan Ini (Okt 2026)', 'Kuartal 4 2026', 'Tahun 1448 H'].map(range => (
                  <button
                    key={range}
                    onClick={() => {
                      setSelectedRange(range);
                      setDateFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg transition ${
                      selectedRange === range 
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold' 
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Primary Actions */}
          <button
            onClick={onOpenRegisterJamaah}
            className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs px-3.5 py-2 rounded-lg gap-1.5 shadow-xs font-semibold transition"
          >
            <Plus className="w-4 h-4" />
            <span>Daftarkan Jamaah</span>
          </button>

          <button
            onClick={onOpenPaymentModal}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3.5 py-2 rounded-lg gap-1.5 shadow-xs font-semibold transition"
          >
            <Wallet className="w-4 h-4" />
            <span>Kasir</span>
          </button>

          <button
            onClick={onOpenNewPackage}
            className="btn bg-white dark:bg-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-750 text-xs px-3 py-2 rounded-lg gap-1.5 shadow-2xs transition"
          >
            <Plane className="w-4 h-4 text-zinc-400" />
            <span>Paket Baru</span>
          </button>
        </div>
      </div>

      {/* Critical Passport Compliance Warning Callout */}
      {passportAlerts.length > 0 && (
        <div className="bg-amber-500/10 dark:bg-amber-950/25 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3.5 shadow-xs">
          <div className="p-2 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 text-sm">
                Peringatan Dokumen: {passportAlerts.length} Paspor Jamaah Mendekati Masa Kadaluarsa
              </h3>
              <button 
                onClick={() => setCurrentView('jamaah')}
                className="text-amber-700 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1 transition"
              >
                <span>Buka Manifes Jamaah</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-amber-800/80 dark:text-amber-300/80 mt-1">
              Ketentuan Kemenag &amp; Imigrasi Arab Saudi mensyaratkan masa berlaku paspor minimal 6 bulan sebelum tanggal kepulangan. Segera ajukan perpanjangan paspor atau konfirmasi kepada jamaah bersangkutan.
            </p>
          </div>
        </div>
      )}

      {/* Cruip Mosaic Metric Cards (01, 02, 03, 04) with Real SVG Sparklines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Omzet */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Total Nilai Transaksi (Omzet)
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {formatIdr(totalRevenue)}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Dari {bookings.length} akad pemesanan
            </span>
            <Sparkline data={sparklineRevenue} color="emerald" width={100} height={32} />
          </div>
        </div>

        {/* Card 2: Kas Terkumpul */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Terverifikasi
            </span>
          </div>
          <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Kas &amp; Bank Masuk
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {formatIdr(totalCollectedCash)}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {((totalCollectedCash / (totalRevenue || 1)) * 100).toFixed(0)}% dari total omzet
            </span>
            <Sparkline data={sparklineCash} color="indigo" width={100} height={32} />
          </div>
        </div>

        {/* Card 3: Total Jamaah */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-full">
              {jamaahList.length} Jiwa
            </span>
          </div>
          <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Total Jamaah Terdaftar
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {jamaahList.length} <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">Jamaah</span>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Di {packages.length} kloter aktif
            </span>
            <Sparkline data={sparklineJamaah} color="sky" width={100} height={32} />
          </div>
        </div>

        {/* Card 4: Sisa Piutang */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              Sisa Termin
            </span>
          </div>
          <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
            Sisa Piutang Jamaah
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {formatIdr(totalReceivables)}
          </div>
          <div className="mt-4 flex items-end justify-between">
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Pelunasan H-30 kloter
            </span>
            <Sparkline data={sparklineReceivables} color="amber" width={100} height={32} />
          </div>
        </div>

      </div>

      {/* Cruip Section: Operational Gauges & Kloter Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Upcoming Kloters Status */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plane className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <span>Jadwal Keberangkatan Kloter Terdekat</span>
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Monitoring ketersediaan seat, maskapai, dan hotel Makkah/Madinah
              </p>
            </div>
            <button
              onClick={() => setCurrentView('packages')}
              className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition"
            >
              <span>Semua Paket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {packages.map((pkg) => {
              const occupancy = Math.round((pkg.bookedSeats / pkg.totalSeats) * 100);
              return (
                <div 
                  key={pkg.id} 
                  className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-750 hover:border-zinc-300 dark:hover:border-zinc-650 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 dark:text-white">{pkg.title}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded font-mono font-semibold bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                        {pkg.kloterCode}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded font-medium bg-zinc-150 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300">
                        {pkg.durationDays} Hari
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{pkg.departureDate}</span>
                      </div>
                      <span>•</span>
                      <span>{pkg.airline}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-amber-500" />
                        <span>{pkg.makkahHotel} ({pkg.makkahHotelStars}★)</span>
                      </div>
                    </div>
                  </div>

                  {/* Seat Occupancy Meter */}
                  <div className="sm:w-48 shrink-0">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">Keterisian Seat</span>
                      <span className="font-semibold text-zinc-800 dark:text-zinc-200 font-mono text-[11px]">
                        {pkg.bookedSeats} / {pkg.totalSeats} ({occupancy}%)
                      </span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-750 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          occupancy >= 90 ? 'bg-rose-500' : occupancy >= 70 ? 'bg-zinc-700 dark:bg-zinc-300' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occupancy}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                      Sisa: <span className="font-semibold text-zinc-700 dark:text-zinc-300">{pkg.totalSeats - pkg.bookedSeats} seat kosong</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Siskopatuh & Document Readiness Gauge */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Kesiapan Manifes SISKOPATUH</span>
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
              Standar kelengkapan dokumen sesuai regulasi Kemenag RI &amp; Muassasah Saudi.
            </p>

            <div className="space-y-3.5">
              {/* Paspor Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Paspor Terverifikasi</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">{validPassports} / {jamaahList.length}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-750 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(validPassports / (jamaahList.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Visa Progress */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Visa Umrah Terbit</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">{issuedVisas} / {jamaahList.length}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-750 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-500 rounded-full"
                    style={{ width: `${(issuedVisas / (jamaahList.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Meningitis Vaccine */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium">Vaksin Meningitis</span>
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">{vaccinated} / {jamaahList.length}</span>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-750 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-zinc-600 dark:bg-zinc-400 rounded-full"
                    style={{ width: `${(vaccinated / (jamaahList.length || 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-750 mt-6">
            <button
              onClick={() => setCurrentView('jamaah')}
              className="w-full btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs py-2.5 rounded-lg font-medium transition"
            >
              Kelola Dokumen Manifes
            </button>
          </div>
        </div>

      </div>

      {/* Cruip Section: Recent Transactions & Kuitansi Masuk (Cruip Table Pattern) */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Transaksi Pembayaran Terakhir</span>
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Catatan kasir, kuitansi digital, dan sinkronisasi jurnal otomatis SAK ETAP
            </p>
          </div>
          <button
            onClick={() => setCurrentView('payments')}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition"
          >
            <span>Buka Modul Kasir</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-5 py-3">No. Kuitansi</th>
                <th className="px-5 py-3">Jamaah / Kode Booking</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Metode Bayar</th>
                <th className="px-5 py-3 text-right">Nominal</th>
                <th className="px-5 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {payments.slice(0, 5).map(pay => {
                return (
                  <tr key={pay.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition">
                    <td className="px-5 py-3.5 font-mono text-zinc-900 dark:text-zinc-200 font-semibold">
                      {pay.receiptNumber}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-zinc-900 dark:text-white">{pay.jamaahName}</div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{pay.bookingCode}</div>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300 font-mono">
                      {pay.date}
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">{pay.paymentMethod}</span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono block">{pay.paymentType}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {formatIdr(pay.amount)}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        pay.status === 'Verified'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        {pay.status === 'Verified' ? 'Terverifikasi' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
