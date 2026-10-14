import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  Printer, 
  Plus, 
  HeartHandshake,
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  X
} from 'lucide-react';
import { Jamaah } from '../../types';

export const JamaahModule: React.FC<{
  onOpenRegisterJamaah: () => void;
}> = ({ onOpenRegisterJamaah }) => {
  const { jamaahList, packages, bookings, updateJamaahDocStatus, currentTenant } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKloter, setSelectedKloter] = useState<string>('Semua');
  const [docFilter, setDocFilter] = useState<string>('Semua');
  const [selectedJamaahForDetail, setSelectedJamaahForDetail] = useState<Jamaah | null>(null);
  const [showManifestPrint, setShowManifestPrint] = useState(false);

  // Filtered List
  const filteredList = jamaahList.filter(j => {
    const pkg = packages.find(p => p.id === j.packageId);
    const matchesKloter = selectedKloter === 'Semua' || pkg?.kloterCode === selectedKloter;
    const matchesSearch = j.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.noPaspor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.nik.includes(searchQuery) ||
                          j.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());

    const isPassportExpiring = () => {
      if (!j.pasporExpiry) return false;
      const expiry = new Date(j.pasporExpiry);
      const sixMonths = new Date();
      sixMonths.setMonth(sixMonths.getMonth() + 6);
      return expiry <= sixMonths || j.documents.paspor === 'Expired';
    };

    let matchesDoc = true;
    if (docFilter === 'Paspor Warning') matchesDoc = isPassportExpiring();
    if (docFilter === 'Visa Terbit') matchesDoc = j.documents.visa === 'Issued';
    if (docFilter === 'Dokumen Siap') matchesDoc = j.documents.paspor === 'Valid' && j.documents.visa === 'Issued';

    return matchesKloter && matchesSearch && matchesDoc;
  });

  const passportWarningsCount = jamaahList.filter(j => {
    if (!j.pasporExpiry) return false;
    const expiry = new Date(j.pasporExpiry);
    const sixMonths = new Date();
    sixMonths.setMonth(sixMonths.getMonth() + 6);
    return expiry <= sixMonths || j.documents.paspor === 'Expired';
  }).length;

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Manifes &amp; DMS</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">{jamaahList.length} Jamaah Terdata</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Manifes Jamaah &amp; Manajemen Dokumen
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Database identitas jamaah, pengelompokan mahram, verifikasi masa berlaku paspor, vaksin, dan visa.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowManifestPrint(true)}
            className="btn bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-semibold px-3.5 py-2 rounded-lg text-xs flex items-center gap-2 shadow-2xs transition"
          >
            <Printer className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            <span>Cetak Manifes SISKOPATUH</span>
          </button>
          <button
            onClick={onOpenRegisterJamaah}
            className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Daftarkan Jamaah</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Total Jamaah</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono mt-1">{jamaahList.length}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Terdaftar di sistem</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Paspor Terverifikasi</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {jamaahList.filter(j => j.documents.paspor === 'Valid').length}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Sesuai data imigrasi</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Visa Terbit</span>
          <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 font-mono mt-1">
            {jamaahList.filter(j => j.documents.visa === 'Issued').length}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Visa Umrah Muassasah</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Warning Paspor (&lt;6 Bln)</span>
          <div className={`text-2xl font-bold font-mono mt-1 ${passportWarningsCount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400 dark:text-zinc-500'}`}>
            {passportWarningsCount}
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Perlu perpanjangan</p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Kloter Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1 hidden sm:inline">Kloter:</span>
            <button
              onClick={() => setSelectedKloter('Semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedKloter === 'Semua' 
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs' 
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Semua Kloter
            </button>
            {packages.map(pkg => (
              <button
                key={pkg.id}
                onClick={() => setSelectedKloter(pkg.kloterCode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition font-mono ${
                  selectedKloter === pkg.kloterCode 
                    ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs' 
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {pkg.kloterCode}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama jamaah, paspor, NIK..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
            />
          </div>
        </div>

        {/* Document Filter Sub-chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium mr-1">Status Dokumen:</span>
          {['Semua', 'Paspor Warning', 'Visa Terbit', 'Dokumen Siap'].map(f => (
            <button
              key={f}
              onClick={() => setDocFilter(f)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                docFilter === f 
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Manifest Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Nama Jamaah &amp; Mahram</th>
                <th className="py-3 px-3">Paspor &amp; NIK</th>
                <th className="py-3 px-3">Paket &amp; Kamar</th>
                <th className="py-3 px-3">Kelengkapan Dokumen</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500 dark:text-zinc-400">
                    Tidak ada jamaah yang cocok dengan filter atau pencarian.
                  </td>
                </tr>
              ) : (
                filteredList.map((j) => {
                  const pkg = packages.find(p => p.id === j.packageId);
                  const booking = bookings.find(b => b.jamaahId === j.id);
                  const expiryDate = j.pasporExpiry ? new Date(j.pasporExpiry) : null;
                  const sixMonths = new Date();
                  sixMonths.setMonth(sixMonths.getMonth() + 6);
                  const isPassportExpiring = expiryDate ? expiryDate <= sixMonths || j.documents.paspor === 'Expired' : false;

                  return (
                    <tr key={j.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                      
                      {/* Name & Mahram */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {j.namaLengkap.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-zinc-900 dark:text-white text-sm">{j.namaLengkap}</div>
                            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-0.5 font-mono">
                              <span>{j.bookingCode}</span>
                              <span aria-hidden="true">·</span>
                              <span>{j.gender === 'L' ? 'Pria' : 'Wanita'}</span>
                              <span aria-hidden="true">·</span>
                              <span>{j.phone}</span>
                            </div>
                            {j.mahramName && (
                              <div className="mt-1 text-[11px] text-zinc-700 dark:text-zinc-300 flex items-center gap-1 font-medium">
                                <HeartHandshake className="w-3 h-3 text-zinc-500 dark:text-zinc-400" />
                                <span>Mahram: {j.mahramName} ({j.mahramRelation})</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Passport & NIK */}
                      <td className="py-3.5 px-3 font-mono">
                        <div className="text-zinc-900 dark:text-zinc-100 font-semibold">{j.noPaspor}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                          <span>Exp: {j.pasporExpiry || '-'}</span>
                          {isPassportExpiring && (
                            <span className="text-amber-600 dark:text-amber-400 font-semibold ml-1.5">
                              (&lt; 6 Bln)
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">NIK: {j.nik}</div>
                      </td>

                      {/* Package & Room */}
                      <td className="py-3.5 px-3">
                        <span className="text-zinc-900 dark:text-zinc-200 font-medium block truncate max-w-[180px]">{pkg?.title}</span>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-mono">
                          <span>{pkg?.kloterCode}</span>
                          <span aria-hidden="true" className="mx-1">·</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Kamar {j.roomType}</span>
                        </div>
                      </td>

                      {/* Documents */}
                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap gap-1">
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                            j.documents.ktp === 'Valid' ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                          }`}>
                            KTP
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                            isPassportExpiring 
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30' 
                              : j.documents.paspor === 'Valid' 
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' 
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                          }`}>
                            Paspor
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-medium ${
                            j.documents.visa === 'Issued' ? 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                          }`}>
                            Visa
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          booking?.status === 'Lunas' || j.status === 'Dokumen Siap'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {j.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedJamaahForDetail(j)}
                          className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs px-2.5 py-1.5 rounded-lg font-medium transition"
                        >
                          Detail Dokumen
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jamaah Document Detail Modal */}
      {selectedJamaahForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Verifikasi Dokumen: {selectedJamaahForDetail.namaLengkap}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                  Booking Code: {selectedJamaahForDetail.bookingCode} · NIK: {selectedJamaahForDetail.nik}
                </p>
              </div>
              <button
                onClick={() => setSelectedJamaahForDetail(null)}
                className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Paspor RI</span>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                    No: {selectedJamaahForDetail.noPaspor} · Exp: {selectedJamaahForDetail.pasporExpiry || '-'}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateJamaahDocStatus(selectedJamaahForDetail.id, 'paspor', 'Valid')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      selectedJamaahForDetail.documents.paspor === 'Valid'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Valid
                  </button>
                  <button
                    onClick={() => updateJamaahDocStatus(selectedJamaahForDetail.id, 'paspor', 'Expired')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      selectedJamaahForDetail.documents.paspor === 'Expired'
                        ? 'bg-rose-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Expired
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Visa Umrah Muassasah</span>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                    Status: {selectedJamaahForDetail.documents.visa}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateJamaahDocStatus(selectedJamaahForDetail.id, 'visa', 'Issued')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      selectedJamaahForDetail.documents.visa === 'Issued'
                        ? 'bg-sky-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Terbitkan
                  </button>
                  <button
                    onClick={() => updateJamaahDocStatus(selectedJamaahForDetail.id, 'visa', 'Proses')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      selectedJamaahForDetail.documents.visa === 'Proses'
                        ? 'bg-amber-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Proses
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">Buku Kuning / Sertifikat Vaksin Meningitis</span>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">
                    Status: {selectedJamaahForDetail.documents.vaksinMeningitis}
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => updateJamaahDocStatus(selectedJamaahForDetail.id, 'vaksinMeningitis', 'Valid')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${
                      selectedJamaahForDetail.documents.vaksinMeningitis === 'Valid'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                    }`}
                  >
                    Valid
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedJamaahForDetail(null)}
                className="btn bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 text-xs px-4 py-2 rounded-lg font-semibold transition shadow-sm"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manifest Printable Preview Modal */}
      {showManifestPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Pratinjau Cetak Manifes SISKOPATUH Kemenag RI
                </h3>
              </div>
              <button
                onClick={() => setShowManifestPrint(false)}
                className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-zinc-800 dark:text-zinc-200">
              <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white uppercase">{currentTenant.companyName}</h2>
                <p className="text-xs text-emerald-600 dark:text-emerald-400">NOMOR PPIU: {currentTenant.branding.ppiuNumber}</p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  MANIFES RESMI KEBERANGKATAN JAMAAH UMRAH &amp; HAJI
                </p>
              </div>

              <table className="w-full text-left border border-zinc-300 dark:border-zinc-800 text-[11px]">
                <thead className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 uppercase">
                  <tr>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800">No</th>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800">Nama Jamaah</th>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800">No. Paspor</th>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800">Exp Paspor</th>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800 text-center">L/P</th>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800">Kloter</th>
                    <th className="p-2 border border-zinc-300 dark:border-zinc-800">Kamar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((j, i) => (
                    <tr key={j.id} className="hover:bg-zinc-100 dark:hover:bg-zinc-800/40">
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800 text-center">{i + 1}</td>
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800 font-bold text-zinc-900 dark:text-white">{j.namaLengkap}</td>
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800">{j.noPaspor}</td>
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800">{j.pasporExpiry || '-'}</td>
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800 text-center">{j.gender}</td>
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800">{j.bookingCode.slice(0, 7)}</td>
                      <td className="p-2 border border-zinc-300 dark:border-zinc-800">{j.roomType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-4 flex justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                <div>
                  <p>Dicetak Pada: {new Date().toLocaleDateString('id-ID')}</p>
                  <p>Petugas Verifikator: Admin SISKOPATUH Hajrah</p>
                </div>
                <div className="text-right">
                  <p>Mengetahui,</p>
                  <p className="mt-8 font-bold text-zinc-900 dark:text-white underline">{currentTenant.companyName}</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
              <button
                onClick={() => setShowManifestPrint(false)}
                className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs px-4 py-2 rounded-lg font-medium transition"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Kirim ke Printer</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
