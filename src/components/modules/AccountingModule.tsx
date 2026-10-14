import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Search,
  BookOpen,
  Calculator,
  FileSpreadsheet,
  TrendingUp,
  Scale,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { ChartOfAccount, JournalEntry } from '../../types';

export const AccountingModule: React.FC<{
  onOpenNewJournal: () => void;
}> = ({ onOpenNewJournal }) => {
  const { coaList, journals, formatIdr, currentTenant, packages } = useApp();
  const [activeTab, setActiveTab] = useState<'coa' | 'journals' | 'pl' | 'balance' | 'kloterMargin'>('coa');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculations for SAK ETAP Financial Statements
  const revenueAccounts = coaList.filter(a => a.category === 'Pendapatan');
  const totalRevenue = revenueAccounts.reduce((sum, a) => sum + a.balance, 0);

  const hppAccounts = coaList.filter(a => a.category === 'Beban Pokok (HPP)');
  const totalHPP = hppAccounts.reduce((sum, a) => sum + a.balance, 0);
  const grossProfit = totalRevenue - totalHPP;

  const opexAccounts = coaList.filter(a => a.category === 'Beban Operasional');
  const totalOpex = opexAccounts.reduce((sum, a) => sum + a.balance, 0);
  const netIncome = grossProfit - totalOpex;

  // Balance sheet calculations
  const currentAssets = coaList.filter(a => a.category === 'Aktiva Lancar').reduce((sum, a) => sum + a.balance, 0);
  const fixedAssets = coaList.filter(a => a.category === 'Aktiva Tetap').reduce((sum, a) => sum + a.balance, 0);
  const totalAssets = currentAssets + fixedAssets;

  const liabilities = coaList.filter(a => a.category === 'Kewajiban').reduce((sum, a) => sum + a.balance, 0);
  const equityAccounts = coaList.filter(a => a.category === 'Modal');
  const totalEquity = equityAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilitiesAndEquity = liabilities + totalEquity + (netIncome > 0 ? netIncome : 0);

  const filteredCOA = coaList.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.code.includes(searchQuery) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Standar SAK ETAP</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{coaList.length} Akun Standar</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Akuntansi Keuangan (SAK ETAP)
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Bagan akun baku operasional travel haji &amp; umrah, otomasi jurnal transaksi, laporan laba rugi, dan neraca.
          </p>
        </div>

        <button
          onClick={onOpenNewJournal}
          className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Jurnal Penyesuaian Manual</span>
        </button>
      </div>

      {/* Segmented Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveTab('coa')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'coa'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Bagan Akun ({coaList.length})
        </button>
        <button
          onClick={() => setActiveTab('journals')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'journals'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Jurnal Umum ({journals.length})
        </button>
        <button
          onClick={() => setActiveTab('pl')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'pl'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Laporan Laba Rugi
        </button>
        <button
          onClick={() => setActiveTab('balance')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'balance'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Neraca Keuangan
        </button>
        <button
          onClick={() => setActiveTab('kloterMargin')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'kloterMargin'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Analisis Margin Kloter
        </button>
      </div>

      {/* TAB 1: Chart of Accounts */}
      {activeTab === 'coa' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
              Chart of Accounts Standar Khusus Biro Perjalanan Ibadah Umrah (PPIU)
            </span>
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama akun atau kode..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-3 px-4">Kode Akun</th>
                    <th className="py-3 px-3">Nama Akun SAK ETAP</th>
                    <th className="py-3 px-3">Kategori</th>
                    <th className="py-3 px-3">Posisi Normal</th>
                    <th className="py-3 px-4 text-right">Saldo Buku</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {filteredCOA.map(a => (
                    <tr key={a.code} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-zinc-900 dark:text-zinc-200">{a.code}</td>
                      <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-white">{a.name}</td>
                      <td className="py-3 px-3 text-zinc-500 dark:text-zinc-400 text-xs">{a.category}</td>
                      <td className="py-3 px-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${a.normalBalance === 'Debit' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300' : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'}`}>
                          {a.normalBalance}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-zinc-900 dark:text-white tabular-nums">
                        {formatIdr(a.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Journals */}
      {activeTab === 'journals' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">Buku Jurnal Umum (Audit Trail)</h3>
            <div className="space-y-3">
              {journals.map(j => (
                <div key={j.id} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-xs bg-zinc-50 dark:bg-zinc-800/50 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-2.5 mb-2.5 gap-1">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-zinc-900 dark:text-zinc-200">{j.referenceNo}</span>
                        <span className="text-zinc-400" aria-hidden="true">·</span>
                        <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{j.isAutoGenerated ? 'Sistem Otomatis (Kasir)' : 'Penyesuaian Manual'}</span>
                        {j.kloterCode && (
                          <>
                            <span className="text-zinc-400" aria-hidden="true">·</span>
                            <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-mono font-semibold">{j.kloterCode}</span>
                          </>
                        )}
                      </div>
                      <p className="text-zinc-900 dark:text-white font-medium mt-1">{j.description}</p>
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-400 font-mono text-[11px]">{j.date}</span>
                  </div>

                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase border-b border-zinc-200 dark:border-zinc-800">
                        <th className="py-1">Akun SAK ETAP</th>
                        <th className="py-1 text-right">Debit</th>
                        <th className="py-1 text-right">Kredit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                      {j.lines.map((l, idx) => (
                        <tr key={idx} className="text-zinc-700 dark:text-zinc-300">
                          <td className="py-2">
                            <span className="font-mono text-zinc-500 dark:text-zinc-400 text-[11px] mr-2">{l.accountCode}</span>
                            <span className={l.credit > 0 ? 'pl-4 text-zinc-600 dark:text-zinc-400' : 'text-zinc-900 dark:text-white font-medium'}>
                              {l.accountName}
                            </span>
                          </td>
                          <td className="py-2 text-right font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">
                            {l.debit > 0 ? formatIdr(l.debit) : '-'}
                          </td>
                          <td className="py-2 text-right font-mono tabular-nums text-zinc-800 dark:text-zinc-300">
                            {l.credit > 0 ? formatIdr(l.credit) : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Profit & Loss (Laba Rugi) */}
      {activeTab === 'pl' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase">{currentTenant.companyName}</h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-0.5">LAPORAN LABA RUGI KOMPREHENSIF (SAK ETAP)</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Periode Berjalan Tahun 1448 H / 2026</p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Revenue */}
            <div>
              <div className="flex justify-between items-center font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                <span>PENDAPATAN OPERASIONAL</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatIdr(totalRevenue)}</span>
              </div>
              <div className="space-y-1.5 pl-3">
                {revenueAccounts.map(a => (
                  <div key={a.code} className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span>{a.code} - {a.name}</span>
                    <span className="font-mono">{formatIdr(a.balance)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* HPP */}
            <div>
              <div className="flex justify-between items-center font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                <span>BEBAN POKOK PENDAPATAN (HPP)</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">({formatIdr(totalHPP)})</span>
              </div>
              <div className="space-y-1.5 pl-3">
                {hppAccounts.map(a => (
                  <div key={a.code} className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span>{a.code} - {a.name}</span>
                    <span className="font-mono">({formatIdr(a.balance)})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gross Profit */}
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center font-bold text-sm">
              <span className="text-zinc-900 dark:text-white">LABA KOTOR (GROSS PROFIT)</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatIdr(grossProfit)}</span>
            </div>

            {/* Opex */}
            <div>
              <div className="flex justify-between items-center font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-2">
                <span>BEBAN OPERASIONAL &amp; UMUM</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">({formatIdr(totalOpex)})</span>
              </div>
              <div className="space-y-1.5 pl-3">
                {opexAccounts.map(a => (
                  <div key={a.code} className="flex justify-between text-zinc-700 dark:text-zinc-300">
                    <span>{a.code} - {a.name}</span>
                    <span className="font-mono">({formatIdr(a.balance)})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Net Income */}
            <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex justify-between items-center font-bold text-base">
              <span className="text-zinc-900 dark:text-white">LABA BERSIH PERIODE BERJALAN</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatIdr(netIncome)}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Balance Sheet (Neraca) */}
      {activeTab === 'balance' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="text-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white uppercase">{currentTenant.companyName}</h3>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold mt-0.5">NERACA KEUANGAN (BALANCE SHEET)</p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">Per 31 Oktober 2026 (Standar SAK ETAP)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Left: Assets */}
            <div className="space-y-4">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-1 font-bold text-zinc-900 dark:text-white flex justify-between">
                <span>AKTIVA (ASSETS)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatIdr(totalAssets)}</span>
              </div>
              <div className="space-y-2">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-[11px] uppercase tracking-wider block">Aktiva Lancar:</span>
                {coaList.filter(a => a.category === 'Aktiva Lancar').map(a => (
                  <div key={a.code} className="flex justify-between text-zinc-600 dark:text-zinc-300 pl-2">
                    <span>{a.name}</span>
                    <span className="font-mono">{formatIdr(a.balance)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Liabilities & Equity */}
            <div className="space-y-4">
              <div className="border-b border-zinc-200 dark:border-zinc-800 pb-1 font-bold text-zinc-900 dark:text-white flex justify-between">
                <span>KEWAJIBAN &amp; MODAL</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">{formatIdr(totalLiabilitiesAndEquity)}</span>
              </div>
              <div className="space-y-2">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-[11px] uppercase tracking-wider block">Kewajiban:</span>
                {coaList.filter(a => a.category === 'Kewajiban').map(a => (
                  <div key={a.code} className="flex justify-between text-zinc-600 dark:text-zinc-300 pl-2">
                    <span>{a.name}</span>
                    <span className="font-mono">{formatIdr(a.balance)}</span>
                  </div>
                ))}

                <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-[11px] uppercase tracking-wider block pt-2">Ekuitas &amp; Modal:</span>
                {equityAccounts.map(a => (
                  <div key={a.code} className="flex justify-between text-zinc-600 dark:text-zinc-300 pl-2">
                    <span>{a.name}</span>
                    <span className="font-mono">{formatIdr(a.balance)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold pl-2">
                  <span>Laba Bersih Tahun Berjalan</span>
                  <span className="font-mono">{formatIdr(netIncome)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Kloter Margin */}
      {activeTab === 'kloterMargin' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">Analisis Profitabilitas Per Kloter</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map(p => {
              const estimatedRevenue = p.bookedSeats * (p.tiers[0]?.priceIdr || 32000000);
              const estimatedCost = p.bookedSeats * 24000000;
              const margin = estimatedRevenue - estimatedCost;
              const marginPercent = estimatedRevenue > 0 ? Math.round((margin / estimatedRevenue) * 100) : 0;

              return (
                <div key={p.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-800 text-xs space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-zinc-900 dark:text-white text-sm block">{p.title}</span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">{p.kloterCode} · {p.bookedSeats} Kursi Terisi</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      {marginPercent}% Margin
                    </span>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700/70 space-y-1 font-mono">
                    <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                      <span>Estimasi Omzet:</span>
                      <span className="text-zinc-900 dark:text-white">{formatIdr(estimatedRevenue)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                      <span>Estimasi HPP:</span>
                      <span className="text-rose-600 dark:text-rose-400">({formatIdr(estimatedCost)})</span>
                    </div>
                    <div className="flex justify-between text-zinc-800 dark:text-zinc-200 font-bold pt-1 border-t border-zinc-200 dark:border-zinc-700">
                      <span>Proyeksi Laba Kotor:</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{formatIdr(margin)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
