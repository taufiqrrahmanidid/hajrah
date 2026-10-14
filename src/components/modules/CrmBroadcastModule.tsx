import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Plus, 
  Search, 
  CheckCircle2, 
  MessageSquare, 
  Users, 
  PhoneCall, 
  Sparkles, 
  ArrowRight, 
  Filter, 
  Clock,
  X
} from 'lucide-react';
import { Lead } from '../../types';

export const CrmBroadcastModule: React.FC = () => {
  const { leads, addLead, updateLeadStage, broadcasts, sendBroadcast, currentTenant } = useApp();
  const [activeTab, setActiveTab] = useState<'leads' | 'broadcast'>('leads');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Lead State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadCity, setNewLeadCity] = useState('');
  const [newLeadPackage, setNewLeadPackage] = useState('Umrah Reguler Barokah 9 Hari');
  const [newLeadSource, setNewLeadSource] = useState<Lead['source']>('Website Form');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  // Broadcast Composer State
  const [broadcastChannel, setBroadcastChannel] = useState<'WhatsApp' | 'Email'>('WhatsApp');
  const [broadcastTitle, setBroadcastTitle] = useState('Pengingat Pelunasan Tagihan Umrah');
  const [recipientGroup, setRecipientGroup] = useState('Jamaah Kloter Keberangkatan Bulan Depan');
  const [recipientCount, setRecipientCount] = useState(38);
  const [messageTemplate, setMessageTemplate] = useState(
    "Assalamu'alaikum Wr. Wb. Bpk/Ibu {{nama_jamaah}},\n\nKami dari biro {{nama_travel}} menginformasikan batas akhir pelunasan paket {{nama_paket}} adalah H-30 sebelum keberangkatan. Mohon konfirmasi bukti transfer melalui kasir kami.\n\nTerima kasih."
  );
  const [broadcastSentNotification, setBroadcastSentNotification] = useState(false);

  const stages: Lead['stage'][] = ['Lead Baru', 'Follow Up', 'Kirim Penawaran', 'Booking DP', 'Closing Lunas'];

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.includes(searchQuery) ||
    l.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName) return;

    addLead({
      name: newLeadName,
      phone: newLeadPhone || '081234567890',
      city: newLeadCity || 'Jakarta',
      interestedPackage: newLeadPackage,
      source: newLeadSource,
      stage: 'Lead Baru',
      notes: newLeadNotes || 'Prospek mendaftar via form publik',
      assignedTo: 'Sales Konsultan'
    });

    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadCity('');
    setNewLeadNotes('');
    setShowAddLeadModal(false);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    sendBroadcast({
      channel: broadcastChannel,
      title: broadcastTitle,
      recipientGroup,
      recipientCount,
      messagePreview: messageTemplate
        .replace('{{nama_travel}}', currentTenant.name)
        .replace('{{nama_jamaah}}', 'Bpk/Ibu Jamaah')
        .replace('{{nama_paket}}', 'Umrah Barokah')
    });

    setBroadcastSentNotification(true);
    setTimeout(() => setBroadcastSentNotification(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-zinc-900 dark:text-zinc-100">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>Sales &amp; CRM</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">{leads.length} Prospek Aktif</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mt-0.5">
            CRM &amp; Broadcast WhatsApp Gateway
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Manajemen saluran prospek calon jamaah, automasi follow-up manasik, dan broadcast massal WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setShowAddLeadModal(true)}
          className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Prospek Baru</span>
        </button>
      </div>

      {broadcastSentNotification && (
        <div className="bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs p-3.5 rounded-xl flex items-center gap-2.5 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Broadcast pesan WhatsApp berhasil dikirimkan ke {recipientCount} jamaah di antrean gateway.</span>
        </div>
      )}

      {/* Segmented Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'leads'
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Pipeline Prospek ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'broadcast'
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-2xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Broadcast Gateway &amp; Log ({broadcasts.length})
          </button>
        </div>

        {activeTab === 'leads' && (
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama prospek, nomor WA, kota..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 text-xs rounded-lg pl-9 pr-3 py-1.5 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
            />
          </div>
        )}
      </div>

      {/* TAB 1: Leads Pipeline */}
      {activeTab === 'leads' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stages.map(stg => {
            const stageLeads = filteredLeads.filter(l => l.stage === stg);

            return (
              <div 
                key={stg} 
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3.5 flex flex-col min-w-[240px] shadow-xs"
              >
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">{stg}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px]">
                  {stageLeads.length === 0 ? (
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500 italic text-center py-6">Belum ada prospek</p>
                  ) : (
                    stageLeads.map(lead => (
                      <div 
                        key={lead.id} 
                        className="bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-750 rounded-xl p-3 text-xs space-y-2 hover:border-zinc-300 dark:hover:border-zinc-650 transition"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-semibold text-zinc-900 dark:text-white">{lead.name}</span>
                          <span className="text-[10px] text-zinc-700 dark:text-zinc-300 font-mono bg-zinc-200/80 dark:bg-zinc-700/80 px-1.5 py-0.2 rounded">
                            {lead.source}
                          </span>
                        </div>

                        <div className="text-[11px] text-zinc-500 dark:text-zinc-400 space-y-0.5 font-mono">
                          <div>WA: {lead.phone}</div>
                          <div>Kota: {lead.city}</div>
                          <div className="text-zinc-800 dark:text-zinc-300 font-sans truncate">{lead.interestedPackage}</div>
                        </div>

                        {lead.notes && (
                          <p className="text-[10px] text-zinc-600 dark:text-zinc-400 italic bg-white dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 p-1.5 rounded">
                            "{lead.notes}"
                          </p>
                        )}

                        {/* Move stage actions */}
                        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-750/70 flex justify-end gap-1">
                          {stages.indexOf(lead.stage) > 0 && (
                            <button
                              onClick={() => updateLeadStage(lead.id, stages[stages.indexOf(lead.stage) - 1])}
                              className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white px-2 py-0.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                            >
                              ← Mundur
                            </button>
                          )}
                          {stages.indexOf(lead.stage) < stages.length - 1 && (
                            <button
                              onClick={() => updateLeadStage(lead.id, stages[stages.indexOf(lead.stage) + 1])}
                              className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition flex items-center gap-1"
                            >
                              <span>Maju</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TAB 2: WhatsApp Broadcast Composer & History */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Composer Card */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Kirim Broadcast Massal</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Saluran Pengiriman</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastChannel('WhatsApp')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      broadcastChannel === 'WhatsApp'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-750'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Gateway</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastChannel('Email')}
                    className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                      broadcastChannel === 'Email'
                        ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-2xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-750'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Email Notifikasi</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Judul Kampanye / Subjek</label>
                <input
                  type="text"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Target Segmen Penerima</label>
                <select
                  value={recipientGroup}
                  onChange={(e) => setRecipientGroup(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                >
                  <option value="Semua Jamaah Aktif">Semua Jamaah Aktif ({leads.length + 30} Kontak)</option>
                  <option value="Jamaah Kloter Keberangkatan Bulan Depan">Jamaah Kloter Keberangkatan Bulan Depan (38 Jamaah)</option>
                  <option value="Prospek Lead Baru (Belum Booking)">Prospek Lead Baru Belum Booking ({leads.filter(l => l.stage === 'Lead Baru').length} Kontak)</option>
                  <option value="Alumni Jamaah Umrah 1445-1447 H">Alumni Jamaah Umrah 1445-1447 H (Broadcast Haji Furoda)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Template Pesan WhatsApp</label>
                <textarea
                  rows={6}
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg p-3 font-mono focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 leading-relaxed"
                />
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 block">
                  Tag dinamis: {'{{nama_jamaah}}'}, {'{{nama_travel}}'}, {'{{nama_paket}}'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full btn bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Broadcast Sekarang</span>
              </button>
            </form>
          </div>

          {/* Broadcast Logs History Table */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-4">Riwayat Pengiriman Broadcast</h3>
              <div className="space-y-3">
                {broadcasts.map(b => (
                  <div key={b.id} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-750 text-xs space-y-1.5">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-zinc-900 dark:text-white">{b.title}</span>
                      <span className="text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Terkirim
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Target: <span className="text-zinc-800 dark:text-zinc-200 font-medium">{b.recipientGroup}</span> ({b.recipientCount} Penerima)
                    </p>
                    <p className="text-[11px] text-zinc-600 dark:text-zinc-300 italic bg-white dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60 p-2 rounded truncate font-mono">
                      "{b.messagePreview}"
                    </p>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono block pt-1">
                      Waktu kirim: {b.sentAt} · Saluran: {b.channel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Lead */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-zinc-900 dark:text-zinc-100 transition-colors">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Tambah Prospek Calon Jamaah</h3>
              <button
                onClick={() => setShowAddLeadModal(false)}
                className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="Contoh: Hj. Nurul Fadilah"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={newLeadPhone}
                  onChange={(e) => setNewLeadPhone(e.target.value)}
                  placeholder="0812xxxxxxxx"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Kota Asal</label>
                  <input
                    type="text"
                    value={newLeadCity}
                    onChange={(e) => setNewLeadCity(e.target.value)}
                    placeholder="Surabaya"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  />
                </div>
                <div>
                  <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Sumber Prospek</label>
                  <select
                    value={newLeadSource}
                    onChange={(e) => setNewLeadSource(e.target.value as any)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                  >
                    <option value="Website Form">Website Form (B2C)</option>
                    <option value="WhatsApp Direct">WhatsApp Direct</option>
                    <option value="Mitra Agen">Rujukan Mitra Agen</option>
                    <option value="Walk-in">Kantor Cabang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Paket yang Diminati</label>
                <input
                  type="text"
                  value={newLeadPackage}
                  onChange={(e) => setNewLeadPackage(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div>
                <label className="block text-zinc-700 dark:text-zinc-300 font-medium mb-1">Catatan Follow-up</label>
                <textarea
                  rows={2}
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  placeholder="Rencana berangkat sekeluarga 4 orang (Kamar Quad)..."
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs rounded-lg p-2.5 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
                />
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="btn bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 text-xs px-4 py-2 rounded-lg font-medium transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 text-xs px-4 py-2 rounded-lg font-semibold transition shadow-sm"
                >
                  Simpan Prospek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
