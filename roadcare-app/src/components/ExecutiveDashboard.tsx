import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Activity, 
  Clock, 
  ArrowRight,
  Sparkles,
  Layers,
  Wrench
} from 'lucide-react';
import { RoadSegment, DamageReport, WorkOrder } from '../types';

interface ExecutiveDashboardProps {
  segments: RoadSegment[];
  reports: DamageReport[];
  workOrders: WorkOrder[];
  onNavigateTab: (tab: string) => void;
  onSelectReport: (report: DamageReport) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  segments,
  reports,
  workOrders,
  onNavigateTab,
  onSelectReport,
}) => {
  // Metrics calculation
  const totalLength = segments.reduce((acc, s) => acc + s.lengthKm, 0);
  const mantapLength = segments.filter(s => s.condition === 'Mantap' || s.condition === 'Sedang').reduce((acc, s) => acc + s.lengthKm, 0);
  const ikjPercentage = ((mantapLength / totalLength) * 100).toFixed(1);

  const activeReports = reports.filter(r => r.status !== 'Selesai');
  const criticalReports = reports.filter(r => r.severity === 'Kritis' || r.priorityLevel === 'Kritis');
  const activeWorkOrders = workOrders.filter(w => w.status === 'In Progress' || w.status === 'Scheduled');
  
  const totalBudget = workOrders.reduce((acc, w) => acc + w.budgetAllocated, 0);
  const realizedBudget = workOrders.reduce((acc, w) => acc + w.budgetRealized, 0);
  const budgetPercentage = ((realizedBudget / totalBudget) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Banner Operasional & Early Warning */}
      <div className="bg-gradient-to-r from-[#151B2A] to-[#1E293B] text-white p-5 rounded-xl shadow-sm border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              SISTEM PERINGATAN DINI AKTIF
            </span>
            <span className="text-xs text-slate-400">Sinkronisasi Sensor AI Dashcam: 5 Menit Lalu</span>
          </div>
          <h2 className="text-lg font-bold">Ringkasan Eksekutif Preservasi Jalan Provinsi Lampung</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Total pemantauan 6 koridor utama ({totalLength.toFixed(1)} km) dengan integrasi deteksi AI otomatis dan verifikasi UPTD.
          </p>
        </div>
        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <button 
            onClick={() => onNavigateTab('gis-map')}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Buka Peta GIS</span>
          </button>
          <button 
            onClick={() => onNavigateTab('ai-detection')}
            className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-lg border border-white/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>Uji AI YOLO</span>
          </button>
        </div>
      </div>

      {/* KPI 4 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: IKJ */}
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-xs text-[#545F73] mb-2">
            <span>Indeks Kemantapan Jalan (IKJ)</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0D1C2E]">{ikjPercentage}%</span>
            <span className="text-[11px] text-emerald-600 font-semibold">+1.4% MoM</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${ikjPercentage}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#7D8496] mt-1.5">
            <span>Mantap: {mantapLength.toFixed(1)} km</span>
            <span>Target: 85%</span>
          </div>
        </div>

        {/* KPI 2: Laporan Aktif & Kritis */}
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-xs text-[#545F73] mb-2">
            <span>Laporan Kerusakan Aktif</span>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0D1C2E]">{activeReports.length}</span>
            <span className="text-[11px] text-rose-600 font-semibold">{criticalReports.length} Kritis</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(criticalReports.length / activeReports.length) * 100}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#7D8496] mt-1.5">
            <span>AI: 1 Deteksi Baru</span>
            <span>Masyarakat: 2 Tiket</span>
          </div>
        </div>

        {/* KPI 3: SPK Preservasi */}
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-xs text-[#545F73] mb-2">
            <span>SPK & Tim Preservasi</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Wrench className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0D1C2E]">{activeWorkOrders.length} SPK</span>
            <span className="text-[11px] text-blue-600 font-semibold">Aktif Beroperasi</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#7D8496] mt-1.5">
            <span>1 On-Progress (60%)</span>
            <span>1 Approved Siap Jalan</span>
          </div>
        </div>

        {/* KPI 4: Realisasi Anggaran */}
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm hover:border-blue-200 transition-all">
          <div className="flex items-center justify-between text-xs text-[#545F73] mb-2">
            <span>Realisasi Anggaran Preservasi</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Activity className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#0D1C2E]">
              Rp {(realizedBudget / 1000000).toLocaleString('id-ID')} Jt
            </span>
            <span className="text-[11px] text-slate-500 font-semibold">({budgetPercentage}%)</span>
          </div>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${budgetPercentage}%` }}></div>
          </div>
          <div className="flex justify-between text-[10px] text-[#7D8496] mt-1.5">
            <span>Pagu: Rp {(totalBudget / 1000000).toLocaleString('id-ID')} Juta</span>
            <span>Sisa: Rp {((totalBudget - realizedBudget) / 1000000).toLocaleString('id-ID')} Jt</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Peringatan Kritis Teratas + Ringkasan Kondisi Ruas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Ruas Jalan Prioritas Tinggi */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#0D1C2E]">Daftar Ruas Jalan Provinsi & Kondisi Fisik</h3>
              <p className="text-xs text-[#545F73]">Data Pavement Condition Index (PCI) dan LHR terbaru</p>
            </div>
            <button 
              onClick={() => onNavigateTab('gis-map')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              <span>Detail Peta</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#EFF4FF] text-[#0D1C2E] uppercase text-[10px] font-semibold border-b border-[#D5E0F8]">
                <tr>
                  <th className="py-2.5 px-3">Kode Ruas</th>
                  <th className="py-2.5 px-3">Nama Ruas Jalan</th>
                  <th className="py-2.5 px-3">UPTD</th>
                  <th className="py-2.5 px-3 text-right">Panjang</th>
                  <th className="py-2.5 px-3 text-center">Kondisi (PCI)</th>
                  <th className="py-2.5 px-3 text-right">LHR (Kend/Hari)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EEFF]">
                {segments.map((seg) => {
                  let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                  if (seg.condition === 'Sedang') badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                  if (seg.condition === 'Rusak Ringan') badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                  if (seg.condition === 'Rusak Berat' || seg.condition === 'Kritis') badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';

                  return (
                    <tr key={seg.id} className="hover:bg-[#F8F9FF] transition-colors">
                      <td className="py-2.5 px-3 font-mono font-semibold text-gray-700">{seg.code}</td>
                      <td className="py-2.5 px-3 font-medium text-[#0D1C2E]">{seg.name}</td>
                      <td className="py-2.5 px-3 text-[#545F73]">{seg.uptd}</td>
                      <td className="py-2.5 px-3 text-right font-mono">{seg.lengthKm} km</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeColor}`}>
                          {seg.condition} ({seg.pciScore})
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-gray-600">{seg.trafficLhr.toLocaleString('id-ID')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Peringatan Kritis AI & Laporan Menunggu */}
        <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-[#0D1C2E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Peringatan Kerusakan Kritis
            </h3>
            <span className="text-[10px] font-semibold bg-rose-50 text-rose-600 px-2 py-0.5 rounded border border-rose-200">
              Urgensi Tinggi
            </span>
          </div>
          <p className="text-xs text-[#545F73] mb-3">
            Perlu verifikasi & penerbitan SPK penanganan segera dalam 24 jam.
          </p>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[320px] pr-1">
            {reports.map((rep) => {
              const isCritical = rep.severity === 'Kritis' || rep.severity === 'Berat';
              return (
                <div 
                  key={rep.id}
                  onClick={() => onSelectReport(rep)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all hover:scale-[1.01] ${
                    isCritical 
                      ? 'bg-rose-50/50 border-rose-200 hover:border-rose-300' 
                      : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-gray-600">{rep.ticketNumber}</span>
                    <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                      rep.severity === 'Kritis' ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rep.damageType} - {rep.severity}
                    </span>
                  </div>
                  <div className="font-medium text-[#0D1C2E] mb-1 line-clamp-1">{rep.segmentName}</div>
                  <div className="flex items-center justify-between text-[10px] text-[#7D8496]">
                    <span>{rep.staLocation}</span>
                    <span className="font-semibold text-rose-600">Skor Prioritas: {rep.priorityScore.toFixed(1)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onNavigateTab('damage-reports')}
            className="w-full mt-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Kelola Seluruh Laporan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

