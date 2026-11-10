import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  FileWarning, 
  ClipboardCheck,
  FileSpreadsheet,
  CalendarClock, 
  Coins, 
  Cpu, 
  Truck, 
  Settings,
  HelpCircle,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reportCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, reportCount }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Beranda / Executive', icon: LayoutDashboard },
    { id: 'gis-map', label: 'Pemantauan Jalan GIS', icon: MapPin },
    { id: 'damage-reports', label: 'Laporan Kerusakan', icon: FileWarning, badge: reportCount },
    { id: 'inspections', label: 'Jadwal Inspeksi TRC', icon: ClipboardCheck },
    { id: 'pci-assessment', label: 'Penilaian PCI & IRI', icon: FileSpreadsheet },
    { id: 'ai-detection', label: 'Analisis & Deteksi AI', icon: Cpu, isAi: true },
    { id: 'ai-analytics', label: 'Analitik AI & Prediksi', icon: BarChart3 },
    { id: 'work-orders', label: 'Jadwal & SPK Preservasi', icon: CalendarClock },
    { id: 'budget', label: 'Anggaran & Realisasi', icon: Coins },
    { id: 'assets', label: 'Manajemen Aset & Tim', icon: Truck },
    { id: 'settings', label: 'Pengaturan Sistem', icon: Settings },
  ];

  return (
    <aside className="w-[260px] min-w-[260px] bg-[#151B2A] text-white flex flex-col h-screen border-r border-[#1e273d] select-none z-30">
      {/* Logos and Header */}
      <div className="p-4 border-b border-[#232d44]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/10">
            <img 
              src="/Pemda.png" 
              alt="Logo Pemprov Lampung" 
              className="h-9 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <img 
              src="/UNIVERSITASTEKNOKRAT.png" 
              alt="Logo UTI" 
              className="h-9 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">RoadCare</span>
              <span className="text-[10px] bg-blue-500/20 text-blue-400 font-semibold px-1.5 py-0.5 rounded border border-blue-400/30">v1.0</span>
            </div>
            <p className="text-[11px] text-[#7D8496] leading-tight">SIM-PJ Prov. Lampung</p>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t border-white/5 text-[10px] text-[#7D8496] flex items-center justify-between">
          <span>Dinas BMBK Prov. Lampung</span>
          <span className="text-emerald-400 flex items-center gap-1 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            LIVE
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="text-[10px] uppercase tracking-wider text-[#7D8496] font-semibold px-3 py-1.5">
          Modul Operasional
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm font-semibold'
                  : 'text-[#7D8496] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#7D8496]'}`} />
              <span className="truncate flex-1">{item.label}</span>
              {item.isAi && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded">
                  YOLOv8
                </span>
              )}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[11px] font-bold px-1.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Research & Tech Partner Badge */}
      <div className="p-3.5 mx-3 mb-3 bg-[#1B2337] rounded-xl border border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-blue-400 font-medium mb-1 text-[11px]">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Research & Tech Partner</span>
        </div>
        <p className="text-[11px] text-gray-300 font-medium">Universitas Teknokrat Indonesia</p>
        <p className="text-[10px] text-[#7D8496] mt-0.5">Pusat Riset AI & Sistem Cerdas Spasial</p>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#232d44] text-[10px] text-[#7D8496] flex items-center justify-between">
        <span>PostgreSQL + PostGIS</span>
        <span className="font-mono text-emerald-400">Node/Vite PWA</span>
      </div>
    </aside>
  );
};
