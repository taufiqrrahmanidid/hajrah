import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Phone, 
  Mail, 
  ArrowRight,
  UserCheck,
  Check,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { TravelPackage, RoomType } from '../../types';

export const PublicB2CModule: React.FC = () => {
  const { currentTenant, packages, addJamaah, formatIdr, setCurrentView, theme, toggleTheme } = useApp();
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType>('Quad');
  
  // Registration Form State
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [noPaspor, setNoPaspor] = useState('');
  const [pasporExpiry, setPasporExpiry] = useState('2028-12-31');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [mahramName, setMahramName] = useState('');
  const [mahramRelation, setMahramRelation] = useState('');
  const [dpAmount, setDpAmount] = useState<number>(5000000);
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer (BSI)' | 'BCA VA' | 'QRIS'>('Bank Transfer (BSI)');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleOpenBooking = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setSelectedRoomType('Quad');
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !namaLengkap || !noPaspor) return;

    addJamaah({
      nik: nik || '3174000000000001',
      namaLengkap,
      noPaspor,
      pasporExpiry: pasporExpiry || '2028-12-31',
      tempatLahir: 'Jakarta',
      tanggalLahir: '1985-05-15',
      gender,
      phone: phone || '081200000000',
      alamat: 'Indonesia',
      kota: 'Jakarta',
      mahramName: mahramName || undefined,
      mahramRelation: mahramRelation || undefined,
      packageId: selectedPackage.id,
      roomType: selectedRoomType,
      bookingCode: '',
      status: 'Terdaftar',
      documents: {
        ktp: 'Valid',
        paspor: 'Review',
        bukuNikah: 'Tidak Perlu',
        vaksinMeningitis: 'Review',
        visa: 'Belum'
      }
    }, {
      roomType: selectedRoomType,
      dpAmount,
      paymentMethod
    });

    setBookingSuccess(`Pendaftaran untuk ${namaLengkap} berhasil. Data telah masuk ke sistem biro & bukti kuitansi DP telah diterbitkan.`);
    setSelectedPackage(null);
    setNamaLengkap('');
    setNik('');
    setNoPaspor('');
    setPhone('');
    setMahramName('');
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl transition-colors font-sans">
      
      {/* Top Tenant Subdomain Bar */}
      <div className="bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-mono text-[11px]">
          <span>https://{currentTenant.subdomain}.hajrah.id</span>
          <span aria-hidden="true">·</span>
          <span>Website Resmi Calon Jamaah</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1 rounded text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            title="Ganti Tema"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-medium flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Kembali ke ERP Biro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Website Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-4 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-sm"
              style={{ backgroundColor: currentTenant.branding.primaryColor }}
            >
              <span className="font-arabic">ح</span>
            </div>
            <div>
              <h1 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">{currentTenant.companyName}</h1>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{currentTenant.branding.ppiuNumber}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              <span>{currentTenant.branding.phone}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{currentTenant.branding.email}</span>
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-14 px-6 text-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
            Pendaftaran Musim Haji &amp; Umrah 1448 H
          </p>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Perjalanan Ibadah Bersama {currentTenant.name}
          </h2>
          
          <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            {currentTenant.branding.tagline}. Fasilitas hotel ring 1 dekat pelataran masjid, bimbingan ibadah intensif sesuai sunnah, dan kepastian tiket penerbangan direct flight.
          </p>
        </div>
      </section>

      {/* Success Notification */}
      {bookingSuccess && (
        <div className="max-w-4xl mx-auto px-6 mt-6">
          <div className="bg-emerald-50 dark:bg-zinc-900 border border-emerald-500/50 p-4 rounded-xl text-xs flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">Pendaftaran Diterima</h4>
              <p className="text-zinc-700 dark:text-zinc-300 mt-0.5">{bookingSuccess}</p>
            </div>
          </div>
        </div>
      )}

      {/* Catalog of Packages */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Pilihan Paket Keberangkatan</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Pilih paket perjalanan dan jenis kamar hotel sesuai rencana keluarga Anda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => {
            const remainingSeats = pkg.totalSeats - pkg.bookedSeats;

            return (
              <div 
                key={pkg.id}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                      {pkg.category}
                    </span>
                    <span className="font-mono text-zinc-600 dark:text-zinc-400">
                      {pkg.durationDays} Hari
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">{pkg.title}</h4>
                  
                  {/* Airline & Date */}
                  <div className="mt-3 py-2 border-y border-zinc-150 dark:border-zinc-800 space-y-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Plane className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="truncate">{pkg.airline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="font-mono">Berangkat: {pkg.departureDate}</span>
                    </div>
                  </div>

                  {/* Hotels */}
                  <div className="mt-3 space-y-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span className="truncate max-w-[190px]">Makkah: {pkg.makkahHotel}</span>
                      <div className="flex text-amber-500">
                        {[...Array(pkg.makkahHotelStars)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="truncate max-w-[190px]">Madinah: {pkg.madinahHotel}</span>
                      <div className="flex text-amber-500">
                        {[...Array(pkg.madinahHotelStars)].map((_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Tiers */}
                  <div className="mt-4 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-1 text-xs">
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-semibold block mb-1">Pilihan Kamar:</span>
                    {pkg.tiers.map(t => (
                      <div key={t.type} className="flex justify-between items-center text-zinc-800 dark:text-zinc-300">
                        <span>{t.type} (Sekamar {t.type === 'Double' ? 'Ber-2' : t.type === 'Triple' ? 'Ber-3' : 'Ber-4'}):</span>
                        <span className="font-bold text-zinc-900 dark:text-white font-mono tabular-nums">{formatIdr(t.priceIdr).replace(',00', '')}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>Sisa Kuota: <strong className="text-zinc-900 dark:text-white font-mono">{remainingSeats}</strong> kursi</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersedia</span>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => handleOpenBooking(pkg)}
                  className="w-full mt-4 py-2.5 rounded-lg font-semibold text-xs text-white transition flex items-center justify-center gap-1.5 shadow-sm"
                  style={{ backgroundColor: currentTenant.branding.primaryColor }}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Daftar / Pilih Kamar</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Online Booking Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Formulir Pendaftaran Jamaah</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{selectedPackage.title}</p>
              </div>
              <button
                onClick={() => setSelectedPackage(null)}
                className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitBooking} className="p-5 overflow-y-auto space-y-4 text-xs">
              
              {/* Room Tier Selector */}
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 font-medium block mb-1.5">Pilih Tipe Kamar:</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedPackage.tiers.map(tier => (
                    <button
                      type="button"
                      key={tier.type}
                      onClick={() => setSelectedRoomType(tier.type)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        selectedRoomType === tier.type
                          ? 'bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-2xs'
                          : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <span className="block text-xs">{tier.type}</span>
                      <span className="block text-[11px] font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {formatIdr(tier.priceIdr).replace(',00', '')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Nama Lengkap (Sesuai KTP):</label>
                  <input
                    type="text"
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    placeholder="Contoh: H. Ahmad Subagio"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Nomor WhatsApp Aktif:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Jenis Kelamin:</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as any)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    >
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Nomor Paspor:</label>
                    <input
                      type="text"
                      value={noPaspor}
                      onChange={(e) => setNoPaspor(e.target.value.toUpperCase())}
                      placeholder="Contoh: C8920194"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono uppercase placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Masa Berlaku Paspor:</label>
                    <input
                      type="date"
                      value={pasporExpiry}
                      onChange={(e) => setPasporExpiry(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Nama Mahram (Opsional):</label>
                  <input
                    type="text"
                    value={mahramName}
                    onChange={(e) => setMahramName(e.target.value)}
                    placeholder="Nama suami / ayah / saudara kandung"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-zinc-500 dark:text-zinc-400">Total Biaya ({selectedRoomType}):</span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm font-mono tabular-nums">
                    {formatIdr(
                      selectedPackage.tiers.find(t => t.type === selectedRoomType)?.priceIdr || 30000000
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Komitmen Pembayaran:</label>
                    <select
                      value={dpAmount}
                      onChange={(e) => setDpAmount(Number(e.target.value))}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    >
                      <option value={5000000}>DP Minimal Rp 5.000.000</option>
                      <option value={10000000}>DP Rp 10.000.000</option>
                      <option value={selectedPackage.tiers.find(t => t.type === selectedRoomType)?.priceIdr || 30000000}>
                        Pelunasan 100%
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-zinc-700 dark:text-zinc-300 block mb-1">Kanal Pembayaran:</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    >
                      <option value="Bank Transfer (BSI)">Bank Syariah Indonesia (BSI)</option>
                      <option value="BCA VA">BCA Virtual Account</option>
                      <option value="QRIS">QRIS</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium flex items-center gap-1.5 transition shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Kirim Pendaftaran</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
