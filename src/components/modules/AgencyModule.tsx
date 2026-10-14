import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  Wallet, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  ArrowRight,
  X
} from 'lucide-react';
import { Agent } from '../../types';

export const AgencyModule: React.FC = () => {
  const { agents, payoutAgentCommission, formatIdr } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgentForPayout, setSelectedAgentForPayout] = useState<Agent | null>(null);
  const [payoutAmount, setPayoutAmount] = useState<number>(0);
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const filteredAgents = agents.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalReferrals = agents.reduce((sum, a) => sum + a.referralCount, 0);
  const totalCommissionAll = agents.reduce((sum, a) => sum + a.totalCommission, 0);
  const totalPending = agents.reduce((sum, a) => sum + a.pendingCommission, 0);

  const handleExecutePayout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgentForPayout || payoutAmount <= 0) return;

    payoutAgentCommission(selectedAgentForPayout.id, payoutAmount);
    setSuccessNote(`Pencairan komisi sebesar ${formatIdr(payoutAmount)} untuk ${selectedAgentForPayout.name} berhasil dicatat.`);
    setSelectedAgentForPayout(null);
    setPayoutAmount(0);
    setTimeout(() => setSuccessNote(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Keagenan &amp; Afiliasi</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{agents.length} Mitra Terdaftar</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Mitra Keagenan &amp; Komisi Overriding
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manajemen jaringan agen rujukan, skema komisi berjenjang (Direct &amp; Overriding), dan pencairan saldo mitra.
          </p>
        </div>
      </div>

      {successNote && (
        <div className="bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs p-3.5 rounded-xl flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Akumulasi Komisi</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">{formatIdr(totalCommissionAll)}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Dari {totalReferrals} jamaah yang terdaftar via agen</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Sisa Komisi Belum Cair</span>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums mt-1">{formatIdr(totalPending)}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Siap ditransfer ke rekening bank mitra</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Mitra Aktif</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">{agents.length} Agen</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Tier: Master, Gold, Silver, Bronze</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <span className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold px-2">Jaringan Keagenan Travel</span>
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kode agen, nama, kota..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
          />
        </div>
      </div>

      {/* Agents Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Kode &amp; Nama Agen</th>
                <th className="py-3 px-3">Kota &amp; Kontak</th>
                <th className="py-3 px-3">Tingkatan (Level)</th>
                <th className="py-3 px-3 text-center">Realisasi Jamaah</th>
                <th className="py-3 px-3 text-right">Total Komisi</th>
                <th className="py-3 px-3 text-right">Saldo Tertunda</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredAgents.map(a => (
                <tr key={a.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-zinc-900 dark:text-white">{a.name}</div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">{a.code}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="text-zinc-800 dark:text-zinc-200">{a.city}</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block font-mono">{a.phone}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      a.level === 'Master Distributor'
                        ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20'
                        : a.level === 'Gold'
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
                    }`}>
                      {a.level}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-zinc-900 dark:text-white">
                    {a.referralCount} Jamaah
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono text-zinc-700 dark:text-zinc-300">
                    {formatIdr(a.totalCommission)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-amber-600 dark:text-amber-400">
                    {formatIdr(a.pendingCommission)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      disabled={a.pendingCommission <= 0}
                      onClick={() => {
                        setSelectedAgentForPayout(a);
                        setPayoutAmount(a.pendingCommission);
                      }}
                      className={`btn text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                        a.pendingCommission > 0
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-750'
                      }`}
                    >
                      Cairkan Saldo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      {selectedAgentForPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Pencairan Komisi Mitra Agen
              </h3>
              <button
                onClick={() => setSelectedAgentForPayout(null)}
                className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleExecutePayout} className="p-5 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-semibold text-zinc-900 dark:text-white">{selectedAgentForPayout.name} ({selectedAgentForPayout.code})</span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Kontak: <span className="font-mono text-zinc-800 dark:text-zinc-200">{selectedAgentForPayout.phone}</span> · Kota: {selectedAgentForPayout.city}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Saldo Komisi Tertunda: <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{formatIdr(selectedAgentForPayout.pendingCommission)}</span>
                </p>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Nominal yang Dicairkan (IDR)</label>
                <input
                  type="number"
                  min="100000"
                  max={selectedAgentForPayout.pendingCommission}
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 font-mono font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                  Transaksi akan otomatis menjurnal: Debit Beban Komisi Keagenan, Kredit Kas/Bank.
                </span>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAgentForPayout(null)}
                  className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs px-4 py-2 rounded-lg font-medium transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-semibold transition shadow-sm"
                >
                  Konfirmasi Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
