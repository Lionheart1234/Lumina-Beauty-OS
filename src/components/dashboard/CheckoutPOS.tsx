import React, { useState } from 'react';
import {
  CreditCard,
  ShoppingBag,
  Plus,
  Trash2,
  Receipt,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Banknote,
  DollarSign
} from 'lucide-react';
import { Appointment, BusinessProfile, RetailProduct, Service, TipChoice, Transaction } from '../../types';
import confetti from 'canvas-confetti';

interface Props {
  business: BusinessProfile;
  products: RetailProduct[];
  services: Service[];
  initialAppointment?: Appointment | null;
  onCompleteCheckout: (transaction: Transaction) => void;
}

export const CheckoutPOS: React.FC<Props> = ({
  business,
  products,
  services,
  initialAppointment,
  onCompleteCheckout
}) => {
  const [clientName, setClientName] = useState(initialAppointment?.clientName || 'Walk-in Client');
  const [cartItems, setCartItems] = useState<{ name: string; type: 'service' | 'retail'; price: number; quantity: number }[]>(
    initialAppointment
      ? [{ name: initialAppointment.serviceNames[0] || 'Scheduled Service', type: 'service', price: initialAppointment.totalPrice, quantity: 1 }]
      : [{ name: services[0]?.name || 'Standard Service', type: 'service', price: services[0]?.price || 85, quantity: 1 }]
  );

  const [selectedTip, setSelectedTip] = useState<TipChoice>(20); // 18, 20, 25, or 'custom'
  const [customTipAmount, setCustomTipAmount] = useState<string>('15');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'apple_pay' | 'card_on_file'>('card');
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);

  // Cart Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let tipAmount = 0;
  if (selectedTip === 18) tipAmount = subtotal * 0.18;
  else if (selectedTip === 20) tipAmount = subtotal * 0.20;
  else if (selectedTip === 25) tipAmount = subtotal * 0.25;
  else if (selectedTip === 'custom') tipAmount = parseFloat(customTipAmount) || 0;
  else tipAmount = 0;

  const tax = subtotal * 0.07; // 7% local sales tax
  const total = subtotal + tipAmount + tax;

  const handleAddProduct = (product: RetailProduct) => {
    const existing = cartItems.find((i) => i.name === product.name);
    if (existing) {
      setCartItems(cartItems.map((i) => i.name === product.name ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCartItems([...cartItems, { name: product.name, type: 'retail', price: product.price, quantity: 1 }]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(cartItems.filter((_, idx) => idx !== index));
  };

  const handleProcessPayment = () => {
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      businessId: business.id,
      appointmentId: initialAppointment?.id,
      clientName: clientName,
      date: new Date().toISOString().split('T')[0],
      subtotal: Math.round(subtotal * 100) / 100,
      tipPercentage: typeof selectedTip === 'number' ? selectedTip : 0,
      tipAmount: Math.round(tipAmount * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100,
      paymentMethod: paymentMethod,
      items: cartItems,
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`
    };

    onCompleteCheckout(tx);
    setCompletedTx(tx);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between bg-[#0F241C] p-4 rounded-3xl border border-[#C9A86A]/35 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#C9A86A]" />
            <span>Point of Sale Terminal</span>
          </h3>
          <p className="text-xs text-[#E5EBE7]">
            Checkout services, add retail products, and collect custom tips with zero platform markups.
          </p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-[#C9A86A]">Client Ticket:</span>
          <p className="text-sm font-semibold text-white">{clientName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Cart & Retail Upsells */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Cart Items Table */}
          <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C4435]">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C9A86A]" />
                <span>Ticket Items</span>
              </h4>
              <span className="text-xs text-[#E5EBE7]/70">{cartItems.length} item(s)</span>
            </div>

            <div className="space-y-2">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#0A1B14] border border-[#1C4435] text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="font-semibold text-white">{item.name}</p>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.2 rounded-md ${
                      item.type === 'service' ? 'bg-[#C9A86A]/15 text-[#C9A86A]' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retail Inventory Upsell Grid */}
          <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-5 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9A86A]" />
              <span>Add Retail Products to Cart</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleAddProduct(prod)}
                  className="p-3.5 rounded-2xl bg-[#0A1B14] border border-[#1C4435] hover:border-[#C9A86A] cursor-pointer transition-all flex items-center justify-between group shadow-sm"
                >
                  <div>
                    <p className="text-xs font-semibold text-white group-hover:text-[#C9A86A] transition-colors">{prod.name}</p>
                    <p className="text-[10px] text-[#E5EBE7]/70 font-mono">${prod.price} • Stock: {prod.stock}</p>
                  </div>
                  <span className="w-6 h-6 rounded-lg bg-[#143026] group-hover:bg-[#C9A86A] group-hover:text-[#0A1B14] flex items-center justify-center text-white text-xs transition-colors shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Tipping Presets, Payment & Checkout */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0F241C] rounded-3xl border border-[#C9A86A]/35 p-6 shadow-2xl space-y-6">
            
            {/* Tipping Presets Section (18%, 20%, 25%, Custom) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  Select Tip Amount
                </label>
                <span className="text-xs font-bold font-mono text-[#C9A86A]">
                  +${tipAmount.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[18, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setSelectedTip(pct as TipChoice)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedTip === pct
                        ? 'gold-gradient-bg text-[#0A1B14] shadow-md font-extrabold'
                        : 'bg-[#0A1B14] text-[#E5EBE7] border border-[#1C4435] hover:border-[#C9A86A]/50'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setSelectedTip('custom')}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedTip === 'custom'
                      ? 'gold-gradient-bg text-[#0A1B14] shadow-md font-extrabold'
                      : 'bg-[#0A1B14] text-[#E5EBE7] border border-[#1C4435] hover:border-[#C9A86A]/50'
                  }`}
                >
                  Custom
                </button>
              </div>

              {selectedTip === 'custom' && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs text-[#E5EBE7]">Custom Tip ($):</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={customTipAmount}
                    onChange={(e) => setCustomTipAmount(e.target.value)}
                    className="w-24 bg-[#0A1B14] border border-[#1C4435] rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => setSelectedTip(0)}
                className="text-[11px] text-[#E5EBE7]/60 hover:text-white underline block cursor-pointer"
              >
                No Tip
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-4 border-t border-[#1C4435]">
              <label className="text-xs font-bold text-white uppercase tracking-wider block">
                Payment Method
              </label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white'
                      : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#C9A86A]" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white'
                      : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-[#C9A86A]" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white'
                      : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-[#C9A86A]" />
                  <span>Cash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card_on_file')}
                  className={`p-3 rounded-2xl border flex items-center gap-2 cursor-pointer transition-all ${
                    paymentMethod === 'card_on_file'
                      ? 'border-[#C9A86A] bg-[#C9A86A]/15 text-white'
                      : 'border-[#1C4435] bg-[#0A1B14] text-[#E5EBE7] hover:border-[#C9A86A]/40'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Card on File</span>
                </button>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-4 border-t border-[#1C4435] text-xs text-[#E5EBE7]">
              <div className="flex justify-between">
                <span className="text-[#E5EBE7]/70">Subtotal:</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E5EBE7]/70">Tip:</span>
                <span className="font-mono text-[#C9A86A] font-bold">+${tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E5EBE7]/70">Estimated Tax (7%):</span>
                <span className="font-mono text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-[#1C4435]">
                <span>Total Due:</span>
                <span className="font-mono text-[#C9A86A] text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Complete Sale Action */}
            <button
              onClick={handleProcessPayment}
              disabled={cartItems.length === 0}
              className="w-full py-4 rounded-xl gold-gradient-bg text-[#0A1B14] font-extrabold text-sm shadow-xl shadow-[#C9A86A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-105 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Charge ${total.toFixed(2)} & Print Receipt</span>
            </button>
          </div>
        </div>

      </div>

      {/* 4. Digital Receipt Modal */}
      {completedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0F241C] border border-[#C9A86A] p-6 shadow-2xl text-white space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Payment Successful!</h3>
              <p className="text-xs text-[#E5EBE7]">Receipt #{completedTx.receiptNumber}</p>
            </div>

            <div className="bg-[#0A1B14] rounded-2xl p-4 border border-[#1C4435] text-xs space-y-2">
              <div className="flex justify-between text-[#E5EBE7]/70">
                <span>Business:</span>
                <span className="text-white font-medium">{business.name}</span>
              </div>
              <div className="flex justify-between text-[#E5EBE7]/70">
                <span>Client:</span>
                <span className="text-white font-medium">{completedTx.clientName}</span>
              </div>
              <div className="flex justify-between text-[#E5EBE7]/70">
                <span>Method:</span>
                <span className="text-white capitalize">{completedTx.paymentMethod.replace('_', ' ')}</span>
              </div>

              <div className="border-t border-[#1C4435] pt-2 space-y-1">
                {completedTx.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-white">{item.name}</span>
                    <span className="font-mono text-[#E5EBE7]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#1C4435] pt-2 space-y-1">
                <div className="flex justify-between text-[#E5EBE7]/70">
                  <span>Tip:</span>
                  <span className="text-[#C9A86A] font-mono font-bold">+${completedTx.tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm pt-1 border-t border-[#1C4435]">
                  <span>Total Paid:</span>
                  <span className="text-[#C9A86A] font-mono">${completedTx.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCompletedTx(null)}
              className="w-full py-3 rounded-xl bg-[#143026] hover:bg-[#1C4435] text-white font-bold text-xs transition-colors border border-[#1C4435] cursor-pointer"
            >
              Done & Close Ticket
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
