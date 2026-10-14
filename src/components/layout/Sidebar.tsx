import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Plane, 
  Users, 
  Receipt, 
  Calculator, 
  Boxes, 
  MessageSquare, 
  Award, 
  Globe, 
  Layers, 
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  Lock
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { 
    currentView, 
    setCurrentView, 
    currentTenant, 
    currentUserRole,
    jamaahList,
    packages,
    leads
  } = useApp();

  // Navigation sections matching Cruip Mosaic grouping
  const sections = [
    {
      title: 'Utama',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard Eksekutif',
          icon: LayoutDashboard,
          moduleKey: null,
          allowedRoles: ['super_admin', 'owner', 'admin_ops', 'kasir', 'sales', 'gudang'],
          badge: null
        }
      ]
    },
    {
      title: 'Operasional Haji & Umrah',
      items: [
        {
          id: 'packages',
          label: 'Paket & Kloter',
          icon: Plane,
          moduleKey: 'packages',
          allowedRoles: ['super_admin', 'owner', 'admin_ops', 'sales', 'agen'],
          badge: `${packages.length}`
        },
        {
          id: 'jamaah',
          label: 'Manifes & Jamaah',
          icon: Users,
          moduleKey: 'jamaah',
          allowedRoles: ['super_admin', 'owner', 'admin_ops', 'kasir', 'sales', 'agen'],
          badge: `${jamaahList.length}`
        },
        {
          id: 'inventory',
          label: 'Gudang Perlengkapan',
          icon: Boxes,
          moduleKey: 'inventory',
          allowedRoles: ['super_admin', 'owner', 'admin_ops', 'gudang'],
          badge: null
        }
      ]
    },
    {
      title: 'Keuangan & SAK ETAP',
      items: [
        {
          id: 'payments',
          label: 'Kasir & Kuitansi',
          icon: Receipt,
          moduleKey: 'payments',
          allowedRoles: ['super_admin', 'owner', 'kasir'],
          badge: null
        },
        {
          id: 'accounting',
          label: 'Akuntansi SAK ETAP',
          icon: Calculator,
          moduleKey: 'accounting',
          allowedRoles: ['super_admin', 'owner', 'kasir'],
          badge: 'ETAP'
        }
      ]
    },
    {
      title: 'Marketing & Keagenan',
      items: [
        {
          id: 'crm',
          label: 'CRM & Broadcast WA',
          icon: MessageSquare,
          moduleKey: 'crmBroadcast',
          allowedRoles: ['super_admin', 'owner', 'sales', 'admin_ops'],
          badge: `${leads.length}`
        },
        {
          id: 'agency',
          label: 'Keagenan & Komisi',
          icon: Award,
          moduleKey: 'agency',
          allowedRoles: ['super_admin', 'owner', 'sales', 'agen'],
          badge: null
        }
      ]
    },
    {
      title: 'Sistem & Portal',
      items: [
        {
          id: 'public_b2c',
          label: 'Website Booking Jamaah',
          icon: Globe,
          moduleKey: null,
          allowedRoles: ['super_admin', 'owner', 'admin_ops', 'sales', 'jamaah', 'agen'],
          badge: 'B2C'
        },
        {
          id: 'super_admin',
          label: 'SaaS Platform Master',
          icon: Layers,
          moduleKey: null,
          allowedRoles: ['super_admin'],
          badge: 'SaaS'
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-zinc-950/60 dark:bg-black/70 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container (Cruip Mosaic Style in Neutral Zinc) */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 lg:static
        w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col shrink-0
        transition-transform duration-200 ease-in-out select-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-xs"
              style={{ backgroundColor: currentTenant.branding.primaryColor }}
            >
              <span className="font-arabic text-lg leading-none">ح</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-zinc-900 dark:text-white font-sans">HAJRAH</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                  ERP
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono truncate max-w-[130px]">
                {currentTenant.subdomain}.hajrah.id
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {sections.map((section, idx) => {
            // Filter items based on user role and tenant modules
            const visibleItems = section.items.filter(item => {
              if (item.id === 'super_admin' && currentUserRole !== 'super_admin') return false;
              if (currentUserRole !== 'super_admin' && !item.allowedRoles.includes(currentUserRole)) {
                return false;
              }
              return true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={idx} className="space-y-1">
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  {section.title}
                </div>
                {visibleItems.map(item => {
                  const isModuleEnabled = !item.moduleKey || currentTenant.modules[item.moduleKey as keyof typeof currentTenant.modules];
                  const isActive = currentView === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      disabled={!isModuleEnabled}
                      onClick={() => {
                        setCurrentView(item.id);
                        if (window.innerWidth < 1024) {
                          setSidebarOpen(false);
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group
                        ${isActive 
                          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold border-l-2 border-zinc-900 dark:border-zinc-100 shadow-2xs' 
                          : isModuleEnabled
                            ? 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                            : 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive 
                            ? 'text-zinc-900 dark:text-zinc-100' 
                            : isModuleEnabled 
                              ? 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200' 
                              : 'text-zinc-400 dark:text-zinc-600'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {!isModuleEnabled && (
                          <Lock className="w-3 h-3 text-zinc-400 dark:text-zinc-600" />
                        )}
                        {item.badge && isModuleEnabled && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                            isActive
                              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
                              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Tenant Active PPIU Card Footer */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
          <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-750 flex items-center justify-between shadow-2xs">
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                  {currentTenant.name}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono mt-0.5 truncate">
                PPIU: {currentTenant.branding.ppiuNumber}
              </p>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              Aktif
            </span>
          </div>
        </div>

      </aside>
    </>
  );
};
