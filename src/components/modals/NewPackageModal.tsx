import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plane, Check, X } from 'lucide-react';
import { PackageTier } from '../../types';

export const NewPackageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { addPackage, currentTenant } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Umrah Reguler' | 'Umrah VIP' | 'Haji Plus' | 'Haji Furoda' | 'Wisata Halal'>('Umrah Reguler');
  const [durationDays, setDurationDays] = useState(9);
  const [airline, setAirline] = useState('Garuda Indonesia (Direct)');
  const [flightRoute, setFlightRoute] = useState('CGK - JED / MED - CGK');
  const [departureDate, setDepartureDate] = useState('2026-12-10');
  const [returnDate, setReturnDate] = useState('2026-12-19');
  const [makkahHotel, setMakkahHotel] = useState('Pullman Zamzam Makkah (Bintang 5)');
  const [madinahHotel, setMadinahHotel] = useState('Anwar Al Madinah Mövenpick (Bintang 5)');
  const [totalSeats, setTotalSeats] = useState(45);
  const [programLead, setProgramLead] = useState('Ustadz Pembimbing Kemenag');

  // Tier Prices
  const [priceQuad, setPriceQuad] = useState(33500000);
  const [priceTriple, setPriceTriple] = useState(36000000);
  const [priceDouble, setPriceDouble] = useState(39500000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const kloterCode = `KL-${currentTenant.code}-${departureDate.slice(2, 7).replace('-', '')}${category === 'Umrah VIP' ? 'VIP' : 'A'}`;

    const tiers: PackageTier[] = [
      { type: 'Quad', priceIdr: priceQuad, description: 'Sekamar Ber-4' },
      { type: 'Triple', priceIdr: priceTriple, description: 'Sekamar Ber-3' },
      { type: 'Double', priceIdr: priceDouble, description: 'Sekamar Ber-2' }
    ];

    addPackage({
      title,
      category,
      durationDays,
      airline,
      flightRoute,
      makkahHotel,
      makkahHotelStars: 5,
      madinahHotel,
      madinahHotelStars: 5,
      departureDate,
      returnDate,
      totalSeats,
      tiers,
      includes: [
        'Tiket Pesawat PP',
        'Visa Umrah / Muassasah',
        'Hotel Bintang 5 Dekat Masjid',
        'Makan 3x Fullboard Buffet Menu Indonesia',
        'Bus Eksekutif Saptco',
        'Perlengkapan Umrah Eksklusif'
      ],
      status: 'Open',
      kloterCode,
      programLead
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Buat Paket Perjalanan Baru</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Atur harga kamar Quad, Triple, Double, kuota kursi &amp; hotel</p>
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
          <div>
            <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Judul Paket:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Umrah Liburan Akhir Tahun 9 Hari Bintang 5"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Kategori Paket:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="Umrah Reguler">Umrah Reguler</option>
                <option value="Umrah VIP">Umrah VIP</option>
                <option value="Haji Plus">Haji Plus</option>
                <option value="Haji Furoda">Haji Furoda</option>
                <option value="Wisata Halal">Wisata Halal</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Durasi Hari:</label>
              <input
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Tanggal Keberangkatan:</label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Tanggal Kepulangan:</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Maskapai Penerbangan:</label>
              <input
                type="text"
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Total Kuota Kursi:</label>
              <input
                type="number"
                value={totalSeats}
                onChange={(e) => setTotalSeats(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Hotel Makkah:</label>
              <input
                type="text"
                value={makkahHotel}
                onChange={(e) => setMakkahHotel(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Hotel Madinah:</label>
              <input
                type="text"
                value={madinahHotel}
                onChange={(e) => setMadinahHotel(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-zinc-800 dark:text-zinc-200 font-semibold block mb-2 text-xs">
              Konfigurasi Harga Kamar (IDR):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-zinc-500 dark:text-zinc-400 block mb-1 text-[11px]">Kamar Quad (Ber-4):</label>
                <input
                  type="number"
                  step={500000}
                  value={priceQuad}
                  onChange={(e) => setPriceQuad(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-900 dark:text-white font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
              <div>
                <label className="text-zinc-500 dark:text-zinc-400 block mb-1 text-[11px]">Kamar Triple (Ber-3):</label>
                <input
                  type="number"
                  step={500000}
                  value={priceTriple}
                  onChange={(e) => setPriceTriple(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-900 dark:text-white font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
              </div>
              <div>
                <label className="text-zinc-500 dark:text-zinc-400 block mb-1 text-[11px]">Kamar Double (Ber-2):</label>
                <input
                  type="number"
                  step={500000}
                  value={priceDouble}
                  onChange={(e) => setPriceDouble(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-2.5 py-1.5 text-zinc-900 dark:text-white font-mono tabular-nums focus:outline-none focus:ring-1 focus:ring-zinc-400"
                />
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
              <span>Simpan Paket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
