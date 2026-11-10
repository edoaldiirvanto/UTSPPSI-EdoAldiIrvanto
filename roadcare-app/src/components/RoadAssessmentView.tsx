import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ArrowUpDown,
  Calendar
} from 'lucide-react';
import { RoadSegment } from '../types';

interface PciAssessment {
  id: string;
  segmentId: string;
  segmentName: string;
  staLocation: string;
  inspector: string;
  inspectionDate: string;
  potholeSeverity: number; // 0-100
  alligatorSeverity: number;
  ruttingSeverity: number;
  edgeSeverity: number;
  calculatedPci: number;
  conditionCategory: 'Mantap' | 'Sedang' | 'Rusak Ringan' | 'Rusak Berat' | 'Kritis';
  recommendedTreatment: string;
}

const INITIAL_ASSESSMENTS: PciAssessment[] = [
  {
    id: 'pci-1',
    segmentId: 'seg-1',
    segmentName: 'Jl. ZA. Pagar Alam - Raden Intan',
    staLocation: 'STA 04+150',
    inspector: 'Ferry Pratama, A.Md.',
    inspectionDate: '05/11/2026',
    potholeSeverity: 10,
    alligatorSeverity: 20,
    ruttingSeverity: 52,
    edgeSeverity: 5,
    calculatedPci: 68,
    conditionCategory: 'Sedang',
    recommendedTreatment: 'Milling & Overlay AC-WC tebal 4 cm pada lajur berdeformasi.',
  },
  {
    id: 'pci-2',
    segmentId: 'seg-2',
    segmentName: 'Jl. Raya Lintas Sumatra (Natar - Tegineneng)',
    staLocation: 'STA 14+320',
    inspector: 'Sugiarto, S.T. & Tim TRC II',
    inspectionDate: '08/11/2026',
    potholeSeverity: 88,
    alligatorSeverity: 65,
    ruttingSeverity: 40,
    edgeSeverity: 30,
    calculatedPci: 42,
    conditionCategory: 'Rusak Berat',
    recommendedTreatment: 'Patching struktural, perbaikan lapis pondasi aggregat A & lapis aus.',
  },
  {
    id: 'pci-3',
    segmentId: 'seg-3',
    segmentName: 'Jl. Ryacudu (Akses Tol Kotabaru - ITERA)',
    staLocation: 'STA 02+800',
    inspector: 'Tim Inspeksi Mandiri UPTD I',
    inspectionDate: '02/11/2026',
    potholeSeverity: 0,
    alligatorSeverity: 5,
    ruttingSeverity: 12,
    edgeSeverity: 0,
    calculatedPci: 88,
    conditionCategory: 'Mantap',
    recommendedTreatment: 'Pemeliharaan rutin pembersihan saluran drainase samping.',
  },
  {
    id: 'pci-4',
    segmentId: 'seg-4',
    segmentName: 'Jl. Lintas Timur (Menggala - Sp. Penawar)',
    staLocation: 'STA 28+100',
    inspector: 'Ir. Doni Prasetyo & UPTD V',
    inspectionDate: '09/11/2026',
    potholeSeverity: 75,
    alligatorSeverity: 85,
    ruttingSeverity: 60,
    edgeSeverity: 45,
    calculatedPci: 28,
    conditionCategory: 'Kritis',
    recommendedTreatment: 'Rekonstruksi pondasi semen (CTB) dan pelapisan ulang bertahap.',
  },
];

interface RoadAssessmentViewProps {
  segments: RoadSegment[];
}

