import React, { useState } from 'react';
import { WorkOrder } from '../types';
import { 
  CalendarClock, 
  Plus, 
  FileCheck, 
  HardHat, 
  ChevronRight, 
  Clock, 
  Coins, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface WorkOrdersViewProps {
  workOrders: WorkOrder[];
  onSelectWorkOrder: (wo: WorkOrder) => void;
  onUpdateStatus: (woId: string, newStatus: WorkOrder['status']) => void;
}

export const WorkOrdersView: React.FC<WorkOrdersViewProps> = ({
  workOrders,
  onSelectWorkOrder,
  onUpdateStatus,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  const filteredOrders = workOrders.filter((w) => {
    if (filterStatus !== 'Semua' && w.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header Strip */}
      <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#0D1C2E] flex items-center gap-2">
            <HardHat className="w-4 h-4 text-amber-600" />
            <span>Daftar Surat Perintah Kerja (SPK) Preservasi Jalan</span>
          </h2>
          <p className="text-xs text-[#545F73]">
            Manajemen kontrak fisik preservasi jalan, Bill of Quantity (BoQ), pengawasan dan verifikasi mutu lapangan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#545F73]">Status SPK:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1 text-xs font-medium text-[#0D1C2E] focus:outline-none"
            >
              <option value="Semua">Semua Status ({workOrders.length})</option>
              <option value="Approved">Approved</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Work Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((wo) => {
          let badgeStatus = 'bg-blue-50 text-blue-700 border-blue-200';
          if (wo.status === 'In Progress') badgeStatus = 'bg-amber-50 text-amber-700 border-amber-200';
          if (wo.status === 'Completed') badgeStatus = 'bg-emerald-50 text-emerald-700 border-emerald-200';

          return (
            <div
              key={wo.id}
              className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-4 hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] font-bold text-gray-500">{wo.spkNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeStatus}`}>
                    {wo.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[#0D1C2E] mb-1 line-clamp-2">{wo.title}</h3>
                <div className="text-xs text-blue-700 font-medium mb-3">{wo.segmentName}</div>

                <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Penyedia Jasa:</span>
                    <span className="font-medium text-gray-800">{wo.contractor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tim Lapangan:</span>
                    <span className="text-gray-800">{wo.assignedTeam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nilai Kontrak:</span>
                    <span className="font-bold text-[#0D1C2E]">Rp {wo.budgetAllocated.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Masa Pelaksanaan:</span>
                    <span className="font-mono text-[11px] text-gray-700">{wo.startDate} - {wo.endDate}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600">Progres Fisik</span>
                    <span className="text-blue-700">{wo.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        wo.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${wo.progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => onSelectWorkOrder(wo)}
                  className="flex-1 py-1.5 bg-[#EFF4FF] hover:bg-[#DCE9FF] text-blue-700 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                >
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>Rincian BoQ & Tim</span>
                </button>
                {wo.status === 'In Progress' && (
                  <button
                    onClick={() => onUpdateStatus(wo.id, 'Completed')}
                    className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors"
                    title="Tandai Selesai 100%"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

