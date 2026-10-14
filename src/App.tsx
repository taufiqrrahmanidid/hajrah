import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { SearchModal } from './components/common/SearchModal';
import { DashboardModule } from './components/modules/DashboardModule';
import { PackagesModule } from './components/modules/PackagesModule';
import { JamaahModule } from './components/modules/JamaahModule';
import { BookingPaymentModule } from './components/modules/BookingPaymentModule';
import { AccountingModule } from './components/modules/AccountingModule';
import { InventoryModule } from './components/modules/InventoryModule';
import { CrmBroadcastModule } from './components/modules/CrmBroadcastModule';
import { AgencyModule } from './components/modules/AgencyModule';
import { SuperAdminModule } from './components/modules/SuperAdminModule';
import { PublicB2CModule } from './components/modules/PublicB2CModule';

import { CreateTenantModal } from './components/modals/CreateTenantModal';
import { RegisterJamaahModal } from './components/modals/RegisterJamaahModal';
import { NewPackageModal } from './components/modals/NewPackageModal';
import { NewPaymentModal } from './components/modals/NewPaymentModal';
import { NewJournalModal } from './components/modals/NewJournalModal';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  // Layout states (Cruip Mosaic Style)
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Modals state
  const [createTenantOpen, setCreateTenantOpen] = useState(false);
  const [registerJamaahOpen, setRegisterJamaahOpen] = useState(false);
  const [newPackageOpen, setNewPackageOpen] = useState(false);
  const [newPaymentOpen, setNewPaymentOpen] = useState(false);
  const [newJournalOpen, setNewJournalOpen] = useState(false);
  const [defaultPackageForRegister, setDefaultPackageForRegister] = useState<string | undefined>(undefined);

  // Global keyboard shortcut for Search (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If viewing the public B2C portal, show full-screen branded website
  if (currentView === 'public_b2c') {
    return (
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-2 sm:p-4 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
        <PublicB2CModule />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex font-sans antialiased transition-colors duration-200">
      
      {/* Cruip Sidebar in Neutral Zinc */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Cruip Top Navbar with Theme Toggle */}
        <Navbar 
          onOpenCreateTenant={() => setCreateTenantOpen(true)}
          onOpenSearch={() => setSearchModalOpen(true)}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {currentView === 'dashboard' && (
            <DashboardModule
              onOpenRegisterJamaah={() => {
                setDefaultPackageForRegister(undefined);
                setRegisterJamaahOpen(true);
              }}
              onOpenNewPackage={() => setNewPackageOpen(true)}
              onOpenPaymentModal={() => setNewPaymentOpen(true)}
            />
          )}

          {currentView === 'packages' && (
            <PackagesModule
              onOpenNewPackage={() => setNewPackageOpen(true)}
              onOpenRegisterJamaahForPackage={(pkgId) => {
                setDefaultPackageForRegister(pkgId);
                setRegisterJamaahOpen(true);
              }}
            />
          )}

          {currentView === 'jamaah' && (
            <JamaahModule
              onOpenRegisterJamaah={() => {
                setDefaultPackageForRegister(undefined);
                setRegisterJamaahOpen(true);
              }}
            />
          )}

          {currentView === 'payments' && (
            <BookingPaymentModule
              onOpenPaymentModal={() => setNewPaymentOpen(true)}
            />
          )}

          {currentView === 'accounting' && (
            <AccountingModule
              onOpenNewJournal={() => setNewJournalOpen(true)}
            />
          )}

          {currentView === 'inventory' && (
            <InventoryModule />
          )}

          {currentView === 'crm' && (
            <CrmBroadcastModule />
          )}

          {currentView === 'agency' && (
            <AgencyModule />
          )}

          {currentView === 'super_admin' && (
            <SuperAdminModule
              onOpenCreateTenant={() => setCreateTenantOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Cruip ⌘K Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Global Modals */}
      <CreateTenantModal
        isOpen={createTenantOpen}
        onClose={() => setCreateTenantOpen(false)}
      />

      <RegisterJamaahModal
        isOpen={registerJamaahOpen}
        onClose={() => setRegisterJamaahOpen(false)}
        defaultPackageId={defaultPackageForRegister}
      />

      <NewPackageModal
        isOpen={newPackageOpen}
        onClose={() => setNewPackageOpen(false)}
      />

      <NewPaymentModal
        isOpen={newPaymentOpen}
        onClose={() => setNewPaymentOpen(false)}
      />

      <NewJournalModal
        isOpen={newJournalOpen}
        onClose={() => setNewJournalOpen(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
