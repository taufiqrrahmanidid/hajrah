import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Boxes, 
  Plus, 
  Minus, 
  PackageCheck, 
  Search, 
  CheckCircle2,
  Warehouse,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const InventoryModule: React.FC = () => {
  const { inventory, updateInventoryStock, formatIdr } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const categories = ['Semua', 'Perlengkapan Utama', 'Pakaian Ibadah', 'Aksesoris', 'Buku Panduan'];

  const filteredInventory = inventory.filter(item => {
    const matchesCat = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalAssetValue = inventory.reduce((sum, item) => {
    const totalQty = item.stockPusat + item.stockBandara + item.stockCabang;
    return sum + (totalQty * item.unitCost);
  }, 0);

  const handleAssembleKit = () => {
    inventory.forEach(item => {
      if (item.stockPusat > 0) {
        updateInventoryStock(item.id, 'stockPusat', -1);
      }
    });
    setSuccessMessage('1 Set Paket Perlengkapan Umrah Lengkap siap diserahkan ke jamaah.');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Logistik &amp; Gudang</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-zinc-800 dark:text-zinc-200 font-semibold">{inventory.length} SKU Perlengkapan</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            Gudang &amp; Perlengkapan Jamaah
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Monitoring stok multi-gudang (Pusat, Bandara Soetta, Cabang), perakitan paket koper, dan estimasi nilai persediaan.
          </p>
        </div>

        <button
          onClick={handleAssembleKit}
          className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-2 shadow-xs transition self-start sm:self-auto"
        >
          <PackageCheck className="w-4 h-4" />
          <span>Rakit 1 Set Bundling</span>
        </button>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs p-3.5 rounded-xl flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Nilai Total Persediaan</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums mt-1">{formatIdr(totalAssetValue)}</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Metode pencatatan: SAK ETAP Average / FIFO</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Jumlah Item SKU</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">{inventory.length} Jenis</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Koper fiber, kain ihram, mukena bordir, seragam</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Kapasitas Bundling Siap</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">
            {Math.min(...inventory.map(i => i.stockPusat))} Set Lengkap
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Berdasarkan stok terendah di Gudang Pusat</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
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

        <div className="relative w-full md:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari SKU atau nama barang..."
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
          />
        </div>
      </div>

      {/* Inventory Items Table */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">SKU &amp; Nama Barang</th>
                <th className="py-3 px-3">Kategori &amp; Satuan</th>
                <th className="py-3 px-3 text-right">Biaya Satuan</th>
                <th className="py-3 px-3 text-center">Gudang Pusat</th>
                <th className="py-3 px-3 text-center">Bandara Soetta</th>
                <th className="py-3 px-3 text-center">Kantor Cabang</th>
                <th className="py-3 px-4 text-right">Total Stok</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {filteredInventory.map(item => {
                const totalStock = item.stockPusat + item.stockBandara + item.stockCabang;
                const isLow = totalStock < item.minThreshold;

                return (
                  <tr key={item.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-900 dark:text-white">{item.name}</div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5">{item.sku}</div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{item.category}</span>
                      <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-mono">Satuan: {item.unit}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-zinc-900 dark:text-zinc-200">
                      {formatIdr(item.unitCost)}
                    </td>

                    {/* Stock Pusat with Stepper */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
                        <button
                          onClick={() => updateInventoryStock(item.id, 'stockPusat', -1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white px-1 text-xs">{item.stockPusat}</span>
                        <button
                          onClick={() => updateInventoryStock(item.id, 'stockPusat', 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Stock Bandara with Stepper */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
                        <button
                          onClick={() => updateInventoryStock(item.id, 'stockBandara', -1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white px-1 text-xs">{item.stockBandara}</span>
                        <button
                          onClick={() => updateInventoryStock(item.id, 'stockBandara', 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Stock Cabang with Stepper */}
                    <td className="py-3.5 px-3 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1">
                        <button
                          onClick={() => updateInventoryStock(item.id, 'stockCabang', -1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white px-1 text-xs">{item.stockCabang}</span>
                        <button
                          onClick={() => updateInventoryStock(item.id, 'stockCabang', 1)}
                          className="w-5 h-5 flex items-center justify-center rounded text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="font-mono font-bold text-sm text-zinc-900 dark:text-white">{totalStock} {item.unit}</div>
                      {isLow && (
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium flex items-center justify-end gap-1 mt-0.5">
                          <AlertTriangle className="w-2.5 h-2.5" /> Stok Menipis
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
