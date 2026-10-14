import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Receipt, 
  Search, 
  Plus, 
  Printer, 
  Check, 
  QrCode,
  CheckCircle2,
  Clock,
  ArrowRight,
  Filter,
  DollarSign,
  X
} from 'lucide-react';
import { PaymentRecord, Booking } from '../../types';

export const BookingPaymentModule: React.FC<{
  onOpenPaymentModal: () => void;
}> = ({ onOpenPaymentModal }) => {
  const { payments, bookings, packages, jamaahList, formatIdr, currentTenant } = useApp();
  const [activeTab, setActiveTab] = useState<'payments' | 'installments'>('payments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  const filteredPayments = payments.filter(p => {
    return (
      p.jamaahName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.receiptNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredBookings = bookings.filter(b => {
    const jamaah = jamaahList.find(j => j.id === b.jamaahId);
    return (
      (jamaah?.namaLengkap.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalCollected = payments.filter(p => p.status === 'Verified').reduce((sum, p) => sum + p.amount, 0);
  const totalReceivables = bookings.reduce((sum, b) => sum + b.remainingAmount, 0);

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Keuangan &amp; Kasir</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{payments.length} Kuitansi Diterbitkan</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Kasir &amp; Penerbitan Kuitansi
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Pencatatan pembayaran DP, termin angsuran, pelunasan, dan penerbitan kuitansi resmi ber-QR Code.
          </p>
        </div>

        <button
          onClick={onOpenPaymentModal}
          className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Input Pembayaran Baru</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Kas Masuk Terverifikasi</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums mt-1">{formatIdr(totalCollected)}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">{payments.length} transaksi penerimaan kasir</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Sisa Piutang Angsuran</span>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums mt-1">{formatIdr(totalReceivables)}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
            {bookings.filter(b => b.remainingAmount > 0).length} jamaah belum melunasi
          </p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Tingkat Pelunasan Akad</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">
            {bookings.length > 0 ? Math.round((bookings.filter(b => b.status === 'Lunas').length / bookings.length) * 100) : 0}%
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
            {bookings.filter(b => b.status === 'Lunas').length} dari {bookings.length} jamaah lunas
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'payments'
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Riwayat Kuitansi ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab('installments')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'installments'
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Monitoring Angsuran ({bookings.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari no kuitansi, nama, booking..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
          />
        </div>
      </div>

      {/* Main Table Content */}
      {activeTab === 'payments' ? (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-4">No. Kuitansi</th>
                  <th className="py-3 px-3">Nama Jamaah &amp; Kode Booking</th>
                  <th className="py-3 px-3">Tanggal Bayar</th>
                  <th className="py-3 px-3">Metode &amp; Jenis</th>
                  <th className="py-3 px-3 text-right">Nominal</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredPayments.map(pay => {
                  return (
                    <tr key={pay.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                      <td className="py-3 px-4 font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                        {pay.receiptNumber}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-zinc-900 dark:text-white">{pay.jamaahName}</div>
                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{pay.bookingCode}</div>
                      </td>
                      <td className="py-3 px-3 text-zinc-600 dark:text-zinc-300 font-mono">
                        {pay.date}
                      </td>
                      <td className="py-3 px-3 text-zinc-600 dark:text-zinc-300">
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">{pay.paymentMethod}</span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono block">{pay.paymentType}</span>
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {formatIdr(pay.amount)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          pay.status === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {pay.status === 'Verified' ? 'Terverifikasi' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReceipt(pay)}
                          className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs px-2.5 py-1.5 rounded-lg font-medium inline-flex items-center gap-1.5 transition"
                        >
                          <QrCode className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                          <span>Kuitansi</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Installments monitoring table */
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Kode Booking</th>
                  <th className="py-3 px-3">Nama Jamaah</th>
                  <th className="py-3 px-3">Paket</th>
                  <th className="py-3 px-3 text-right">Total Biaya</th>
                  <th className="py-3 px-3 text-right">Sudah Dibayar</th>
                  <th className="py-3 px-3 text-right">Sisa Piutang</th>
                  <th className="py-3 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredBookings.map(b => {
                  const jamaah = jamaahList.find(j => j.id === b.jamaahId);
                  const pkg = packages.find(p => p.id === b.packageId);

                  return (
                    <tr key={b.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                      <td className="py-3 px-4 font-mono font-semibold text-zinc-900 dark:text-zinc-200">
                        {b.bookingCode}
                      </td>
                      <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-white">
                        {jamaah?.namaLengkap}
                      </td>
                      <td className="py-3 px-3 text-zinc-600 dark:text-zinc-300">
                        {pkg?.title} ({b.roomType})
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-zinc-900 dark:text-zinc-200">
                        {formatIdr(b.totalPrice)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {formatIdr(b.paidAmount)}
                      </td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${
                        b.remainingAmount > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-zinc-400'
                      }`}>
                        {formatIdr(b.remainingAmount)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          b.status === 'Lunas'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Receipt Digital Modal with QR Verification */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Kuitansi Pembayaran Sah (QR Code)
                </h3>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-950 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-4">
              <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <h4 className="font-bold text-zinc-900 dark:text-white uppercase text-sm tracking-wide">{currentTenant.companyName}</h4>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">NOMOR IZIN PPIU: {currentTenant.branding.ppiuNumber}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">{currentTenant.branding.address}</p>
              </div>

              <div className="space-y-2 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">No. Kuitansi:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{selectedReceipt.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Tanggal:</span>
                  <span>{selectedReceipt.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Nama Jamaah:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">{selectedReceipt.jamaahName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Kode Booking:</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">{selectedReceipt.bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 dark:text-zinc-400">Metode &amp; Jenis:</span>
                  <span>{selectedReceipt.paymentMethod} ({selectedReceipt.paymentType})</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-zinc-500 dark:text-zinc-400">Jumlah Diterima:</span>
                  <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">{formatIdr(selectedReceipt.amount)}</span>
                </div>
              </div>

              {/* QR Verification */}
              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center border border-zinc-200">
                  <QrCode className="w-14 h-14 text-zinc-900" />
                </div>
                <div className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-tight">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-200">Verifikasi Kuitansi Digital</p>
                  <p className="mt-0.5">Pindai QR untuk memvalidasi keaslian tanda terima dengan database pusat Kemenag / Biro {currentTenant.name}.</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs px-4 py-2 rounded-lg font-medium transition"
              >
                Tutup
              </button>
              <button
                onClick={() => window.print()}
                className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Bukti</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