export const RoadAssessmentView: React.FC<RoadAssessmentViewProps> = ({ segments }) => {
  const [assessments, setAssessments] = useState<PciAssessment[]>(INITIAL_ASSESSMENTS);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State for Interactive Calculator
  const [calcForm, setCalcForm] = useState({
    segmentName: segments[0]?.name || 'Jl. Raya Lintas Sumatra',
    staLocation: 'STA 10+500',
    inspector: 'Inspektur Lapangan BMBK',
    pothole: 30,
    alligator: 40,
    rutting: 25,
    edge: 15,
  });

  // Calculate live PCI
  const deductTotal = (calcForm.pothole * 0.35) + (calcForm.alligator * 0.30) + (calcForm.rutting * 0.20) + (calcForm.edge * 0.15);
  const livePci = Math.max(0, Math.min(100, Math.round(100 - deductTotal)));

  let liveCategory: PciAssessment['conditionCategory'] = 'Mantap';
  if (livePci < 85 && livePci >= 70) liveCategory = 'Sedang';
  else if (livePci < 70 && livePci >= 50) liveCategory = 'Rusak Ringan';
  else if (livePci < 50 && livePci >= 30) liveCategory = 'Rusak Berat';
  else if (livePci < 30) liveCategory = 'Kritis';

  const handleSaveAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAssessment: PciAssessment = {
      id: `pci-${Date.now()}`,
      segmentId: 'seg-custom',
      segmentName: calcForm.segmentName,
      staLocation: calcForm.staLocation,
      inspector: calcForm.inspector,
      inspectionDate: new Date().toLocaleDateString('id-ID'),
      potholeSeverity: calcForm.pothole,
      alligatorSeverity: calcForm.alligator,
      ruttingSeverity: calcForm.rutting,
      edgeSeverity: calcForm.edge,
      calculatedPci: livePci,
      conditionCategory: liveCategory,
      recommendedTreatment: livePci < 50 ? 'Intervensi rekonstruksi lapis perkerasan struktural' : 'Pemeliharaan periodik berkala',
    };

    setAssessments([newAssessment, ...assessments]);
    setIsCalculatorOpen(false);
  };

  const filteredAssessments = assessments.filter(a => 
    a.segmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.staLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.inspector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header Strip */}
      <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#0D1C2E] flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Penilaian Kondisi Perkerasan Jalan (PCI & IRI - PRD FR-05)</span>
          </h2>
          <p className="text-xs text-[#545F73]">
            Kalkulator Pavement Condition Index (PCI) berbasis standar ASTM D6433, evaluasi nilai kekasaran (IRI), dan rekomendasi teknis preservasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#000000] hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kalkulator Penilaian PCI Baru</span>
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Cari ruas atau nama inspektur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#EFF4FF] border border-[#D5E0F8] rounded-lg text-xs focus:outline-none"
            />
          </div>
          <span className="text-[11px] text-gray-500 font-mono">Total {filteredAssessments.length} Hasil Survei PCI</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFF4FF] text-[#0D1C2E] uppercase text-[10px] font-semibold border-b border-[#D5E0F8]">
              <tr>
                <th className="py-2.5 px-3">Ruas Jalan & Lokasi STA</th>
                <th className="py-2.5 px-3">Inspektur & Tanggal</th>
                <th className="py-2.5 px-3 text-center">Indeks Kerusakan (Deduct)</th>
                <th className="py-2.5 px-3 text-center">Skor PCI</th>
                <th className="py-2.5 px-3 text-center">Kategori</th>
                <th className="py-2.5 px-3">Rekomendasi Preservasi Teknis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EEFF]">
              {filteredAssessments.map((item) => {
                let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                if (item.conditionCategory === 'Sedang') badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
                if (item.conditionCategory === 'Rusak Ringan') badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
                if (item.conditionCategory === 'Rusak Berat' || item.conditionCategory === 'Kritis') badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';

                return (
                  <tr key={item.id} className="hover:bg-[#F8F9FF]">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#0D1C2E]">{item.segmentName}</div>
                      <div className="font-mono text-[10px] text-gray-500">{item.staLocation}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="text-gray-800 font-medium">{item.inspector}</div>
                      <div className="font-mono text-[10px] text-gray-400">{item.inspectionDate}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="text-[10px] text-gray-600 font-mono">
                        Lubang: {item.potholeSeverity}% • Retak: {item.alligatorSeverity}%
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-sm text-[#0D1C2E]">
                      {item.calculatedPci} / 100
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeColor}`}>
                        {item.conditionCategory}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-700 text-[11px]">
                      {item.recommendedTreatment}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive PCI Calculator Modal */}
      {isCalculatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden">
            <div className="bg-[#151B2A] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Kalkulator Penilaian Indeks Kondisi Jalan (PCI)</h3>
                <p className="text-[10px] text-gray-300">Standar Evaluasi ASTM D6433 & Bina Marga</p>
              </div>
              <button onClick={() => setIsCalculatorOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveAssessment} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Ruas Jalan</label>
                <select
                  value={calcForm.segmentName}
                  onChange={(e) => setCalcForm({ ...calcForm, segmentName: e.target.value })}
                  className="w-full p-2 bg-[#EFF4FF] border border-[#D5E0F8] rounded-lg text-xs"
                >
                  {segments.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Titik STA</label>
                  <input
                    type="text"
                    value={calcForm.staLocation}
                    onChange={(e) => setCalcForm({ ...calcForm, staLocation: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Nama Penilai</label>
                  <input
                    type="text"
                    value={calcForm.inspector}
                    onChange={(e) => setCalcForm({ ...calcForm, inspector: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Sliders for Deduct Values */}
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2.5">
                <span className="font-semibold text-gray-800 text-[11px] block">Tingkat Keparahan Kerusakan (Deduct Value):</span>
                
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-600">Lubang (Pothole - bobot 35%):</span>
                    <span className="font-mono font-bold">{calcForm.pothole}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={calcForm.pothole}
                    onChange={(e) => setCalcForm({ ...calcForm, pothole: Number(e.target.value) })}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-600">Retak Buaya (Alligator - bobot 30%):</span>
                    <span className="font-mono font-bold">{calcForm.alligator}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={calcForm.alligator}
                    onChange={(e) => setCalcForm({ ...calcForm, alligator: Number(e.target.value) })}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-gray-600">Alur Roda (Rutting - bobot 20%):</span>
                    <span className="font-mono font-bold">{calcForm.rutting}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={calcForm.rutting}
                    onChange={(e) => setCalcForm({ ...calcForm, rutting: Number(e.target.value) })}
                    className="w-full accent-blue-600"
                  />
                </div>
              </div>

              {/* Live Result Display */}
              <div className="p-3 bg-[#EFF4FF] rounded-lg border border-[#D5E0F8] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Hasil Kalkulasi PCI</span>
                  <div className="text-xl font-bold text-blue-700">{livePci} / 100</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 uppercase font-semibold">Status Kondisi</span>
                  <div className="font-bold text-xs text-[#0D1C2E]">{liveCategory}</div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCalculatorOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#000000] hover:bg-zinc-800 text-white font-semibold rounded-lg text-xs shadow-sm"
                >
                  Simpan Hasil Penilaian
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

