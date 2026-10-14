import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plus, 
  Settings, 
  ToggleLeft, 
  ToggleRight, 
  Palette, 
  CheckCircle2, 
  Building2, 
  Layers, 
  ShieldCheck, 
  Globe, 
  ExternalLink, 
  Lock 
} from 'lucide-react';
import { Tenant, TenantModules } from '../../types';

export const SuperAdminModule: React.FC<{
  onOpenCreateTenant: () => void;
}> = ({ onOpenCreateTenant }) => {
  const { 
    tenants, 
    currentTenant, 
    setCurrentTenantId, 
    toggleTenantModule, 
    updateTenantBranding,
    setCurrentView 
  } = useApp();

  const [selectedTenantForEdit, setSelectedTenantForEdit] = useState<Tenant>(currentTenant);
  const [activeTab, setActiveTab] = useState<'tenants' | 'whitelabel' | 'modules'>('tenants');
  const [successNote, setSuccessNote] = useState<string | null>(null);

  // White label edit state
  const [brandColor, setBrandColor] = useState(selectedTenantForEdit.branding.primaryColor);
  const [companyName, setCompanyName] = useState(selectedTenantForEdit.companyName);
  const [ppiuNumber, setPpiuNumber] = useState(selectedTenantForEdit.branding.ppiuNumber);
  const [tagline, setTagline] = useState(selectedTenantForEdit.branding.tagline);
  const [phone, setPhone] = useState(selectedTenantForEdit.branding.phone);
  const [address, setAddress] = useState(selectedTenantForEdit.branding.address);

  const handleSelectTenant = (tenant: Tenant) => {
    setSelectedTenantForEdit(tenant);
    setBrandColor(tenant.branding.primaryColor);
    setCompanyName(tenant.companyName);
    setPpiuNumber(tenant.branding.ppiuNumber);
    setTagline(tenant.branding.tagline);
    setPhone(tenant.branding.phone);
    setAddress(tenant.branding.address);
  };

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateTenantBranding(selectedTenantForEdit.id, {
      primaryColor: brandColor,
      ppiuNumber,
      tagline,
      phone,
      address
    });
    setSuccessNote(`Pengaturan White-Label untuk ${selectedTenantForEdit.name} berhasil diperbarui.`);
    setTimeout(() => setSuccessNote(null), 4000);
  };

  const moduleDefinitions: { key: keyof TenantModules; label: string; desc: string }[] = [
    { key: 'packages', label: 'Modul Paket & Kloter', desc: 'Konfigurasi Quad, Triple, Double, Maskapai & Hotel' },
    { key: 'jamaah', label: 'Modul Manifes & DMS', desc: 'Validasi paspor (< 6 bulan), KTP, Vaksin Meningitis' },
    { key: 'payments', label: 'Modul Kasir & Kuitansi', desc: 'Penerbitan kuitansi resmi ber-QR Code & angsuran' },
    { key: 'accounting', label: 'Modul Akuntansi SAK ETAP', desc: 'Auto-journaling, COA baku, Laba Rugi & Neraca' },
    { key: 'inventory', label: 'Modul Gudang & Perlengkapan', desc: 'Stok koper, kain ihram, mukena & bundling 1 set' },
    { key: 'crmBroadcast', label: 'Modul CRM & Broadcast WA', desc: 'Pipeline prospek calon jamaah & broadcast gateway' },
    { key: 'agency', label: 'Modul Keagenan & Komisi', desc: 'Komisi bertingkat (overriding) & pencairan mitra' },
    { key: 'iso9001', label: 'Modul Mutu ISO 9001:2015', desc: 'Kuesioner evaluasi kepuasan jamaah pasca-kepulangan' }
  ];

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* SaaS Admin Header */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <span className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-md">
            Super-Admin SaaS Console
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-1.5">
            Manajemen Multi-Tenant Biro Travel
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 max-w-xl">
            Provisioning biro travel baru, pengaturan identitas white-label, dan aktivasi modul per tenant secara dinamis.
          </p>
        </div>

        <button
          onClick={onOpenCreateTenant}
          className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Provisioning Biro Baru</span>
        </button>
      </div>

      {successNote && (
        <div className="bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs p-3.5 rounded-xl flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Global SaaS Platform Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Biro Travel Terdaftar</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">{tenants.length} Biro</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Multi-schema tenant isolation</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Jamaah Platform</span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums mt-1">
            {tenants.reduce((sum, t) => sum + t.currentJamaahCount, 0)} Jamaah
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Di seluruh tenant aktif</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Paket Langganan</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono tabular-nums mt-1">
            {tenants.filter(t => t.plan === 'Enterprise').length} Enterprise
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">{tenants.filter(t => t.plan === 'Pro').length} Pro · {tenants.filter(t => t.plan === 'Lite').length} Lite</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Master Data Seeder</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white font-mono mt-1">Aktif</div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">COA SAK ETAP &amp; Hotel Saudi</p>
        </div>
      </div>

      {/* Segmented Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xs">
        <button
          onClick={() => setActiveTab('tenants')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'tenants'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Daftar Tenant ({tenants.length})
        </button>
        <button
          onClick={() => setActiveTab('whitelabel')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'whitelabel'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Konfigurasi White-Label
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'modules'
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
              : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
          }`}
        >
          Aktivasi Modul (Feature Toggles)
        </button>
      </div>

      {/* TAB 1: TENANTS LIST */}
      {activeTab === 'tenants' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="py-3 px-4">Nama Biro Travel &amp; Legalitas</th>
                  <th className="py-3 px-3">Subdomain</th>
                  <th className="py-3 px-3">Paket</th>
                  <th className="py-3 px-3">Kuota Jamaah</th>
                  <th className="py-3 px-3">Masa Berlaku</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {tenants.map(t => (
                  <tr key={t.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span 
                          className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-zinc-200 dark:ring-zinc-800" 
                          style={{ backgroundColor: t.branding.primaryColor }}
                        />
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">{t.name}</div>
                          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {t.companyName} · PPIU: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{t.branding.ppiuNumber}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-800 dark:text-zinc-200">
                      {t.subdomain}.hajrah.id
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        t.plan === 'Enterprise'
                          ? 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20'
                          : t.plan === 'Pro'
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700'
                      }`}>
                        {t.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-700 dark:text-zinc-300">
                      {t.currentJamaahCount} / {t.maxJamaahQuota} Seat
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-500 dark:text-zinc-400 text-[11px]">
                      {t.expiresAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {t.id !== currentTenant.id ? (
                          <button
                            onClick={() => setCurrentTenantId(t.id)}
                            className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs px-2.5 py-1.5 rounded-lg font-medium transition"
                          >
                            Buka Biro
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                            Sedang Aktif
                          </span>
                        )}
                        <button
                          onClick={() => {
                            handleSelectTenant(t);
                            setActiveTab('whitelabel');
                          }}
                          className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-xs px-2.5 py-1.5 rounded-lg font-medium transition"
                        >
                          Kelola
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: WHITE-LABEL BRANDING */}
      {activeTab === 'whitelabel' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
              <span>Identitas White-Label: {selectedTenantForEdit.name}</span>
            </h3>

            <form onSubmit={handleSaveBranding} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Nama Perusahaan (PT)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Nomor Izin Kemenag (PPIU / PIHK)</label>
                  <input
                    type="text"
                    value={ppiuNumber}
                    onChange={(e) => setPpiuNumber(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Warna Primer Brand (Hex Code)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-zinc-200 dark:border-zinc-700 p-1"
                  />
                  <input
                    type="text"
                    value={brandColor}
                    onChange={(e) => setBrandColor(e.target.value)}
                    className="w-32 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  />
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Akan diterapkan ke seluruh antarmuka portal B2C, sidebar ERP, dan kuitansi resmi.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Tagline Promosi</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Hotline WhatsApp / Telepon</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Alamat Kantor Utama</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  type="submit"
                  className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold py-2 px-5 rounded-lg shadow-sm transition"
                >
                  Simpan Perubahan Branding
                </button>
              </div>
            </form>
          </div>

          {/* Preview Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <h4 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
              Pratinjau Kartu Biro
            </h4>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-xs"
                  style={{ backgroundColor: brandColor }}
                >
                  ح
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{selectedTenantForEdit.name}</h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">PPIU: {ppiuNumber}</p>
                </div>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 italic">"{tagline}"</p>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-2 space-y-0.5">
                <p>Domain: <span className="text-zinc-800 dark:text-zinc-200 font-mono">{selectedTenantForEdit.subdomain}.hajrah.id</span></p>
                <p>Kontak: <span className="font-mono text-zinc-800 dark:text-zinc-200">{phone}</span></p>
                <p>Alamat: <span className="text-zinc-800 dark:text-zinc-200">{address}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FEATURE TOGGLES */}
      {activeTab === 'modules' && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 gap-2">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Pengaturan Modul: {selectedTenantForEdit.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Aktifkan atau nonaktifkan fitur ERP sesuai paket langganan biro travel bersangkutan.
              </p>
            </div>
            <select
              value={selectedTenantForEdit.id}
              onChange={(e) => {
                const t = tenants.find(x => x.id === e.target.value);
                if (t) handleSelectTenant(t);
              }}
              className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
            >
              {tenants.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleDefinitions.map(mod => {
              const isEnabled = selectedTenantForEdit.modules[mod.key];

              return (
                <div 
                  key={mod.key} 
                  className={`p-4 rounded-xl border transition flex items-center justify-between gap-3 ${
                    isEnabled 
                      ? 'bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-750' 
                      : 'bg-zinc-100/50 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800 opacity-60'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-zinc-900 dark:text-white text-xs block">{mod.label}</span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">{mod.desc}</span>
                  </div>

                  <button
                    onClick={() => toggleTenantModule(selectedTenantForEdit.id, mod.key)}
                    className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition"
                    title={isEnabled ? 'Nonaktifkan Modul' : 'Aktifkan Modul'}
                  >
                    {isEnabled ? (
                      <ToggleRight className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
