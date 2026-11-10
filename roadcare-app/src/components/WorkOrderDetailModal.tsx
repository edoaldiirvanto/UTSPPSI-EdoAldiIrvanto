import React, { useState } from 'react';
import { WorkOrder } from '../types';
import { exportSpkPdf } from '../utils/pdfExport';
import { 
  X, 
  Building2, 
  Calendar, 
  Download, 
  Award,
  Layers,
  FileCheck
} from 'lucide-react';

interface WorkOrderDetailModalProps {
  workOrder: WorkOrder;
  onClose: () => void;
  onUpdateStatus: (woId: string, status: WorkOrder['status']) => void;
}

export const WorkOrderDetailModal: React.FC<WorkOrderDetailModalProps> = ({
  workOrder,
  onClose,
  onUpdateStatus,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-3xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#151B2A] text-white p-5 flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-blue-400 font-semibold">{workOrder.spkNumber}</span>
            <h2 className="text-base font-bold mt-0.5">{workOrder.title}</h2>
            <p className="text-xs text-gray-300 mt-0.5">{workOrder.segmentName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportSpkPdf(workOrder)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Unduh Lembar Dokumen SPK Format PDF Resmi"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Cetak / Unduh PDF SPK</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-[#EFF4FF] rounded-lg border border-[#D5E0F8]">
              <span className="text-gray-500 block text-[10px] uppercase">Status Pelaksanaan</span>
              <span className="font-bold text-blue-700 text-xs mt-0.5 block">{workOrder.status}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase">Progres Fisik</span>
              <span className="font-bold text-[#0D1C2E] text-xs mt-0.5 block">{workOrder.progressPercent}%</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase">Pagu Anggaran SPK</span>
              <span className="font-bold text-[#0D1C2E] text-xs mt-0.5 block">
                Rp {workOrder.budgetAllocated.toLocaleString('id-ID')}
              </span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <span className="text-gray-500 block text-[10px] uppercase">Realisasi Pembayaran</span>
              <span className="font-bold text-emerald-600 text-xs mt-0.5 block">
                Rp {workOrder.budgetRealized.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          {/* Details & Teams */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
            <div>
              <h4 className="font-bold text-xs text-[#0D1C2E] mb-2 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Pelaksana & Pengawasan</span>
              </h4>
              <div className="space-y-1.5 text-gray-700">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Penyedia Jasa:</span>
                  <span className="font-semibold text-gray-900">{workOrder.contractor}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Tim Lapangan (TRC):</span>
                  <span>{workOrder.assignedTeam}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Pengawas Lapangan:</span>
                  <span className="font-medium text-gray-900">{workOrder.supervisor}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs text-[#0D1C2E] mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Jadwal & Waktu Kontrak</span>
              </h4>
              <div className="space-y-1.5 text-gray-700">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Mulai Pekerjaan:</span>
                  <span className="font-mono">{workOrder.startDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Target Selesai (PHO):</span>
                  <span className="font-mono">{workOrder.endDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Tahun Anggaran:</span>
                  <span>2026 (APBD Provinsi Lampung)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bill of Quantities (BoQ) */}
          <div>
            <h4 className="font-bold text-xs text-[#0D1C2E] mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Rincian Mata Pembayaran & Bill of Quantities (BoQ)</span>
            </h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#EFF4FF] text-[#0D1C2E] uppercase text-[10px] font-semibold border-b border-[#D5E0F8]">
                  <tr>
                    <th className="py-2 px-3">Uraian Pekerjaan Spesifikasi Umum 2018</th>
                    <th className="py-2 px-3 text-center">Volume</th>
                    <th className="py-2 px-3 text-right">Harga Satuan (Rp)</th>
                    <th className="py-2 px-3 text-right">Jumlah Total (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {workOrder.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2 px-3 font-medium text-gray-800">{item.description}</td>
                      <td className="py-2 px-3 text-center font-mono">{item.volume}</td>
                      <td className="py-2 px-3 text-right font-mono">{item.unitPrice.toLocaleString('id-ID')}</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-gray-900">{item.total.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold border-t border-gray-200">
                    <td colSpan={3} className="py-2 px-3 text-right uppercase text-[11px]">Total Nilai Pekerjaan Fisik</td>
                    <td className="py-2 px-3 text-right font-mono text-blue-700">
                      Rp {workOrder.budgetAllocated.toLocaleString('id-ID')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            {workOrder.status === 'Approved' && (
              <button
                onClick={() => {
                  onUpdateStatus(workOrder.id, 'In Progress');
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                Mulai Pelaksanaan Fisik (In Progress)
              </button>
            )}
            {workOrder.status === 'In Progress' && (
              <button
                onClick={() => {
                  onUpdateStatus(workOrder.id, 'Completed');
                  onClose();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                Serah Terima Pertama (PHO / Completed)
              </button>
            )}
            {workOrder.status === 'Completed' && (
              <button
                onClick={() => {
                  onUpdateStatus(workOrder.id, 'Verified');
                  onClose();
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Verifikasi Mutu & Terbitkan FHO</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
