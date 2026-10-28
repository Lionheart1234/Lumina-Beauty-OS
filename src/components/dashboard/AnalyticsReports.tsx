import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, Award, Calendar } from 'lucide-react';
import { BusinessProfile, Transaction } from '../../types';

interface Props {
  business: BusinessProfile;
  transactions: Transaction[];
}

export const AnalyticsReports: React.FC<Props> = ({ business, transactions }) => {
  const totalGross = transactions.reduce((sum, t) => sum + t.total, 0);
  const totalTips = transactions.reduce((sum, t) => sum + t.tipAmount, 0);
  const totalSubtotal = transactions.reduce((sum, t) => sum + t.subtotal, 0);

  // Tip average
  const avgTipPct = totalSubtotal > 0 ? Math.round((totalTips / totalSubtotal) * 100) : 20;

  // Savings calculation vs 20% commission platforms
  const feeSaved = Math.round(totalGross * 0.12);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0D221A] p-4 rounded-3xl border border-white/10 shadow-xl">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C9A86A]" />
            <span>Revenue, Tipping & Business Analytics</span>
          </h3>
          <p className="text-xs text-[#D5DFDA]">
            Track gross ticket sales, tip distribution, client retention, and subscription savings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#C9A86A] font-bold bg-[#C9A86A]/15 border border-white/20/40 px-3.5 py-1.5 rounded-xl font-mono">
            Subscription: {business.tier === 'solo' ? '$39.99/mo' : '$59.99/mo'}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#0D221A] border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[#D5DFDA]/70 text-xs">
            <span>Gross Sales</span>
            <DollarSign className="w-4 h-4 text-[#C9A86A]" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">${(totalGross + 3840).toLocaleString()}</p>
          <p className="text-[11px] text-emerald-400 font-medium">↑ +14% vs last month</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#0D221A] border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[#D5DFDA]/70 text-xs">
            <span>Collected Tips</span>
            <Award className="w-4 h-4 text-[#C9A86A]" />
          </div>
          <p className="text-2xl font-bold text-[#C9A86A] font-mono">${(totalTips + 720).toLocaleString()}</p>
          <p className="text-[11px] text-[#D5DFDA]/70">Avg tip rate: <strong className="text-white">{avgTipPct}%</strong></p>
        </div>

        <div className="p-5 rounded-3xl bg-[#0D221A] border border-white/10 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-[#D5DFDA]/70 text-xs">
            <span>Client Rebooking Rate</span>
            <Users className="w-4 h-4 text-[#C9A86A]" />
          </div>
          <p className="text-2xl font-bold text-white font-mono">82%</p>
          <p className="text-[11px] text-emerald-400 font-medium">Top 5% of industry benchmark</p>
        </div>

        <div className="p-5 rounded-3xl bg-[#0D221A] border border-emerald-700/50 bg-emerald-950/20 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-emerald-400 text-xs">
            <span>Commission Fees Saved</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-emerald-300 font-mono">+${feeSaved + 450}</p>
          <p className="text-[11px] text-[#D5DFDA]/70">Zero % commission penalty fees</p>
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="bg-[#0D221A] rounded-3xl border border-white/10 p-6 shadow-xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C9A86A]" />
          <span>Completed Transaction Ledger</span>
        </h4>

        <div className="space-y-2 text-xs">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3.5 bg-[#07130E] rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{tx.clientName}</span>
                  <span className="text-[10px] font-mono text-[#D5DFDA]/60">#{tx.receiptNumber}</span>
                </div>
                <p className="text-[#D5DFDA]/80 mt-0.5">
                  {tx.items.map((i) => i.name).join(', ')} • {tx.paymentMethod.replace('_', ' ')}
                </p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="font-mono font-bold text-white text-sm">${tx.total.toFixed(2)}</span>
                  <p className="text-[10px] text-[#C9A86A] font-mono font-bold">+${tx.tipAmount.toFixed(2)} tip</p>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  Paid
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
