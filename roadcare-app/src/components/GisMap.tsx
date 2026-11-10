import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polyline,
  LayersControl
} from 'react-leaflet';
import L from 'leaflet';
import { RoadSegment, DamageReport } from '../types';
import { 
  MapPin, 
  AlertTriangle, 
  Layers, 
  Eye, 
  Filter, 
  CheckCircle2, 
  FileText,
  Navigation
} from 'lucide-react';

// Custom Marker icons
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">
        ${label}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

interface GisMapProps {
  segments: RoadSegment[];
  reports: DamageReport[];
  onSelectReport: (report: DamageReport) => void;
  onOpenReportModal: () => void;
}

export const GisMap: React.FC<GisMapProps> = ({ 
  segments, 
  reports, 
  onSelectReport,
  onOpenReportModal
}) => {
  const [selectedCondition, setSelectedCondition] = useState<string>('Semua');
  const [selectedDamageType, setSelectedDamageType] = useState<string>('Semua');
  const [activeSegment, setActiveSegment] = useState<RoadSegment | null>(null);

  // Filter segments
  const filteredSegments = segments.filter(seg => {
    if (selectedCondition !== 'Semua' && seg.condition !== selectedCondition) return false;
    return true;
  });

  // Filter reports
  const filteredReports = reports.filter(rep => {
    if (selectedDamageType !== 'Semua' && rep.damageType !== selectedDamageType) return false;
    return true;
  });

  const getPolylineColor = (condition: string) => {
    switch (condition) {
      case 'Mantap': return '#10b981'; // Green
      case 'Sedang': return '#3b82f6'; // Blue
      case 'Rusak Ringan': return '#f59e0b'; // Amber
      case 'Rusak Berat': return '#ea580c'; // Orange
      case 'Kritis': return '#ba1a1a'; // Red
      default: return '#6b7280';
    }
  };

  const getMarkerColor = (severity: string) => {
    switch (severity) {
      case 'Kritis': return '#ba1a1a';
      case 'Berat': return '#ea580c';
      case 'Sedang': return '#f59e0b';
      case 'Ringan': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter strip */}
      <div className="bg-white p-4 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0D1C2E]">
            <Filter className="w-4 h-4 text-blue-600" />
            <span>Filter Layer Spasial:</span>
          </div>

          {/* Condition Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#545F73]">Kondisi Ruas:</span>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1 text-xs font-medium text-[#0D1C2E] focus:outline-none"
            >
              <option value="Semua">Semua Kondisi ({segments.length})</option>
              <option value="Mantap">Mantap</option>
              <option value="Sedang">Sedang</option>
              <option value="Rusak Ringan">Rusak Ringan</option>
              <option value="Rusak Berat">Rusak Berat</option>
              <option value="Kritis">Kritis</option>
            </select>
          </div>

          {/* Damage Type Filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#545F73]">Jenis Kerusakan Titik:</span>
            <select
              value={selectedDamageType}
              onChange={(e) => setSelectedDamageType(e.target.value)}
              className="bg-[#EFF4FF] border border-[#D5E0F8] rounded-md px-2 py-1 text-xs font-medium text-[#0D1C2E] focus:outline-none"
            >
              <option value="Semua">Semua Titik ({reports.length})</option>
              <option value="Pothole">Pothole (Lubang)</option>
              <option value="Alligator Cracking">Alligator Cracking</option>
              <option value="Rutting">Rutting (Alur Roda)</option>
              <option value="Edge Failure">Edge Failure (Kerusakan Bahu)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#000000] hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Plot Titik Kerusakan</span>
          </button>
        </div>
      </div>

      {/* Map Container and Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Map Canvas (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-[#E6EEFF] shadow-sm overflow-hidden h-[620px] relative z-10">
          <MapContainer
            center={[-5.3950, 105.2580]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Polyline Segments */}
            {filteredSegments.map((segment) => (
              <Polyline
                key={segment.id}
                positions={segment.coordinates}
                pathOptions={{
                  color: getPolylineColor(segment.condition),
                  weight: 6,
                  opacity: 0.85,
                }}
                eventHandlers={{
                  click: () => setActiveSegment(segment),
                }}
              >
                <Popup>
                  <div className="text-xs p-1">
                    <div className="font-bold text-sm text-[#0D1C2E] mb-1">{segment.name}</div>
                    <div className="font-mono text-gray-500 mb-1">{segment.code} | {segment.uptd}</div>
                    <div className="space-y-0.5 text-gray-700">
                      <div>Panjang: <strong>{segment.lengthKm} km</strong> | Lebar: <strong>{segment.widthM} m</strong></div>
                      <div>Kondisi: <span className="font-semibold text-rose-600">{segment.condition}</span> (PCI: {segment.pciScore})</div>
                      <div>LHR: <strong>{segment.trafficLhr.toLocaleString('id-ID')} Kend/hari</strong></div>
                    </div>
                  </div>
                </Popup>
              </Polyline>
            ))}

            {/* Damage Point Markers */}
            {filteredReports.map((report) => (
              <Marker
                key={report.id}
                position={report.coordinates}
                icon={createCustomIcon(getMarkerColor(report.severity), report.damageType[0])}
                eventHandlers={{
                  click: () => onSelectReport(report),
                }}
              >
                <Popup>
                  <div className="text-xs p-1 max-w-[200px]">
                    <div className="font-bold text-[#0D1C2E]">{report.damageType}</div>
                    <div className="text-gray-500 font-mono text-[11px] mb-1">{report.ticketNumber}</div>
                    <div className="text-gray-700 line-clamp-2 mb-2">{report.description}</div>
                    <button
                      onClick={() => onSelectReport(report)}
                      className="w-full py-1 bg-blue-600 text-white rounded text-center font-semibold text-[11px]"
                    >
                      Buka Rincian Tiket
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Floating Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-md text-xs z-[1000] pointer-events-auto max-w-[240px]">
            <div className="font-bold text-[#0D1C2E] mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Legenda Kondisi Ruas</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 bg-[#10b981] rounded"></span>
                <span>Mantap (PCI 80-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 bg-[#3b82f6] rounded"></span>
                <span>Sedang (PCI 60-79)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 bg-[#f59e0b] rounded"></span>
                <span>Rusak Ringan (PCI 40-59)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 bg-[#ea580c] rounded"></span>
                <span>Rusak Berat (PCI 20-39)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1.5 bg-[#ba1a1a] rounded"></span>
                <span>Kritis (PCI &lt; 20)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Panel (1 Col) */}
        <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-4 flex flex-col h-[620px] overflow-y-auto">
          <h3 className="font-bold text-sm text-[#0D1C2E] mb-1 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>Detail Ruas Terpilih</span>
          </h3>
          <p className="text-xs text-[#545F73] mb-4">Klik garis ruas jalan pada peta untuk melihat data teknis.</p>

          {activeSegment ? (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#EFF4FF] rounded-lg border border-[#D5E0F8]">
                <div className="text-[10px] font-mono text-blue-700 font-semibold">{activeSegment.code}</div>
                <div className="font-bold text-sm text-[#0D1C2E] mt-0.5">{activeSegment.name}</div>
                <div className="text-[11px] text-[#545F73] mt-1">{activeSegment.uptd}</div>
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-3">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Panjang Ruas</span>
                  <span className="font-semibold text-gray-800">{activeSegment.lengthKm} km</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Lebar Standar</span>
                  <span className="font-semibold text-gray-800">{activeSegment.widthM} meter</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Kondisi Kemantapan</span>
                  <span className="font-bold text-rose-600">{activeSegment.condition}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Skor PCI</span>
                  <span className="font-mono font-bold text-blue-700">{activeSegment.pciScore} / 100</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Nilai Kekasaran (IRI)</span>
                  <span className="font-mono text-gray-800">{activeSegment.iriScore} m/km</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500">Volume LHR</span>
                  <span className="font-semibold text-gray-800">{activeSegment.trafficLhr.toLocaleString('id-ID')} kend/hari</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Survei Terakhir</span>
                  <span className="font-mono text-gray-800">{activeSegment.lastInspected}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5 text-xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Rekomendasi Preservasi</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  {activeSegment.pciScore < 50 
                    ? 'Diperlukan Rekonstruksi Pavement dan Patching struktural sebelum musim penghujan tinggi.'
                    : 'Pemeliharaan rutin berkala & pembersihan sistem drainase tepi.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <Layers className="w-10 h-10 mb-2 text-gray-300" />
              <p className="text-xs font-medium">Belum ada ruas yang dipilih</p>
              <p className="text-[11px] mt-1 text-gray-400">Pilih salah satu garis jalan di peta sebelah kiri untuk melihat profil lengkap teknis jalan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

