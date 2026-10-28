import React, { useState } from 'react';
import {
  FileCheck2,
  Check,
  FileSignature,
  Plus,
  Trash2,
  Sparkles,
  Eye,
  Settings2,
  AlertCircle
} from 'lucide-react';
import { BusinessProfile, IntakeFormField } from '../../types';

interface Props {
  business: BusinessProfile;
  onUpdateBusiness: (updated: BusinessProfile) => void;
}

export const FormsManager: React.FC<Props> = ({ business, onUpdateBusiness }) => {
  const [waiverTitle, setWaiverTitle] = useState(business.customWaiverTitle || 'Client Consultation & Service Consent');
  const [waiverText, setWaiverText] = useState(
    business.customWaiverText ||
      'I confirm that I have disclosed all active medical conditions, medications, topicals, and allergies truthfully. I understand the post-care guidelines provided by my practitioner.'
  );
  const [requireSignature, setRequireSignature] = useState(business.requireSignature ?? true);
  const [fields, setFields] = useState<IntakeFormField[]>(
    business.intakeFields || [
      {
        id: 'fld_1',
        label: 'Primary Skin / Hair Concerns',
        type: 'select',
        options: ['General Maintenance', 'Sensitive / Barrier Care', 'Acne & Congestion', 'Anti-Aging'],
        required: true,
        enabled: true
      },
      {
        id: 'fld_2',
        label: 'Known Allergies (Latex, Acrylates, Fragrance)',
        type: 'text',
        required: false,
        enabled: true
      }
    ]
  );

  const [newQuestionLabel, setNewQuestionLabel] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<'text' | 'textarea' | 'select'>('text');
  const [newQuestionOptions, setNewQuestionOptions] = useState('Option 1, Option 2, Option 3');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  const handleToggleField = (id: string) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionLabel.trim()) return;

    const newField: IntakeFormField = {
      id: `fld_${Date.now()}`,
      label: newQuestionLabel,
      type: newQuestionType,
      options: newQuestionType === 'select' ? newQuestionOptions.split(',').map((s) => s.trim()) : undefined,
      required: false,
      enabled: true
    };

    setFields([...fields, newField]);
    setNewQuestionLabel('');
    setShowAddQuestionModal(false);
  };

  const handleSave = () => {
    const updated: BusinessProfile = {
      ...business,
      customWaiverTitle: waiverTitle,
      customWaiverText: waiverText,
      requireSignature: requireSignature,
      intakeFields: fields
    };
    onUpdateBusiness(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0F241C] p-4 rounded-3xl border border-[#C9A86A]/35 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#C9A86A]" />
            <span>Customizable Intake Forms & Waivers</span>
          </h3>
          <p className="text-xs text-[#E5EBE7]">
            Configure the exact questions and legal liability waivers your clients must complete when booking on your microsite.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" /> Form Saved to Microsite
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#0A1B14] font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer hover:brightness-105"
          >
            <Check className="w-4 h-4" />
            <span>Publish to Booking Site</span>
          </button>
        </div>
      </div>

      {/* Editor / Preview Switcher */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'editor'
              ? 'gold-gradient-bg text-[#0A1B14] shadow-md'
              : 'bg-[#0F241C] text-[#E5EBE7] border border-[#1C4435] hover:border-[#C9A86A]/50'
          }`}
        >
          <Settings2 className="w-3.5 h-3.5 inline mr-1.5" />
          Form & Waiver Customizer
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'preview'
              ? 'gold-gradient-bg text-[#0A1B14] shadow-md'
              : 'bg-[#0F241C] text-[#E5EBE7] border border-[#1C4435] hover:border-[#C9A86A]/50'
          }`}
        >
          <Eye className="w-3.5 h-3.5 inline mr-1.5" />
          Client Microsite Live Preview
        </button>
      </div>

      {activeTab === 'editor' ? (
        <div className="space-y-6">
          
          {/* Section 1: Custom Questionnaire Fields */}
          <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-6 md:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C4435]">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A86A]" />
                  <span>Pre-Service Client Questions</span>
                </h4>
                <p className="text-xs text-[#E5EBE7]/80 mt-0.5">
                  Questions asked to the client during step 3 of online booking.
                </p>
              </div>

              <button
                onClick={() => setShowAddQuestionModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-[#143026] hover:bg-[#1C4435] border border-[#C9A86A]/40 text-[#C9A86A] font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 text-xs ${
                    field.enabled
                      ? 'bg-[#0A1B14] border-[#C9A86A]/40'
                      : 'bg-[#0A1B14]/50 border-[#1C4435] opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{field.label}</span>
                      <span className="text-[10px] font-mono uppercase bg-[#143026] text-[#C9A86A] px-2 py-0.5 rounded border border-[#1C4435]">
                        {field.type}
                      </span>
                      {field.required && (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/40 px-1.5 py-0.2 rounded">
                          Required
                        </span>
                      )}
                    </div>
                    {field.options && (
                      <p className="text-[11px] text-[#E5EBE7]/70">
                        Options: {field.options.join(' • ')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleField(field.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        field.enabled ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {field.enabled ? 'Active on Microsite' : 'Hidden'}
                    </button>

                    <button
                      onClick={() => handleDeleteField(field.id)}
                      className="text-[#E5EBE7]/60 hover:text-rose-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Custom Liability Waiver & Signature */}
          <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-6 md:p-8 space-y-6 shadow-xl">
            <div className="pb-4 border-b border-[#1C4435]">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <FileSignature className="w-4 h-4 text-[#C9A86A]" />
                <span>Custom Legal Liability Waiver & Consent Text</span>
              </h4>
              <p className="text-xs text-[#E5EBE7]/80 mt-0.5">
                Every client must review this waiver and electronically sign before their booking is finalized.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-white font-medium mb-1.5">Waiver Title</label>
                <input
                  type="text"
                  value={waiverTitle}
                  onChange={(e) => setWaiverTitle(e.target.value)}
                  className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1.5">Liability Release Terms & Disclaimers</label>
                <textarea
                  rows={4}
                  value={waiverText}
                  onChange={(e) => setWaiverText(e.target.value)}
                  className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl p-3.5 text-white text-xs leading-relaxed focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="req_sig"
                  checked={requireSignature}
                  onChange={(e) => setRequireSignature(e.target.checked)}
                  className="w-4 h-4 accent-[#C9A86A] cursor-pointer"
                />
                <label htmlFor="req_sig" className="text-sm font-medium text-white cursor-pointer">
                  Require Mandatory Client Digital Touch Signature (ESIGN Compliant)
                </label>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* LIVE PREVIEW OF MICROSITE INTAKE SECTION */
        <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A] p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="pb-4 border-b border-[#1C4435] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#C9A86A] uppercase tracking-wider">
                Microsite Live Preview
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">{waiverTitle}</h4>
            </div>
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-1 rounded-lg">
              Live on /book/{business.handle}
            </span>
          </div>

          <div className="bg-[#0A1B14] rounded-2xl p-6 border border-[#1C4435] space-y-5 text-xs">
            <h5 className="font-bold text-white text-sm">Client Pre-Service Consultation</h5>
            
            {fields.filter((f) => f.enabled).map((field) => (
              <div key={field.id} className="space-y-1">
                <label className="block font-medium text-[#E5EBE7]">
                  {field.label} {field.required && <span className="text-rose-400">*</span>}
                </label>
                {field.type === 'select' ? (
                  <select className="w-full bg-[#143026] border border-[#1C4435] rounded-xl px-3 py-2 text-white">
                    {field.options?.map((opt, i) => (
                      <option key={i}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea rows={2} className="w-full bg-[#143026] border border-[#1C4435] rounded-xl px-3 py-2 text-white" />
                ) : (
                  <input type="text" placeholder="Client answer..." className="w-full bg-[#143026] border border-[#1C4435] rounded-xl px-3 py-2 text-white" />
                )}
              </div>
            ))}

            <div className="p-4 bg-[#143026] rounded-xl border border-[#1C4435] space-y-2">
              <p className="font-bold text-white">Liability Acknowledgment</p>
              <p className="text-[#E5EBE7] leading-relaxed text-[11px]">{waiverText}</p>
            </div>

            {requireSignature && (
              <div className="p-4 bg-[#0A1B14] rounded-xl border border-[#C9A86A]/35 space-y-2">
                <span className="font-bold text-white text-xs block">Client Digital Touch Signature *</span>
                <div className="h-14 rounded-lg bg-[#143026] border border-dashed border-[#C9A86A]/50 flex items-center justify-center font-serif italic text-[#C9A86A] text-base select-none">
                  Taylor Morgan (Digitally Signed)
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Custom Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0F241C] border border-[#C9A86A] p-6 shadow-2xl text-white space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#C9A86A]" />
              <span>Add Custom Intake Question</span>
            </h4>

            <form onSubmit={handleAddField} className="space-y-3 text-xs">
              <div>
                <label className="block text-white font-medium mb-1">Question Title / Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Previous Henna or Box Dye History"
                  value={newQuestionLabel}
                  onChange={(e) => setNewQuestionLabel(e.target.value)}
                  className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C9A86A]"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-1">Answer Type</label>
                <select
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value as any)}
                  className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C9A86A]"
                >
                  <option value="text">Single-line Text</option>
                  <option value="textarea">Multi-line Paragraph</option>
                  <option value="select">Dropdown Choice</option>
                </select>
              </div>

              {newQuestionType === 'select' && (
                <div>
                  <label className="block text-white font-medium mb-1">Comma-separated Options</label>
                  <input
                    type="text"
                    value={newQuestionOptions}
                    onChange={(e) => setNewQuestionOptions(e.target.value)}
                    placeholder="Option 1, Option 2, Option 3"
                    className="w-full bg-[#0A1B14] border border-[#1C4435] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="py-2.5 rounded-xl bg-[#143026] text-[#E5EBE7] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl gold-gradient-bg text-[#0A1B14] font-bold shadow-md cursor-pointer"
                >
                  Add Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
