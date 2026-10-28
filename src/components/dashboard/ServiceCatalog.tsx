import React, { useState } from 'react';
import { Scissors, Plus, Clock, Shield, Trash2, X } from 'lucide-react';
import { Service } from '../../types';

interface Props {
  services: Service[];
  onAddService: (service: Service) => void;
  onUpdateService?: (service: Service) => void;
  onDeleteService: (serviceId: string) => void;
}

export const ServiceCatalog: React.FC<Props> = ({
  services,
  onAddService,
  onDeleteService
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Facial Treatments');
  const [duration, setDuration] = useState(60);
  const [buffer, setBuffer] = useState(15);
  const [price, setPrice] = useState(150);
  const [deposit, setDeposit] = useState(37.5);
  const [description, setDescription] = useState('');

  const handlePriceChange = (val: number) => {
    setPrice(val);
    setDeposit(Math.round(val * 0.25 * 100) / 100);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newSrv: Service = {
      id: `srv_${Date.now()}`,
      businessId: services[0]?.businessId || 'biz_glow_skin',
      name: name,
      category: category,
      durationMinutes: duration,
      bufferMinutes: buffer,
      price: price,
      depositAmount: deposit,
      description: description || 'Custom service tailored to your needs.',
      providerIds: ['prov_sarah']
    };

    onAddService(newSrv);
    setShowAddModal(false);
    setName('');
    setDescription('');
  };

  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D221A] p-4 rounded-3xl border border-white/10 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[#C9A86A]" />
            <span>Service Catalog & Buffer Times</span>
          </h3>
          <p className="text-xs text-[#D5DFDA]">
            Define durations, cleanup buffer times, pricing, and required deposit policies.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl gold-gradient-bg text-[#07130E] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer hover:brightness-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services List Grouped by Category */}
      <div className="space-y-6">
        {categories.map((cat) => {
          const catServices = services.filter((s) => s.category === cat);
          return (
            <div key={cat} className="space-y-3">
              <h4 className="text-xs font-bold text-[#C9A86A] uppercase tracking-wider px-1">
                {cat} ({catServices.length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {catServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-[#0D221A] rounded-3xl border border-white/10 p-5 shadow-lg flex flex-col justify-between hover:border-white/30 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-bold text-sm text-white">{service.name}</h5>
                          <div className="flex items-center gap-2 mt-1 text-xs text-[#D5DFDA] font-mono">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-[#C9A86A]" />
                              {service.durationMinutes} min
                            </span>
                            <span>•</span>
                            <span className="text-[#C9A86A] font-semibold">+{service.bufferMinutes}m buffer</span>
                          </div>
                        </div>

                        <span className="text-base font-bold text-[#C9A86A] font-mono">
                          ${service.price}
                        </span>
                      </div>

                      <p className="text-xs text-[#D5DFDA] leading-relaxed pt-1">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#1B362A] text-xs text-[#D5DFDA]/70">
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <Shield className="w-3.5 h-3.5" />
                        Deposit: ${service.depositAmount}
                      </span>

                      <button
                        onClick={() => onDeleteService(service.id)}
                        className="text-slate-400 hover:text-rose-400 p-1 cursor-pointer"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D221A] border border-white/20 p-6 shadow-2xl text-white space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#D5DFDA] hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#C9A86A]" />
              <span>Create New Service</span>
            </h3>

            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="block text-white font-medium mb-1">Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sculpting Microcurrent Facial"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Facial Treatments or Hair Color"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white font-medium mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    min="15"
                    step="5"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-1">Cleanup Buffer (mins)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={buffer}
                    onChange={(e) => setBuffer(Number(e.target.value))}
                    className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-white font-medium mb-1">Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={price}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-1">Deposit ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-1">Service Description</label>
                <textarea
                  rows={2}
                  placeholder="Outline treatment steps, benefits, and aftercare advice..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#07130E] border border-white/10 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-white/30"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg text-[#07130E] font-bold text-xs transition-all shadow-md hover:brightness-105"
                >
                  Publish Service to Booking Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
