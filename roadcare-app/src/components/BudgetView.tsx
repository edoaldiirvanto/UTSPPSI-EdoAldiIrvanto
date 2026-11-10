import React, { useState } from 'react';
import { Coins, TrendingUp, PieChart, ArrowUpRight, CheckCircle2, FileText, Download } from 'lucide-react';
import { WorkOrder } from '../types';

interface BudgetViewProps {
  workOrders: WorkOrder[];
}

export const BudgetView: React.FC<BudgetViewProps> = ({ workOrders }) => {
  const [selectedYear, setSelectedYear] = useState('2026');

  const totalPagu = 14500000000; // 14.5 M APBD Preservasi
  const totalAllocatedSPK = workOrders.reduce((sum, w) => sum + w.budgetAllocated, 0);
  const totalRealizedSPK = workOrders.reduce((sum, w) => sum + w.budgetRealized, 0);
  const sisaPagu = totalPagu - totalAllocatedSPK;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              DPA-SKPD BMBK PROV. LAMPUNG
            </span>
            <span className="text-xs text-gray-500 font-mono">Sub-Kegiatan Preservasi Jalan Berkala</span>
          </div>
          <h2 className="text-base font-bold text-[#0D1C2E]">Anggaran & Realisasi Keuangan Preservasi Jalan</h2>
          <p className="text-xs text-[#545F73] mt-0.5">
            Monitoring penyerapan anggaran kontraktual, termin pembayaran SPK, dan efisiensi biaya preservasi ruas jalan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#EFF4FF] hover:bg-[#DCE9FF] text-blue-700 text-xs font-semibold rounded-lg border border-[#D5E0F8] transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Export Rekap Keuangan (Excel)</span>
          </button>
        </div>
      </div>

      {/* KPI 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <div className="text-xs text-[#545F73] mb-1">Pagu Alokasi APBD Murni 2026</div>
          <div className="text-2xl font-bold text-[#0D1C2E]">
            Rp {(totalPagu / 1000000000).toFixed(2)} Milyar
          </div>
          <div className="text-[10px] text-gray-500 mt-2">Dinas BMBK Provinsi Lampung (Preservasi Jalan)</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <div className="text-xs text-[#545F73] mb-1">Total Kontrak Terbit (SPK)</div>
          <div className="text-2xl font-bold text-blue-700">
            Rp {(totalAllocatedSPK / 1000000).toLocaleString('id-ID')} Jt
          </div>
          <div className="text-[10px] text-blue-600 mt-2">
            {((totalAllocatedSPK / totalPagu) * 100).toFixed(1)}% dari total pagu tahun berjalan
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <div className="text-xs text-[#545F73] mb-1">Realisasi Keuangan (SP2D Cair)</div>
          <div className="text-2xl font-bold text-emerald-600">
            Rp {(totalRealizedSPK / 1000000).toLocaleString('id-ID')} Jt
          </div>
          <div className="text-[10px] text-emerald-600 mt-2">
            {((totalRealizedSPK / totalAllocatedSPK) * 100).toFixed(1)}% penyerapan dari kontrak terbit
          </div>
        </div>
      </div>

      {/* Package Table */}
      <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5">
        <h3 className="font-bold text-sm text-[#0D1C2E] mb-3">Paket Pekerjaan Preservasi & Penyerapan Termin</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFF4FF] text-[#0D1C2E] uppercase text-[10px] font-semibold border-b border-[#D5E0F8]">
              <tr>
                <th className="py-2.5 px-3">Nomor SPK & Paket</th>
                <th className="py-2.5 px-3">Penyedia Jasa</th>
                <th className="py-2.5 px-3 text-right">Nilai Kontrak</th>
                <th className="py-2.5 px-3 text-right">Realisasi Bayar</th>
                <th className="py-2.5 px-3 text-center">Progres Fisik</th>
                <th className="py-2.5 px-3 text-center">Status Termin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EEFF]">
              {workOrders.map((wo) => (
                <tr key={wo.id} className="hover:bg-[#F8F9FF]">
                  <td className="py-2.5 px-3">
                    <div className="font-semibold text-[#0D1C2E]">{wo.title}</div>
                    <div className="font-mono text-[10px] text-gray-500">{wo.spkNumber}</div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-700">{wo.contractor}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-medium">
                    Rp {wo.budgetAllocated.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                    Rp {wo.budgetRealized.toLocaleString('id-ID')}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-bold text-blue-700">{wo.progressPercent}%</span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                      wo.progressPercent === 100 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {wo.progressPercent === 100 ? 'Termin 100% Lunas' : 'Termin I (60%)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

