import React from 'react';
import { 
  Bell, 
  Search, 
  MapPin, 
  Calendar, 
  PlusCircle, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface TopbarProps {
  onOpenReportModal: () => void;
  selectedUptd: string;
  setSelectedUptd: (uptd: string) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  onOpenReportModal, 
  selectedUptd, 
  setSelectedUptd 
}) => {
  return (
    <header className="h-16 bg-white border-b border-[#E6EEFF] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumbs & Scope */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs text-[#545F73]">
          <span className="font-semibold text-[#0D1C2E]">Provinsi Lampung</span>
          <span>/</span>
          <span>Dinas Bina Marga & Bina Konstruksi</span>
        </div>

        {/* UPTD Selector Filter */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#EFF4FF] border border-[#D5E0F8] rounded-lg px-2.5 py-1 text-xs text-[#0D1C2E]">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <select 
            value={selectedUptd}
            onChange={(e) => setSelectedUptd(e.target.value)}
            className="bg-transparent border-none text-xs font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="Semua UPTD">Semua Wilayah Kerja UPTD</option>
            <option value="UPTD I Bandar Lampung">UPTD I - Bandar Lampung</option>
            <option value="UPTD II Lampung Selatan">UPTD II - Lampung Selatan</option>
            <option value="UPTD III Metro">UPTD III - Kota Metro</option>
            <option value="UPTD IV Lampung Tengah">UPTD IV - Lampung Tengah</option>
            <option value="UPTD V Tulang Bawang">UPTD V - Tulang Bawang</option>
          </select>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#545F73] bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">
          <Calendar className="w-3.5 h-3.5 text-gray-500" />
          <span>Tahun Anggaran 2026 (Murni)</span>
        </div>
      </div>

      {/* Right: Quick Action, Search, Notifications, User */}
      <div className="flex items-center gap-3">
        {/* Quick Report Button */}
        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 bg-[#000000] hover:bg-zinc-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-95"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>Buat Laporan / Deteksi</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-semibold text-xs">
            IR
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-[#0D1C2E] flex items-center gap-1">
              Ir. Hendra Gunawan, S.T.
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-[10px] text-[#545F73]">Kepala Bidang Preservasi Jalan</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>
    </header>
  );
};

