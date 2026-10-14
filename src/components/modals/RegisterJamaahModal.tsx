import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Check, X } from 'lucide-react';
import { RoomType } from '../../types';

export const RegisterJamaahModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  defaultPackageId?: string;
}> = ({ isOpen, onClose, defaultPackageId }) => {
  const { packages, addJamaah, formatIdr } = useApp();

  const [namaLengkap, setNamaLengkap] = useState('');
  const [namaPaspor, setNamaPaspor] = useState('');
  const [nik, setNik] = useState('');
  const [noPaspor, setNoPaspor] = useState('');
  const [pasporExpiry, setPasporExpiry] = useState('2028-11-20');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [kota, setKota] = useState('Jakarta Selatan');
  const [alamat, setAlamat] = useState('');
  const [mahramName, setMahramName] = useState('');
  const [mahramRelation, setMahramRelation] = useState('');
  const [selectedPkgId, setSelectedPkgId] = useState(defaultPackageId || packages[0]?.id || '');
  const [roomType, setRoomType] = useState<RoomType>('Quad');
  const [dpAmount, setDpAmount] = useState<number>(5000000);
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer (BSI)' | 'BCA VA' | 'QRIS' | 'Tunai'>('Bank Transfer (BSI)');

  if (!isOpen) return null;

  const currentPkg = packages.find(p => p.id === selectedPkgId) || packages[0];
  const tierPrice = currentPkg?.tiers.find(t => t.type === roomType)?.priceIdr || 32500000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaLengkap || !noPaspor || !selectedPkgId) return;

    addJamaah({
      nik: nik || '3174000000000000',
      namaLengkap,
      namaPaspor: namaPaspor || namaLengkap.toUpperCase(),
      noPaspor,
      pasporExpiry,
      tempatLahir: 'Jakarta',
      tanggalLahir: '1988-04-12',
      gender,
      phone: phone || '081234567890',
      alamat: alamat || 'Indonesia',
      kota: kota || 'Jakarta',
      mahramName: mahramName || undefined,
      mahramRelation: mahramRelation || undefined,
      packageId: selectedPkgId,
      roomType,
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
      roomType,
      dpAmount,
      paymentMethod
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Pendaftaran Jamaah Baru</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Input data manifes dan penerimaan angsuran awal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Package & Room Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Pilihan Paket:</label>
              <select
                value={selectedPkgId}
                onChange={(e) => setSelectedPkgId(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                {packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.kloterCode} - {p.title.slice(0, 24)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Tipe Kamar Hotel:</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomType)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="Quad">Quad (Sekamar Ber-4)</option>
                <option value="Triple">Triple (Sekamar Ber-3)</option>
                <option value="Double">Double (Sekamar Ber-2)</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-between items-center pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px]">
              <span className="text-zinc-500 dark:text-zinc-400">Biaya Paket ({roomType}):</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-mono tabular-nums font-bold text-sm">{formatIdr(tierPrice)}</span>
            </div>
          </div>

          {/* Identity */}
          <div className="space-y-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nama Lengkap (KTP):</label>
              <input
                type="text"
                value={namaLengkap}
                onChange={(e) => setNamaLengkap(e.target.value)}
                placeholder="Contoh: H. Agus Salim"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nama Paspor (Sesuai Paspor):</label>
                <input
                  type="text"
                  value={namaPaspor}
                  onChange={(e) => setNamaPaspor(e.target.value.toUpperCase())}
                  placeholder="AGUS SALIM SUDIRMAN"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono uppercase placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>

              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">NIK KTP (16 Digit):</label>
                <input
                  type="text"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  placeholder="3174051203850003"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nomor Paspor:</label>
                <input
                  type="text"
                  value={noPaspor}
                  onChange={(e) => setNoPaspor(e.target.value.toUpperCase())}
                  placeholder="C8192019"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono uppercase placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  required
                />
              </div>

              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Masa Berlaku:</label>
                <input
                  type="date"
                  value={pasporExpiry}
                  onChange={(e) => setPasporExpiry(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>

              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Jenis Kelamin:</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nomor WhatsApp:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081288991122"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  required
                />
              </div>

              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Kota Domisili:</label>
                <input
                  type="text"
                  value={kota}
                  onChange={(e) => setKota(e.target.value)}
                  placeholder="Jakarta Selatan"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nama Mahram:</label>
                <input
                  type="text"
                  value={mahramName}
                  onChange={(e) => setMahramName(e.target.value)}
                  placeholder="Nama pendamping"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Hubungan:</label>
                <input
                  type="text"
                  value={mahramRelation}
                  onChange={(e) => setMahramRelation(e.target.value)}
                  placeholder="Suami / Anak"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
            </div>
          </div>

          {/* Initial DP */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200 block text-xs">
              Pembayaran Uang Muka (DP Awal)
            </span>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nominal DP (IDR):</label>
                <input
                  type="number"
                  value={dpAmount}
                  step={1000000}
                  onChange={(e) => setDpAmount(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white font-mono tabular-nums font-bold focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>

              <div>
                <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Metode Pembayaran:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as any)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                >
                  <option value="Bank Transfer (BSI)">Bank Syariah Indonesia (BSI)</option>
                  <option value="BCA VA">BCA Virtual Account</option>
                  <option value="QRIS">QRIS</option>
                  <option value="Tunai">Tunai Kasir</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Jamaah</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
