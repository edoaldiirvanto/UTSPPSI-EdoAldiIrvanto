import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  CheckCircle, 
  Plus,
  Clock,
  Printer
} from 'lucide-react';
import { DamageReport } from '../types';
import { exportDamageReportsPdf } from '../utils/pdfExport';

interface DamageReportsViewProps {
  reports: DamageReport[];
  onSelectReport: (report: DamageReport) => void;
  onOpenReportModal: () => void;
  onUpdateStatus: (reportId: string, newStatus: DamageReport['status']) => void;
}

export const DamageReportsView: React.FC<DamageReportsViewProps> = ({
  reports,
  onSelectReport,
  onOpenReportModal,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterSeverity, setFilterSeverity] = useState('Semua');

  const filteredReports = reports.filter((rep) => {
    if (filterStatus !== 'Semua' && rep.status !== filterStatus) return false;
    if (filterSeverity !== 'Semua' && rep.severity !== filterSeverity) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        rep.ticketNumber.toLowerCase().includes(q) ||
        rep.segmentName.toLowerCase().includes(q) ||
        rep.damageType.toLowerCase().includes(q) ||
        rep.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nomor tiket, nama ruas jalan, atau jenis kerusakan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#EFF4FF] border border-[#D5E0F8] rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#545F73]">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1.5 text-xs font-medium text-[#0D1C2E] focus:outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Terverifikasi">Terverifikasi</option>
              <option value="Dalam Penanganan">Dalam Penanganan</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#545F73]">Tingkat:</span>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1.5 text-xs font-medium text-[#0D1C2E] focus:outline-none"
            >
              <option value="Semua">Semua Keparahan</option>
              <option value="Kritis">Kritis</option>
              <option value="Berat">Berat</option>
              <option value="Sedang">Sedang</option>
              <option value="Ringan">Ringan</option>
            </select>
          </div>

          {/* Export PDF Button */}
          <button
            onClick={() => exportDamageReportsPdf(filteredReports)}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#EFF4FF] hover:bg-[#DCE9FF] text-blue-700 rounded-lg text-xs font-semibold border border-[#D5E0F8] transition-colors"
            title="Ekspor rekapitulasi laporan kerusakan ke dokumen PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh Rekap PDF</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#000000] hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Input Laporan Baru</span>
          </button>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFF4FF] text-[#0D1C2E] uppercase text-[10px] font-semibold border-b border-[#D5E0F8]">
              <tr>
                <th className="py-3 px-4">Nomor Tiket</th>
                <th className="py-3 px-4">Lokasi & Ruas Jalan</th>
                <th className="py-3 px-4">Klasifikasi AI & Tipe</th>
                <th className="py-3 px-4 text-center">Tingkat / Prioritas</th>
                <th className="py-3 px-4">Sumber / Waktu</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EEFF]">
              {filteredReports.map((rep) => {
                let badgeSeverity = 'bg-blue-50 text-blue-700 border-blue-200';
                if (rep.severity === 'Sedang') badgeSeverity = 'bg-amber-50 text-amber-700 border-amber-200';
                if (rep.severity === 'Berat') badgeSeverity = 'bg-orange-50 text-orange-700 border-orange-200';
                if (rep.severity === 'Kritis') badgeSeverity = 'bg-rose-600 text-white border-rose-600';

                let badgeStatus = 'bg-amber-50 text-amber-800 border-amber-200';
                if (rep.status === 'Terverifikasi') badgeStatus = 'bg-blue-50 text-blue-800 border-blue-200';
                if (rep.status === 'Dalam Penanganan') badgeStatus = 'bg-purple-50 text-purple-800 border-purple-200';
                if (rep.status === 'Selesai') badgeStatus = 'bg-emerald-50 text-emerald-800 border-emerald-200';

                return (
                  <tr key={rep.id} className="hover:bg-[#F8F9FF] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-gray-800">{rep.ticketNumber}</div>
                      <div className="text-[10px] text-gray-400 font-mono">STA: {rep.staLocation}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#0D1C2E]">{rep.segmentName}</div>
                      <div className="text-[11px] text-gray-500">{rep.uptd}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{rep.damageType}</div>
                      {rep.aiConfidence && (
                        <div className="text-[10px] text-indigo-600 font-semibold">
                          AI Confidence: {(rep.aiConfidence * 100).toFixed(0)}%
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${badgeSeverity}`}>
                        {rep.severity}
                      </span>
                      <div className="text-[10px] text-gray-500 mt-0.5 font-mono">
                        Skor: {rep.priorityScore.toFixed(1)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-gray-700 font-medium">{rep.source}</div>
                      <div className="text-[10px] text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{rep.reportedAt}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${badgeStatus}`}>
                        {rep.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {rep.status === 'Menunggu Verifikasi' && (
                          <button
                            onClick={() => onUpdateStatus(rep.id, 'Terverifikasi')}
                            title="Verifikasi Valid"
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onSelectReport(rep)}
                          className="px-2.5 py-1 bg-[#151B2A] hover:bg-zinc-800 text-white rounded text-[11px] font-medium transition-colors"
                        >
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
