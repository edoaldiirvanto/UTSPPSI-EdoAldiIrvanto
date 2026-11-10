import React from 'react';
import { DamageReport } from '../types';
import { 
  X, 
  User, 
  CheckCircle, 
  Wrench,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { maskPhoneNumber, maskPersonName } from '../utils/security';

interface DamageReportModalProps {
  report: DamageReport;
  onClose: () => void;
  onUpdateStatus: (reportId: string, status: DamageReport['status']) => void;
}

export const DamageReportModal: React.FC<DamageReportModalProps> = ({
  report,
  onClose,
  onUpdateStatus,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#151B2A] text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-blue-400 font-bold">{report.ticketNumber}</span>
              <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                report.severity === 'Kritis' ? 'bg-rose-600 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {report.severity}
              </span>
            </div>
            <h2 className="text-base font-bold mt-1">{report.damageType}</h2>
            <p className="text-xs text-gray-300">{report.segmentName} ({report.staLocation})</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Photo & Metadata split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden border border-gray-200 aspect-video sm:aspect-square bg-slate-900 flex items-center justify-center">
              <img 
                src={report.photoUrl} 
                alt="Bukti Kerusakan" 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-[#EFF4FF] rounded-lg border border-[#D5E0F8]">
                <span className="text-[10px] uppercase text-gray-500 font-semibold block">Kalkulasi Prioritas (PRD FR-06)</span>
                <div className="text-xl font-bold text-rose-600 mt-0.5">
                  {report.priorityScore.toFixed(1)} / 100
                </div>
                <div className="text-[10px] text-gray-600 mt-1">
                  P = (D×0.35) + (T×0.25) + (S×0.25) + (I×0.15)
                </div>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Sumber Pelaporan:</span>
                  <span className="font-semibold text-gray-800">{report.source}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Waktu Lapor:</span>
                  <span className="font-mono text-gray-700">{report.reportedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimasi Biaya:</span>
                  <span className="font-bold text-[#0D1C2E]">Rp {report.estimatedCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Koordinat GPS:</span>
                  <span className="font-mono text-gray-600">{report.coordinates.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-xs text-[#0D1C2E] mb-1">Deskripsi Kerusakan Fisik:</h4>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 leading-relaxed">
              {report.description}
            </div>
          </div>

          {/* Reporter details with UU PDP Masking & Protected Privacy badge */}
          {report.reporterName && (
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center justify-between mb-1.5">
                <div className="font-semibold text-gray-800 flex items-center gap-1.5 text-xs">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Identitas Pelapor Masyarakat</span>
                </div>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  UU PDP No. 27/2022 Protected
                </span>
              </div>
              <div className="text-gray-600 flex items-center gap-4">
                <div>Nama: <strong>{maskPersonName(report.reporterName)}</strong></div>
                <div>•</div>
                <div className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-gray-400" />
                  <span>WhatsApp: <strong>{maskPhoneNumber(report.reporterPhone)}</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            {report.status === 'Menunggu Verifikasi' && (
              <>
                <button
                  onClick={() => {
                    onUpdateStatus(report.id, 'Ditolak');
                    onClose();
                  }}
                  className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-semibold rounded-lg transition-colors"
                >
                  Tolak Laporan
                </button>
                <button
                  onClick={() => {
                    onUpdateStatus(report.id, 'Terverifikasi');
                    onClose();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verifikasi Valid</span>
                </button>
              </>
            )}

            {report.status === 'Terverifikasi' && (
              <button
                onClick={() => {
                  onUpdateStatus(report.id, 'Dalam Penanganan');
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Terbitkan SPK Penanganan</span>
              </button>
            )}

            {report.status === 'Dalam Penanganan' && (
              <button
                onClick={() => {
                  onUpdateStatus(report.id, 'Selesai');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                Tandai Selesai Diperbaiki
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
