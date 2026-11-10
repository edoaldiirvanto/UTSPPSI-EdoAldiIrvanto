import React, { useState } from 'react';
import { Truck, Plus, HardHat, CheckCircle2, AlertCircle, Wrench, Radio } from 'lucide-react';
import { AssetEquipment } from '../types';

interface AssetsViewProps {
  equipment: AssetEquipment[];
  onAddEquipment: (item: AssetEquipment) => void;
}

export const AssetsView: React.FC<AssetsViewProps> = ({ equipment, onAddEquipment }) => {
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const filteredItems = equipment.filter((eq) => {
    if (filterCategory !== 'Semua' && eq.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-[#0D1C2E] flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>Manajemen Aset, Alat Berat & Logistik Preservasi</span>
          </h2>
          <p className="text-xs text-[#545F73]">
            Inventarisasi kesiapan armada TRC, alat berat perkerasan, material cold mix, dan unit sensor patroli AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1.5 text-xs font-medium text-[#0D1C2E] focus:outline-none"
          >
            <option value="Semua">Semua Kategori ({equipment.length})</option>
            <option value="Alat Berat">Alat Berat</option>
            <option value="Kendaraan Patroli">Kendaraan Patroli</option>
            <option value="Material Campuran">Material Campuran</option>
            <option value="Sensor AI">Sensor AI</option>
          </select>
        </div>
      </div>

      {/* Grid of Equipments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          let badgeStatus = 'bg-emerald-50 text-emerald-700 border-emerald-200';
          if (item.status === 'Sedang Digunakan') badgeStatus = 'bg-blue-50 text-blue-700 border-blue-200';
          if (item.status === 'Dalam Perawatan') badgeStatus = 'bg-rose-50 text-rose-700 border-rose-200';

          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-4 hover:border-blue-200 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-gray-500">{item.code}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeStatus}`}>
                  {item.status}
                </span>
              </div>

              <h3 className="font-bold text-sm text-[#0D1C2E] mb-1">{item.name}</h3>
              <div className="text-xs text-blue-700 font-medium mb-3">{item.category}</div>

              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-100 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Penempatan UPTD:</span>
                  <span className="font-medium text-gray-800">{item.uptd}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Lokasi / Rute Terkini:</span>
                  <span className="text-gray-800">{item.location}</span>
                </div>
                {item.operator && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Operator / Penanggung Jawab:</span>
                    <span className="font-semibold text-gray-900">{item.operator}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

