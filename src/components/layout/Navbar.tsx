import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ChevronDown, 
  Globe, 
  Search, 
  Bell, 
  Plus, 
  ExternalLink,
  Layers,
  ShieldAlert,
  User,
  LogOut,
  HelpCircle,
  Menu,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import { RoleType } from '../../types';

interface NavbarProps {
  onOpenCreateTenant: () => void;
  onOpenSearch: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCreateTenant, 
  onOpenSearch, 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const { 
    tenants, 
    currentTenant, 
    setCurrentTenantId, 
    currentUserRole, 
    setCurrentUserRole,
    currentView,
    setCurrentView,
    jamaahList,
    payments,
    theme,
    toggleTheme
  } = useApp();

  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const tenantRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tenantRef.current && !tenantRef.current.contains(event.target as Node)) {
        setTenantDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { id: RoleType; label: string; desc: string; badge: string }[] = [
    { id: 'owner', label: 'Direktur / Owner', desc: 'Akses penuh laporan dan operasional', badge: 'Direksi' },
    { id: 'admin_ops', label: 'Admin Operasional', desc: 'Kelola paket, manifes jamaah, visa & hotel', badge: 'Operasional' },
    { id: 'kasir', label: 'Kasir & Keuangan', desc: 'Input pembayaran, kuitansi & SAK ETAP', badge: 'Keuangan' },
    { id: 'sales', label: 'Tim Sales / Marketing', desc: 'CRM prospek, broadcast WA & follow-up', badge: 'Sales' },
    { id: 'agen', label: 'Mitra Agen', desc: 'Cek sisa kuota seat & klaim komisi', badge: 'Keagenan' },
    { id: 'gudang', label: 'Petugas Gudang', desc: 'Stok koper, mukena & seragam', badge: 'Logistik' },
    { id: 'jamaah', label: 'Portal Jamaah (B2C)', desc: 'Tampilan website pemesanan mandiri', badge: 'Publik' },
    { id: 'super_admin', label: 'Super Admin (SaaS)', desc: 'Manajemen biro travel, lisensi & modul', badge: 'SaaS Platform' }
  ];

  // Recent system notifications for notification popover
  const recentAlerts = [
    {
      id: '1',
      title: 'Peringatan Paspor Jamaah',
      desc: '3 paspor jamaah kloter Nov 2026 kurang dari 6 bulan',
      time: '10m lalu',
      type: 'warning'
    },
    {
      id: '2',
      title: 'Pembayaran DP Masuk',
      desc: 'Hj. Siti Aminah transfer DP Rp 10.000.000 (BCA)',
      time: '45m lalu',
      type: 'success'
    },
    {
      id: '3',
      title: 'Siskopatuh Sinkronisasi',
      desc: 'Manifes Kloter 1 berhasil diekspor sesuai format Kemenag',
      time: '2 jam lalu',
      type: 'info'
    }
  ];

  const currentRoleInfo = roles.find(r => r.id === currentUserRole) || roles[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Sidebar Toggle + Instant Search Trigger (Cruip Mosaic Style) */}
          <div className="flex items-center gap-3">
            {/* Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none transition"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Quick Search Trigger Input (Cruip Search Bar with ⌘K) */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center gap-2.5 w-64 md:w-80 lg:w-96 px-3.5 py-1.5 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200/70 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 rounded-lg transition text-left group"
            >
              <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition" />
              <span className="flex-1 truncate">Cari jamaah, paspor, paket, kuitansi...</span>
              <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Right: Tenant Switcher, Role Simulator, Theme Toggle, Notifications, User Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Mobile Search Button */}
            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark & Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition shadow-2xs"
              title={theme === 'dark' ? 'Ganti ke Mode Terang (Light Mode)' : 'Ganti ke Mode Gelap (Dark Mode)'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-zinc-700" />
              )}
            </button>

            {/* Tenant Selector Dropdown (Cruip Brand Dropdown) */}
            <div className="relative" ref={tenantRef}>
              <button
                onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
                className="flex items-center gap-2 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 px-3 py-1.5 rounded-lg transition"
              >
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white dark:ring-zinc-900" 
                  style={{ backgroundColor: currentTenant.branding.primaryColor }}
                />
                <span className="font-semibold max-w-[120px] md:max-w-[150px] truncate">
                  {currentTenant.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 transition-transform ${tenantDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {tenantDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-2 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                    <span>Biro Travel Aktif</span>
                    <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{tenants.length} Tenant</span>
                  </div>
                  <div className="py-1.5 space-y-1 max-h-60 overflow-y-auto">
                    {tenants.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setCurrentTenantId(t.id);
                          setTenantDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition ${
                          t.id === currentTenant.id 
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold border border-zinc-200 dark:border-zinc-700' 
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span 
                            className="w-3 h-3 rounded-full shrink-0" 
                            style={{ backgroundColor: t.branding.primaryColor }}
                          />
                          <div className="truncate">
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{t.name}</p>
                            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                              PPIU: {t.branding.ppiuNumber}
                            </p>
                          </div>
                        </div>
                        {t.id === currentTenant.id && (
                          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 mt-1">
                    <button
                      onClick={() => {
                        setTenantDropdownOpen(false);
                        onOpenCreateTenant();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 rounded-lg font-semibold transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Biro Travel Baru</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Role Simulator Pill & Dropdown (Cruip Badge Switcher) */}
            <div className="relative" ref={roleRef}>
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200/70 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1.5 rounded-lg transition"
                title="Simulasi Peran / Akses Pengguna"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-medium hidden sm:inline">{currentRoleInfo.label}</span>
                <span className="font-medium sm:hidden">{currentRoleInfo.badge}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-2 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                    Simulasi Akses Peran (RBAC)
                  </div>
                  <div className="py-1.5 space-y-1 max-h-64 overflow-y-auto">
                    {roles.map(r => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setCurrentUserRole(r.id);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs transition ${
                          r.id === currentUserRole 
                            ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold shadow-xs' 
                            : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{r.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                            r.id === currentUserRole 
                              ? 'bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800' 
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                          }`}>
                            {r.badge}
                          </span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${r.id === currentUserRole ? 'text-zinc-200 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400'}`}>
                          {r.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Popover (Cruip Bell Icon with Badge) */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-zinc-900"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800 mb-2">
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200">Notifikasi &amp; Kepatuhan</span>
                    <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded font-semibold">3 Baru</span>
                  </div>
                  <div className="space-y-2">
                    {recentAlerts.map(a => (
                      <div key={a.id} className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-200">{a.title}</span>
                          <span className="text-[10px] text-zinc-400">{a.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Public Portal Switcher */}
            <button
              onClick={() => setCurrentView(currentView === 'public_b2c' ? 'dashboard' : 'public_b2c')}
              className={`hidden md:flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border transition font-medium ${
                currentView === 'public_b2c'
                  ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              title="Tampilkan Portal Pemesanan Publik (B2C)"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Web Jamaah</span>
            </button>

            {/* User Profile Avatar Dropdown (Cruip User Menu) */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-800 dark:bg-zinc-700 text-white flex items-center justify-center font-bold text-xs ring-2 ring-zinc-300 dark:ring-zinc-600">
                  HA
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 leading-tight">H. Ahmad D.</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 capitalize">{currentUserRole.replace('_', ' ')}</p>
                </div>
                <ChevronDown className="w-3 h-3 text-zinc-400 hidden lg:block" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">H. Ahmad Dahlan, S.E.</p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">ahmad@almabrur.co.id</p>
                    <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                      {currentTenant.name}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        setCurrentView('super_admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-zinc-400" />
                      <span>SaaS Platform Admin</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('public_b2c');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg flex items-center gap-2 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Buka Web Booking B2C</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
