import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plane, 
  Building, 
  Plus, 
  Users, 
  BedDouble, 
  Star, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Filter 
} from 'lucide-react';
import { TravelPackage, RoomType } from '../../types';

export const PackagesModule: React.FC<{
  onOpenNewPackage: () => void;
  onOpenRegisterJamaahForPackage?: (pkgId: string) => void;
}> = ({ onOpenNewPackage, onOpenRegisterJamaahForPackage }) => {
  const { packages, jamaahList, formatIdr } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackageForRooming, setSelectedPackageForRooming] = useState<TravelPackage | null>(null);

  const categories = ['Semua', 'Umrah Reguler', 'Umrah VIP', 'Haji Plus', 'Haji Furoda', 'Wisata Halal'];

  const filteredPackages = packages.filter(pkg => {
    const matchesCategory = selectedCategory === 'Semua' || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.kloterCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.airline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Cruip Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Operasional Kloter</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{packages.length} Paket Aktif</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Manajemen Paket &amp; Kloter
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Konfigurasi harga kamar Quad, Triple, Double, kuota kursi, serta alokasi hotel Makkah dan Madinah.
          </p>
        </div>

        <button
          onClick={onOpenNewPackage}
          className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center justify-center gap-2 shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Paket Baru</span>
        </button>
      </div>

      {/* Cruip Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        
        {/* Category Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama paket, kode kloter..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
          />
        </div>

      </div>

      {/* Package Cards Grid (Cruip Mosaic Style in Zinc) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredPackages.map(pkg => {
          const seatOccupancy = Math.round((pkg.bookedSeats / pkg.totalSeats) * 100);
          const remainingSeats = pkg.totalSeats - pkg.bookedSeats;

          return (
            <div 
              key={pkg.id}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col justify-between hover:border-zinc-350 dark:hover:border-zinc-700 shadow-xs transition"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
                      {pkg.kloterCode}
                    </span>
                    <span className="text-zinc-600 dark:text-zinc-400">{pkg.category}</span>
                    <span className="text-zinc-400" aria-hidden="true">·</span>
                    <span className="text-zinc-600 dark:text-zinc-400">{pkg.durationDays} Hari</span>
                  </div>

                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
                    remainingSeats <= 5 
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-semibold' 
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                  }`}>
                    Sisa {remainingSeats} Kursi
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight">{pkg.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Pembimbing: <span className="text-zinc-800 dark:text-zinc-200 font-medium">{pkg.programLead}</span>
                </p>

                {/* Flight & Dates */}
                <div className="mt-3.5 py-2.5 border-y border-zinc-150 dark:border-zinc-800 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-semibold tracking-wider block">Penerbangan</span>
                    <span className="text-zinc-800 dark:text-zinc-200 mt-0.5 font-medium block truncate">{pkg.airline}</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono block mt-0.5">{pkg.flightRoute}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-semibold tracking-wider block">Jadwal Kloter</span>
                    <span className="text-zinc-800 dark:text-zinc-200 mt-0.5 font-medium block font-mono">{pkg.departureDate}</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5">s/d {pkg.returnDate}</span>
                  </div>
                </div>

                {/* Saudi Hotels */}
                <div className="mt-3 text-xs space-y-1.5 text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Makkah:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[200px]">{pkg.makkahHotel}</span>
                    </span>
                    <div className="flex text-amber-500">
                      {[...Array(pkg.makkahHotelStars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Madinah:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[200px]">{pkg.madinahHotel}</span>
                    </span>
                    <div className="flex text-amber-500">
                      {[...Array(pkg.madinahHotelStars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Room Price Tiers */}
                <div className="mt-4">
                  <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Tingkatan Harga Kamar:
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {pkg.tiers.map(tier => (
                      <div 
                        key={tier.type}
                        className="bg-zinc-50 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/80 p-2 rounded-lg"
                      >
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">{tier.type}</span>
                        <span className="font-bold text-zinc-900 dark:text-white block font-mono tabular-nums mt-0.5">
                          {formatIdr(tier.priceIdr).replace(',00', '')}
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block truncate">{tier.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seat Occupancy */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Keterisian: <span className="text-zinc-900 dark:text-white font-mono font-semibold">{pkg.bookedSeats}</span> / {pkg.totalSeats} Kursi
                    </span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200 font-bold">{seatOccupancy}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-750 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        seatOccupancy >= 90 ? 'bg-rose-500' : seatOccupancy >= 70 ? 'bg-zinc-700 dark:bg-zinc-300' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${seatOccupancy}%` }}
                    />
                  </div>
                </div>

              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3.5 border-t border-zinc-150 dark:border-zinc-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedPackageForRooming(pkg)}
                  className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
                >
                  <BedDouble className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Rooming List ({pkg.bookedSeats} Jamaah)</span>
                </button>

                <button
                  onClick={() => onOpenRegisterJamaahForPackage?.(pkg.id)}
                  className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Daftarkan ke Kloter</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Rooming List Modal */}
      {selectedPackageForRooming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Rooming List: {selectedPackageForRooming.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  Kode Kloter: {selectedPackageForRooming.kloterCode}
                </p>
              </div>
              <button
                onClick={() => setSelectedPackageForRooming(null)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              <div className="text-xs text-zinc-600 dark:text-zinc-300">
                Alokasi jamaah berdasarkan tipe kamar yang dipilih saat akad pendaftaran:
              </div>

              {(['Quad', 'Triple', 'Double'] as RoomType[]).map(rType => {
                const jamaahInRoom = jamaahList.filter(
                  j => j.packageId === selectedPackageForRooming.id && j.roomType === rType
                );

                return (
                  <div key={rType} className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/60">
                    <div className="px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        Kamar Tipe {rType} (Kapasitas {rType === 'Quad' ? '4' : rType === 'Triple' ? '3' : '2'} Orang)
                      </span>
                      <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{jamaahInRoom.length} Jamaah</span>
                    </div>

                    <div className="p-3">
                      {jamaahInRoom.length === 0 ? (
                        <p className="text-xs text-zinc-400 italic">Belum ada jamaah terdaftar di tipe kamar ini.</p>
                      ) : (
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                          {jamaahInRoom.map((j, idx) => (
                            <div key={j.id} className="py-2 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-semibold text-zinc-900 dark:text-white">{idx + 1}. {j.namaLengkap}</span>
                                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono ml-2">
                                  Paspor: {j.noPaspor} ({j.gender === 'L' ? 'Pria' : 'Wanita'})
                                </span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                                {j.bookingCode}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedPackageForRooming(null)}
                className="btn bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-white text-xs px-4 py-2 rounded-lg font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
