import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Target 
} from 'lucide-react';
import { DamageReport, RoadSegment } from '../types';

interface AiAnalyticsViewProps {
  reports: DamageReport[];
  segments: RoadSegment[];
}

export const AiAnalyticsView: React.FC<AiAnalyticsViewProps> = ({ reports, segments }) => {
  // Aggregate data for Damage Type distribution
  const damageTypeCounts: { [key: string]: number } = {};
  reports.forEach((r) => {
    damageTypeCounts[r.damageType] = (damageTypeCounts[r.damageType] || 0) + 1;
  });

  const pieData = Object.keys(damageTypeCounts).map((key) => ({
    name: key,
    value: damageTypeCounts[key],
  }));

  const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#8b5cf6', '#10b981'];

  // Aggregate condition distribution from segments
  const conditionBarData = segments.map((s) => ({
    name: s.code,
    PCI: s.pciScore,
    LHR: Math.round(s.trafficLhr / 1000), // in thousands
  }));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5" />
              ANALYTICS & DECISION SUPPORT SYSTEM (DSS)
            </span>
            <span className="text-xs text-gray-500 font-mono">UTI Research & Development Center</span>
          </div>
          <h2 className="text-base font-bold text-[#0D1C2E]">Analitik Prediktif & Rekomendasi Preservasi AI</h2>
          <p className="text-xs text-[#545F73] mt-0.5">
            Menganalisis tren kerusakan jalan, korelasi volume kendaraan berat (LHR) terhadap degradasi perkerasan, dan estimasi prioritas intervensi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AI Model Precision: 92.4%</span>
          </div>
        </div>
      </div>

      {/* KPI AI Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <span className="text-xs text-[#545F73] block mb-1">Model Inferensi</span>
          <div className="text-xl font-bold text-[#0D1C2E]">YOLOv8x-Custom</div>
          <span className="text-[10px] text-gray-500 mt-1 block">Trained on 14,200 dataset jalan</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <span className="text-xs text-[#545F73] block mb-1">Rata-rata Confidence</span>
          <div className="text-xl font-bold text-blue-700">89.8%</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Tingkat akurasi optimal</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <span className="text-xs text-[#545F73] block mb-1">Waktu Inferensi Rata-rata</span>
          <div className="text-xl font-bold text-purple-700">28 ms</div>
          <span className="text-[10px] text-gray-500 mt-1 block">Edge Device Jetson Orin</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm">
          <span className="text-xs text-[#545F73] block mb-1">Rekomendasi Intervensi</span>
          <div className="text-xl font-bold text-rose-600">3 Ruas Segera</div>
          <span className="text-[10px] text-rose-500 font-semibold mt-1 block">Urgensi sebelum musim hujan</span>
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Bar Chart of Segments PCI vs LHR */}
        <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xs text-[#0D1C2E]">Perbandingan Skor PCI dan LHR per Ruas Jalan</h3>
              <p className="text-[11px] text-[#545F73]">Korelasi beban lalu lintas harian terhadap indeks kemantapan</p>
            </div>
            <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
              Unit: PCI (0-100) / LHR (Ribu Kend)
            </span>
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conditionBarData}>
                <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151B2A', borderColor: '#232d44', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="PCI" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Skor PCI (Kondisi)" />
                <Bar dataKey="LHR" fill="#f59e0b" radius={[4, 4, 0, 0]} name="LHR (Ribu Kend/Hari)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Pie Chart of Damage Types */}
        <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-xs text-[#0D1C2E]">Proporsi Jenis Kerusakan Terdeteksi</h3>
              <p className="text-[11px] text-[#545F73]">Distribusi persentase klasifikasi anomali perkerasan</p>
            </div>
            <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
              Total {reports.length} Deteksi
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''}: ${((percent || 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151B2A', borderColor: '#232d44', color: '#fff', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

