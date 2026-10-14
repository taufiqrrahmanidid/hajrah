import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calculator, Check, Plus, Trash2, X } from 'lucide-react';
import { JournalLine } from '../../types';

export const NewJournalModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { coaList, addJournalEntry, packages } = useApp();

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [kloterCode, setKloterCode] = useState(packages[0]?.kloterCode || '');
  const [lines, setLines] = useState<JournalLine[]>([
    { accountCode: '5-1000', accountName: 'Beban Tiket Pesawat Internasional', debit: 50000000, credit: 0 },
    { accountCode: '1-1110', accountName: 'Bank Syariah Indonesia (BSI Giro Operasional)', debit: 0, credit: 50000000 }
  ]);

  if (!isOpen) return null;

  const totalDebit = lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  const handleAddLine = () => {
    setLines(prev => [
      ...prev,
      { accountCode: coaList[0].code, accountName: coaList[0].name, debit: 0, credit: 0 }
    ]);
  };

  const handleUpdateLine = (index: number, updates: Partial<JournalLine>) => {
    setLines(prev => prev.map((line, idx) => {
      if (idx === index) {
        let updated = { ...line, ...updates };
        if (updates.accountCode) {
          const acc = coaList.find(c => c.code === updates.accountCode);
          if (acc) updated.accountName = acc.name;
        }
        return updated;
      }
      return line;
    }));
  };

  const handleRemoveLine = (index: number) => {
    if (lines.length <= 2) return;
    setLines(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !isBalanced) return;

    addJournalEntry({
      date,
      description,
      kloterCode: kloterCode || undefined,
      lines
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Entry Jurnal Penyesuaian (SAK ETAP)</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Pencatatan penyesuaian beban operasional atau vendor</p>
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
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Tanggal Transaksi:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
                required
              />
            </div>
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Alokasi Kloter:</label>
              <select
                value={kloterCode}
                onChange={(e) => setKloterCode(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="">-- Biaya Non-Kloter --</option>
                {packages.map(p => (
                  <option key={p.id} value={p.kloterCode}>{p.kloterCode} ({p.title.slice(0, 20)}...)</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Keterangan Transaksi:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Pembayaran Pelunasan Tiket Pesawat 45 Seat Garuda Indonesia"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              required
            />
          </div>

          {/* Lines Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-zinc-800 dark:text-zinc-200 font-semibold text-xs">
                Baris Jurnal (Debit &amp; Kredit):
              </label>
              <button
                type="button"
                onClick={handleAddLine}
                className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 text-xs font-medium transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Baris</span>
              </button>
            </div>

            <div className="space-y-2">
              {lines.map((line, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <div className="flex-1">
                    <select
                      value={line.accountCode}
                      onChange={(e) => handleUpdateLine(idx, { accountCode: e.target.value })}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs rounded-lg px-2 py-1.5 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    >
                      {coaList.map(a => (
                        <option key={a.code} value={a.code}>
                          {a.code} - {a.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-32">
                    <input
                      type="number"
                      step={500000}
                      value={line.debit || ''}
                      onChange={(e) => handleUpdateLine(idx, { debit: Number(e.target.value), credit: 0 })}
                      placeholder="Debit"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs rounded-lg px-2 py-1.5 text-emerald-600 dark:text-emerald-400 font-mono tabular-nums text-right focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>

                  <div className="w-32">
                    <input
                      type="number"
                      step={500000}
                      value={line.credit || ''}
                      onChange={(e) => handleUpdateLine(idx, { credit: Number(e.target.value), debit: 0 })}
                      placeholder="Kredit"
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs rounded-lg px-2 py-1.5 text-zinc-800 dark:text-zinc-200 font-mono tabular-nums text-right focus:outline-none focus:ring-1 focus:ring-zinc-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveLine(idx)}
                    disabled={lines.length <= 2}
                    className="text-zinc-400 hover:text-red-500 disabled:opacity-30 p-1 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Balancing Verification */}
            <div className="bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between font-mono text-xs mt-2">
              <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                <span>Debit: <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">Rp {totalDebit.toLocaleString('id-ID')}</strong></span>
                <span>Kredit: <strong className="text-zinc-900 dark:text-zinc-200 tabular-nums">Rp {totalCredit.toLocaleString('id-ID')}</strong></span>
              </div>
              <span className={`font-mono text-xs ${
                isBalanced ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-amber-600 dark:text-amber-400'
              }`}>
                {isBalanced ? 'Seimbang (Balance)' : 'Belum Seimbang'}
              </span>
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
              disabled={!isBalanced}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-lg font-medium transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Jurnal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
