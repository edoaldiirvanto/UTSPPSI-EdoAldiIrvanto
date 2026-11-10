import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import { RoadSegment } from '../types';

interface Inspection {
  id: string;
  code: string;
  segmentName: string;
  staRange: string;
  inspectorName: string;
  uptd: string;
  scheduledDate: string;
  status: 'Dijadwalkan' | 'Sedang Berjalan' | 'Selesai' | 'Dibatalkan';
  findingsCount: number;
  notes: string;
}

const INITIAL_INSPECTIONS: Inspection[] = [
  {
    id: 'insp-1',
    code: 'INSP/2026/XI/012',
    segmentName: 'Jl. Raya Lintas Sumatra (Natar - Tegineneng)',
    staRange: 'STA 10+000 s/d 22+000',
    inspectorName: 'Sugiarto, S.T. & Tim TRC II',
    uptd: 'UPTD II Lampung Selatan',
    scheduledDate: '11/11/2026',
    status: 'Dijadwalkan',
    findingsCount: 3,
    notes: 'Survei visual pasca hujan lebat & audit deformasi permukaan perkerasan lentur.',
  },
  {
    id: 'insp-2',
    code: 'INSP/2026/XI/009',
    segmentName: 'Jl. ZA. Pagar Alam - Raden Intan',
    staRange: 'STA 00+000 s/d 08+500',
    inspectorName: 'Ferry Pratama, A.Md.',
    uptd: 'UPTD I Bandar Lampung',
    scheduledDate: '09/11/2026',
    status: 'Selesai',
    findingsCount: 2,
    notes: 'Verifikasi rutting depan Kampus UBL dan checking elevasi manhole utilitas.',
  },
  {
    id: 'insp-3',
    code: 'INSP/2026/XI/014',
    segmentName: 'Jl. Lintas Timur (Menggala - Sp. Penawar)',
    staRange: 'STA 25+000 s/d 34+200',
    inspectorName: 'Ir. Doni Prasetyo & UPTD V',
    uptd: 'UPTD V Tulang Bawang',
    scheduledDate: '10/11/2026',
    status: 'Sedang Berjalan',
    findingsCount: 5,
    notes: 'Pemindaian bersama unit patroli AI Smart Cam untuk penilaian keretakan struktural.',
  },
];

interface InspectionsViewProps {
  segments: RoadSegment[];
  onOpenReportModal: () => void;
}

