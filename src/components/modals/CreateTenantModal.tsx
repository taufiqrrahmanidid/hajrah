import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Check, X } from 'lucide-react';

export const CreateTenantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { createTenant } = useApp();

  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [ppiuNumber, setPpiuNumber] = useState('');
  const [plan, setPlan] = useState<'Lite' | 'Pro' | 'Enterprise'>('Pro');
  const [primaryColor, setPrimaryColor] = useState('#059669');
  const [tagline, setTagline] = useState('Melayani Perjalanan Ibadah dengan Amanah');
  const [phone, setPhone] = useState('+62 812 8888 9999');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subdomain) return;

    createTenant({
      name,
      companyName: companyName || `PT ${name} Wisata Indonesia`,
      subdomain: subdomain.toLowerCase().replace(/[^a-z0-9]/g, ''),
      code: subdomain.toUpperCase().slice(0, 6),
      plan,
      branding: {
        primaryColor,
        secondaryColor: '#10b981',
        logoText: name,
        tagline: tagline || 'Melayani Tamu Allah',
        ppiuNumber: ppiuNumber || 'PPIU Kemenag RI Pending',
        address: 'Jakarta, Indonesia',
        phone,
        email: `info@${subdomain}.com`,
        domain: `${subdomain}.com`
      }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col text-zinc-900 dark:text-zinc-100 transition-colors">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Provisioning Biro Travel Baru</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Pemisahan skema database dan injeksi master data baku</p>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nama Biro Travel:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!subdomain) {
                    setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                  }
                }}
                placeholder="Contoh: Barokah Wisata"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                required
              />
            </div>

            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Subdomain Sistem:</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  placeholder="barokah"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-l-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                  required
                />
                <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-2 rounded-r-lg border border-l-0 border-zinc-300 dark:border-zinc-800 text-[11px] font-mono">
                  .hajrah.id
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nama PT Resmi:</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Contoh: PT Barokah Wisata Mandiri"
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Nomor Izin Kemenag (PPIU):</label>
              <input
                type="text"
                value={ppiuNumber}
                onChange={(e) => setPpiuNumber(e.target.value)}
                placeholder="PPIU No. 342/2022"
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-mono placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>

            <div>
              <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Paket Lisensi:</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as any)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3 py-2 text-zinc-900 dark:text-zinc-100 font-medium focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="Lite">Lite (Maks 300 Jamaah)</option>
                <option value="Pro">Pro (Maks 800 Jamaah)</option>
                <option value="Enterprise">Enterprise (Maks 2000 Jamaah)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-zinc-700 dark:text-zinc-300 block mb-1 font-medium">Warna Identitas Biro:</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-9 h-8 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 cursor-pointer p-0.5"
              />
              <span className="font-mono text-zinc-700 dark:text-zinc-300 text-xs uppercase">{primaryColor}</span>
              <div className="flex gap-1.5 ml-auto">
                {['#059669', '#0284c7', '#d97706', '#7c3aed', '#52525b'].map(c => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setPrimaryColor(c)}
                    className="w-4 h-4 rounded-full border border-black/10 dark:border-white/20 transition hover:scale-110"
                    style={{ backgroundColor: c }}
                  />
                ))}
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
              className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg font-medium transition flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>Buat Biro Baru</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
