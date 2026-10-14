import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Users, Plane, Receipt, ArrowRight, CornerDownLeft } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectJamaah?: (id: string) => void;
  onSelectPackage?: (id: string) => void;
  onSelectPayment?: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectJamaah,
  onSelectPackage,
  onSelectPayment
}) => {
  const { jamaahList, packages, payments, setCurrentView, formatIdr } = useApp();
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredJamaah = query.trim()
    ? jamaahList.filter(j =>
        j.namaLengkap.toLowerCase().includes(query.toLowerCase()) ||
        j.noPaspor.toLowerCase().includes(query.toLowerCase()) ||
        j.nik.includes(query) ||
        j.bookingCode.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : jamaahList.slice(0, 3);

  const filteredPackages = query.trim()
    ? packages.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.kloterCode.toLowerCase().includes(query.toLowerCase()) ||
        p.airline.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : packages.slice(0, 2);

  const filteredPayments = query.trim()
    ? payments.filter(p =>
        p.receiptNumber.toLowerCase().includes(query.toLowerCase()) ||
        p.bookingCode.toLowerCase().includes(query.toLowerCase()) ||
        p.jamaahName.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : payments.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-zinc-950/60 dark:bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh] transition-colors">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80">
          <Search className="w-5 h-5 text-zinc-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama jamaah, paspor, paket, kuitansi (ketik nama/kode)..."
            className="w-full py-4 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-600">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Jamaah Results */}
          {filteredJamaah.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" /> Jamaah &amp; Manifes
                </span>
                <span>{filteredJamaah.length} hasil</span>
              </div>
              <div className="space-y-1">
                {filteredJamaah.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => {
                      setCurrentView('jamaah');
                      onClose();
                      onSelectJamaah?.(j.id);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-left group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center font-semibold text-xs">
                        {j.namaLengkap.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition">
                          {j.namaLengkap}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono flex items-center gap-2">
                          <span>Paspor: {j.noPaspor}</span>
                          <span>•</span>
                          <span>Kode: {j.bookingCode}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        j.status === 'Dokumen Siap' || j.status === 'Visa Terbit'
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        {j.status}
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Package Results */}
          {filteredPackages.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" /> Paket &amp; Kloter Umrah
                </span>
                <span>{filteredPackages.length} paket</span>
              </div>
              <div className="space-y-1">
                {filteredPackages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentView('packages');
                      onClose();
                      onSelectPackage?.(p.id);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-left group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center font-semibold text-xs">
                        <Plane className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition">
                          {p.title}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                          <span>{p.durationDays} Hari</span>
                          <span>•</span>
                          <span>{p.airline}</span>
                          <span>•</span>
                          <span>Mulai {formatIdr(p.tiers[0]?.priceIdr || 0)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        {p.bookedSeats}/{p.totalSeats} Seat
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Payments Results */}
          {filteredPayments.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 px-2 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Receipt className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" /> Kasir &amp; Pembayaran
                </span>
                <span>{filteredPayments.length} kuitansi</span>
              </div>
              <div className="space-y-1">
                {filteredPayments.map((pay) => (
                  <button
                    key={pay.id}
                    onClick={() => {
                      setCurrentView('payments');
                      onClose();
                      onSelectPayment?.(pay.id);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-left group border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 flex items-center justify-center font-semibold text-xs">
                        <Receipt className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition">
                          {pay.receiptNumber} — {formatIdr(pay.amount)}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2 font-mono">
                          <span>{pay.jamaahName}</span>
                          <span>•</span>
                          <span>{pay.paymentMethod}</span>
                          <span>•</span>
                          <span>{pay.date}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">↑↓</kbd> Navigasi
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px] flex items-center"><CornerDownLeft className="w-2.5 h-2.5" /></kbd> Pilih
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[10px]">ESC</kbd> Tutup
            </span>
          </div>
          <span className="text-zinc-500 dark:text-zinc-400 font-medium">Hajrah ERP Instant Search</span>
        </div>
      </div>
    </div>
  );
};