export const InspectionsView: React.FC<InspectionsViewProps> = ({ segments, onOpenReportModal }) => {
  const [inspections, setInspections] = useState<Inspection[]>(INITIAL_INSPECTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');

  const [formData, setFormData] = useState({
    segmentName: segments[0]?.name || 'Jl. Raya Lintas Sumatra',
    staRange: 'STA 00+000 s/d 10+000',
    inspectorName: '',
    uptd: 'UPTD I Bandar Lampung',
    scheduledDate: '12/11/2026',
    notes: '',
  });

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.inspectorName) {
      alert('Masukkan nama pengawas / inspektur lapangan');
      return;
    }

    const newInsp: Inspection = {
      id: `insp-${Date.now()}`,
      code: `INSP/2026/XI/${Math.floor(100 + Math.random() * 900)}`,
      segmentName: formData.segmentName,
      staRange: formData.staRange,
      inspectorName: formData.inspectorName,
      uptd: formData.uptd,
      scheduledDate: formData.scheduledDate,
      status: 'Dijadwalkan',
      findingsCount: 0,
      notes: formData.notes || 'Pemeriksaan rutin berkala',
    };

    setInspections([newInsp, ...inspections]);
    setIsModalOpen(false);
    setFormData({
      segmentName: segments[0]?.name || 'Jl. Raya Lintas Sumatra',
      staRange: 'STA 00+000 s/d 10+000',
      inspectorName: '',
      uptd: 'UPTD I Bandar Lampung',
      scheduledDate: '12/11/2026',
      notes: '',
    });
  };

  const handleUpdateStatus = (id: string, newStatus: Inspection['status']) => {
    setInspections(inspections.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const filteredInspections = inspections.filter(i => {
    if (filterStatus !== 'Semua' && i.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header Strip */}
      <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#0D1C2E] flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-blue-600" />
            <span>Manajemen Inspeksi Lapangan (PRD FR-07)</span>
          </h2>
          <p className="text-xs text-[#545F73]">
            Penjadwalan inspektur dinas, plotting rute survei berkala, penugasan Tim Reaksi Cepat (TRC), dan rekap temuan kerusakan.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1.5 text-xs font-medium text-[#0D1C2E] focus:outline-none"
          >
            <option value="Semua">Semua Status ({inspections.length})</option>
            <option value="Dijadwalkan">Dijadwalkan</option>
            <option value="Sedang Berjalan">Sedang Berjalan</option>
            <option value="Selesai">Selesai</option>
          </select>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#000000] hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Buat Jadwal Inspeksi</span>
          </button>
        </div>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInspections.map((insp) => {
          let badgeStatus = 'bg-blue-50 text-blue-700 border-blue-200';
          if (insp.status === 'Sedang Berjalan') badgeStatus = 'bg-amber-50 text-amber-700 border-amber-200';
          if (insp.status === 'Selesai') badgeStatus = 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div
              key={insp.id}
              className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-4 hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500">{insp.code}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeStatus}`}>
                    {insp.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#0D1C2E] mb-1">{insp.segmentName}</h3>
                <div className="text-xs text-blue-700 font-medium mb-3">{insp.staRange}</div>

                <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Inspektur Lapangan:</span>
                    <span className="font-semibold text-gray-900">{insp.inspectorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wilayah UPTD:</span>
                    <span>{insp.uptd}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jadwal Tanggal:</span>
                    <span className="font-mono text-gray-700">{insp.scheduledDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temuan Kerusakan:</span>
                    <span className="font-bold text-rose-600">{insp.findingsCount} Titik</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 line-clamp-2">
                  {insp.notes}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 mt-3">
                {insp.status === 'Dijadwalkan' && (
                  <button
                    onClick={() => handleUpdateStatus(insp.id, 'Sedang Berjalan')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold transition-colors"
                  >
                    Mulai Inspeksi Lapangan
                  </button>
                )}
                {insp.status === 'Sedang Berjalan' && (
                  <button
                    onClick={() => handleUpdateStatus(insp.id, 'Selesai')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Tandai Selesai & Verifikasi</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Buat Jadwal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden">
            <div className="bg-[#151B2A] text-white p-4 flex items-center justify-between">
              <h3 className="font-bold text-sm">Jadwalkan Agenda Inspeksi Lapangan Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateInspection} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Ruas Jalan Target</label>
                <select
                  value={formData.segmentName}
                  onChange={(e) => setFormData({ ...formData, segmentName: e.target.value })}
                  className="w-full p-2 bg-[#EFF4FF] border border-[#D5E0F8] rounded-lg text-xs font-medium text-gray-800"
                >
                  {segments.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Cakupan STA</label>
                  <input
                    type="text"
                    value={formData.staRange}
                    onChange={(e) => setFormData({ ...formData, staRange: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                    placeholder="STA 00+000 s/d 10+000"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Tanggal Rencana</label>
                  <input
                    type="text"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Inspektur Penanggung Jawab *</label>
                  <input
                    type="text"
                    value={formData.inspectorName}
                    onChange={(e) => setFormData({ ...formData, inspectorName: e.target.value })}
                    className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                    placeholder="Nama Pengawas / TRC"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">UPTD BMBK</label>
                  <select
                    value={formData.uptd}
                    onChange={(e) => setFormData({ ...formData, uptd: e.target.value })}
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800"
                  >
                    <option value="UPTD I Bandar Lampung">UPTD I Bandar Lampung</option>
                    <option value="UPTD II Lampung Selatan">UPTD II Lampung Selatan</option>
                    <option value="UPTD III Metro">UPTD III Metro</option>
                    <option value="UPTD IV Lampung Tengah">UPTD IV Lampung Tengah</option>
                    <option value="UPTD V Tulang Bawang">UPTD V Tulang Bawang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Instruksi Khusus / Catatan Survei</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg text-xs"
                  placeholder="Catatan parameter pemeriksaan (misal: checking retak buaya, bahu jalan amblas)..."
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#000000] hover:bg-zinc-800 text-white font-semibold rounded-lg text-xs shadow-sm"
                >
                  Simpan Jadwal Inspeksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

