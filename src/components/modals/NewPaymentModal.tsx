import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Receipt, Check, X } from 'lucide-react';

export const NewPaymentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { bookings, jamaahList, packages, addPayment, formatIdr } = useApp();

  const [selectedBookingCode, setSelectedBookingCode] = useState(bookings[0]?.bookingCode || '');
  const [amount, setAmount] = useState<number>(10000000);
  const [paymentType, setPaymentType] = useState<'DP' | 'Cicilan 1' | 'Cicilan 2' | 'Pelunasan'>('Cicilan 1');
  const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer (BSI)' | 'Bank Mandiri' | 'BCA VA' | 'QRIS' | 'Tunai'>('Bank Transfer (BSI)');
  const [receivedBy, setReceivedBy] = useState('Fatimah Az-Zahra');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const currentBooking = bookings.find(b => b.bookingCode === selectedBookingCode) || bookings[0];
  const currentJamaah = jamaahList.find(j => j.id === currentBooking?.jamaahId);
  const currentPkg = packages.find(p => p.id === currentBooking?.packageId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingCode || amount <= 0) return;

    addPayment({
      bookingCode: selectedBookingCode,
      jamaahName: currentJamaah?.namaLengkap || 'Jamaah',
      packageTitle: currentPkg?.title || 'Paket Umrah',
      amount,
      paymentType,
      paymentMethod,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Verified',
      receivedBy,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Input Pembayaran / Angsuran</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Penerbitan kuitansi resmi dan penjurnalan SAK ETAP</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          
          <div>
            <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Pilih Booking Jamaah:</label>
            <select
              value={selectedBookingCode}
              onChange={(e) => {
                setSelectedBookingCode(e.target.value);
                const b = bookings.find(item => item.bookingCode === e.target.value);
                if (b && b.remainingAmount > 0) {
                  setAmount(b.remainingAmount);
                  setPaymentType('Pelunasan');
                }
              }}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            >
              {bookings.map(b => {
                const j = jamaahList.find(jam => jam.id === b.jamaahId);
                return (
                  <option key={b.id} value={b.bookingCode}>
                    {b.bookingCode} - {j?.namaLengkap} (Sisa: {formatIdr(b.remainingAmount)})
                  </option>
                );
              })}
            </select>
          </div>

          {currentBooking && (
            <div className="bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 block">Total Biaya:</span>
                <span className="font-semibold text-zinc-900 dark:text-white font-mono tabular-nums">{formatIdr(currentBooking.totalPrice)}</span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 block">Sudah Dibayar:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">{formatIdr(currentBooking.paidAmount)}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
                <span className="text-zinc-500 dark:text-zinc-400">Sisa Tagihan:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">{formatIdr(currentBooking.remainingAmount)}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nominal Pembayaran (IDR):</label>
              <input
                type="number"
                step={500000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-white font-mono tabular-nums font-bold focus:outline-none focus:ring-1 focus:ring-zinc-400"
                required
              />
            </div>

            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Jenis Pembayaran:</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="DP">DP Awal</option>
                <option value="Cicilan 1">Angsuran 1</option>
                <option value="Cicilan 2">Angsuran 2</option>
                <option value="Pelunasan">Pelunasan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Kanal Pembayaran:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="Bank Transfer (BSI)">Bank Syariah Indonesia (BSI)</option>
                <option value="Bank Mandiri">Bank Mandiri Escrow</option>
                <option value="BCA VA">BCA Virtual Account</option>
                <option value="QRIS">QRIS</option>
                <option value="Tunai">Tunai Kasir</option>
              </select>
            </div>

            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Petugas Kasir:</label>
              <input
                type="text"
                value={receivedBy}
                onChange={(e) => setReceivedBy(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Catatan / Bukti Transfer:</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: No Ref Transfer BSI Mobile 982103981"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
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
              <span>Simpan Pembayaran</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
