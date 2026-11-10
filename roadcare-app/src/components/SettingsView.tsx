import React from 'react';
import { Settings, Shield, Server, Database, History, RefreshCw, Key } from 'lucide-react';
import { AuditLog } from '../types';

interface SettingsViewProps {
  auditLogs: AuditLog[];
}

export const SettingsView: React.FC<SettingsViewProps> = ({ auditLogs }) => {
  return (
    <div className="space-y-6">
      {/* System Status Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#E6EEFF] shadow-sm">
        <h2 className="text-base font-bold text-[#0D1C2E] flex items-center gap-2 mb-1">
          <Settings className="w-4 h-4 text-gray-700" />
          <span>Pengaturan Sistem & Konfigurasi SIM-PJ</span>
        </h2>
        <p className="text-xs text-[#545F73]">
          Infrastruktur backend, koneksi spasial PostGIS, integrasi model YOLOv8, dan audit trail operasional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div className="p-3 bg-[#EFF4FF] rounded-lg border border-[#D5E0F8] flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-xs font-bold text-gray-900">PostgreSQL 16 + PostGIS 3.4</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Tersambung (Spasial SRID: 4326)
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 flex items-center gap-3">
            <Server className="w-8 h-8 text-purple-600" />
            <div>
              <div className="text-xs font-bold text-gray-900">AI Service (Python Axum Relay)</div>
              <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Inference Engine Active (24ms latency)
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-gray-900">Keamanan & RBAC</div>
              <div className="text-[10px] text-gray-600">Peran: Administrator Dinas (Full Access)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Trail Section */}
      <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-sm text-[#0D1C2E]">Audit Trail & Log Aktivitas Sistem (PRD FR-19)</h3>
          </div>
          <span className="text-[11px] text-gray-500">Immutable Audit Trail</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#EFF4FF] text-[#0D1C2E] uppercase text-[10px] font-semibold border-b border-[#D5E0F8]">
              <tr>
                <th className="py-2.5 px-3">Waktu (WIB)</th>
                <th className="py-2.5 px-3">Pengguna / Aktor</th>
                <th className="py-2.5 px-3">Peran / Role</th>
                <th className="py-2.5 px-3">Aktivitas</th>
                <th className="py-2.5 px-3">Rincian Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6EEFF]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8F9FF]">
                  <td className="py-2.5 px-3 font-mono text-gray-500">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#0D1C2E]">{log.actor}</td>
                  <td className="py-2.5 px-3 text-gray-600">{log.role}</td>
                  <td className="py-2.5 px-3 font-medium text-blue-700">{log.action}</td>
                  <td className="py-2.5 px-3 text-gray-700">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

