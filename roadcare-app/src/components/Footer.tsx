import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-12 bg-white border-t border-[#E6EEFF] px-6 flex items-center justify-between text-[11px] text-[#545F73]">
      <div className="flex items-center gap-3">
        <span>RoadCare © 2026 SIM-PJ Prov. Lampung</span>
        <span>•</span>
        <span className="font-medium text-gray-700">
          Copyright©2026 by Edo Aldi Irvanto dan Dr. Erliyan Redy Susanto, M.Kom
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>Server Data Hub Connected</span>
        <span className="font-mono text-[10px] text-gray-400">| v1.0.0-PROD</span>
      </div>
    </footer>
  );
};

