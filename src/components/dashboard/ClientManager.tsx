import React, { useState } from 'react';
import { Users, Search, Plus, Tag, FileCheck2, DollarSign, Calendar, Edit3, X, Check, Mail, Phone, Clock } from 'lucide-react';
import { Client } from '../../types';

interface Props {
  clients: Client[];
  onSaveClient: (client: Client) => void;
}

export const ClientManager: React.FC<Props> = ({ clients, onSaveClient }) => {
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] || null);
  const [editingFormula, setEditingFormula] = useState(false);
  const [formulaText, setFormulaText] = useState(selectedClient?.formulaNotes || '');
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  // New Client Form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTag, setNewTag] = useState('VIP Client');
  const [newFormula, setNewFormula] = useState('');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectClient = (cl: Client) => {
    setSelectedClient(cl);
    setFormulaText(cl.formulaNotes);
    setEditingFormula(false);
  };

  const handleSaveFormula = () => {
    if (selectedClient) {
      const updated = { ...selectedClient, formulaNotes: formulaText };
      onSaveClient(updated);
      setSelectedClient(updated);
      setEditingFormula(false);
    }
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newClient: Client = {
      id: `cl_${Date.now()}`,
      businessId: selectedClient?.businessId || 'biz_glow_skin',
      name: newName.trim(),
      email: newEmail.trim() || 'client@example.com',
      phone: newPhone.trim() || '(555) 123-4567',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      tags: [newTag],
      formulaNotes: newFormula.trim() || 'No formula recorded yet.',
      allergies: 'None reported',
      totalSpend: 0,
      totalVisits: 0,
      lastVisitDate: new Date().toISOString().split('T')[0],
      intakeFormCompleted: true
    };

    onSaveClient(newClient);
    setSelectedClient(newClient);
    setShowNewClientModal(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewFormula('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D221A] p-5 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-white/70" />
            <span>Client CRM & Formulas</span>
          </h3>
          <p className="text-xs text-white/60">
            Client profiles, technical treatment cards, and completed liability waivers.
          </p>
        </div>

        <button
          onClick={() => setShowNewClientModal(true)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white/70" />
          <span>Add New Client</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Search & Client List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#091712] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredClients.map((client) => {
              const isSelected = selectedClient?.id === client.id;
              return (
                <div
                  key={client.id}
                  onClick={() => handleSelectClient(client)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#143327] border-white/30 text-white shadow-sm ring-1 ring-white/15'
                      : 'bg-[#0D221A] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={client.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
                    />
                    <div className="truncate">
                      <h4 className="font-semibold text-xs text-white truncate">{client.name}</h4>
                      <p className="text-[11px] text-white/50 font-mono truncate">{client.phone}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-white font-mono">${client.totalSpend}</span>
                    <p className="text-[10px] text-white/40">{client.totalVisits} visits</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Client Detail Dossier */}
        <div className="lg:col-span-7">
          {selectedClient ? (
            <div className="bg-[#0D221A] rounded-2xl border border-white/10 p-6 md:p-7 space-y-6 shadow-xl">
              
              {/* Header Profile */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedClient.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={selectedClient.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedClient.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-white/60 font-mono mt-0.5">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-white/40" /> {selectedClient.phone}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-white/40" /> {selectedClient.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                      {selectedClient.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-medium bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-1 bg-[#091712] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-semibold text-white/40">Lifetime Value</span>
                  <span className="text-base font-bold text-white font-mono">${selectedClient.totalSpend}</span>
                  <span className="text-[10px] text-white/40">{selectedClient.totalVisits} appointments</span>
                </div>
              </div>

              {/* Formula & Technical Treatment Card */}
              <div className="bg-[#091712] rounded-xl p-5 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-white/60" />
                    <span>Technical Treatment & Formula Card</span>
                  </h4>
                  
                  {editingFormula ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSaveFormula}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Check className="w-3 h-3" /> Save
                      </button>
                      <button
                        onClick={() => setEditingFormula(false)}
                        className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setEditingFormula(true)}
                      className="text-xs text-white/70 hover:text-white underline cursor-pointer"
                    >
                      Edit Formula
                    </button>
                  )}
                </div>

                {editingFormula ? (
                  <textarea
                    rows={4}
                    value={formulaText}
                    onChange={(e) => setFormulaText(e.target.value)}
                    className="w-full bg-[#11281F] border border-white/20 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-white/40 font-mono"
                  />
                ) : (
                  <p className="text-xs text-[#D5DFDA] leading-relaxed font-mono bg-[#11281F] p-3 rounded-xl border border-white/5">
                    {selectedClient.formulaNotes}
                  </p>
                )}
              </div>

              {/* Health Disclosures & Waivers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#091712] p-4 rounded-xl border border-white/5 space-y-1">
                  <p className="text-white/50 font-medium">Recorded Allergies:</p>
                  <p className="text-rose-300 font-medium">{selectedClient.allergies || 'None reported'}</p>
                </div>

                <div className="bg-[#091712] p-4 rounded-xl border border-white/5 space-y-1">
                  <p className="text-white/50 font-medium">Intake & Liability Waiver:</p>
                  <p className="text-emerald-400 font-medium flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-emerald-400" /> Signed & Verified
                  </p>
                </div>
              </div>

              {/* Visit Stats Footer */}
              <div className="p-3 bg-[#091712] rounded-xl border border-white/5 flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-white/40" />
                  Last Visit: <strong className="text-white font-mono">{selectedClient.lastVisitDate}</strong>
                </span>
                <span>Client ID: <span className="font-mono text-white/40">{selectedClient.id}</span></span>
              </div>

            </div>
          ) : (
            <div className="bg-[#0D221A] rounded-2xl border border-white/10 p-12 text-center text-white/50">
              Select a client to view their dossier.
            </div>
          )}
        </div>

      </div>

      {/* New Client Modal */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0D221A] border border-white/15 p-6 shadow-2xl text-white space-y-4">
            <button
              onClick={() => setShowNewClientModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-white/70" />
              <span>Add Client Profile</span>
            </h3>

            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/80 font-medium mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vanessa Cole"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="(555) 000-0000"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="vanessa@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Client Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                >
                  <option value="VIP Client">VIP Client</option>
                  <option value="Regular">Regular</option>
                  <option value="First Time Client">First Time Client</option>
                  <option value="Sensitive Skin">Sensitive Skin</option>
                  <option value="Color Correction">Color Correction</option>
                </select>
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Initial Treatment Formula Notes</label>
                <textarea
                  rows={3}
                  placeholder="Add technical formulas, peel layers, or allergy notes..."
                  value={newFormula}
                  onChange={(e) => setNewFormula(e.target.value)}
                  className="w-full bg-[#091712] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/15 cursor-pointer"
                >
                  Create Client Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
