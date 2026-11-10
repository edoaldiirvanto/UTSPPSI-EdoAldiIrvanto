import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Send, 
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { DamageReport } from '../types';
import { sanitizeText } from '../utils/security';

interface NewReportModalProps {
  onClose: () => void;
  onSubmit: (report: Partial<DamageReport>) => void;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    segmentName: 'Jl. Raya Lintas Sumatra (Natar - Tegineneng)',
    staLocation: 'STA 18+200',
    district: 'Lampung Selatan',
    uptd: 'UPTD II Lampung Selatan',
    damageType: 'Pothole' as DamageReport['damageType'],
    severity: 'Berat' as DamageReport['severity'],
    source: 'Masyarakat' as DamageReport['source'],
    reporterName: '',
    reporterPhone: '',
    description: '',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    latitude: -5.2500,
    longitude: 105.1850,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      alert('Silakan masukkan deskripsi kerusakan.');
      return;
    }

    // Sanitization input data (Anti-XSS & Anti-Injection)
    const sanitizedDescription = sanitizeText(formData.description.trim());
    const sanitizedReporterName = sanitizeText(formData.reporterName.trim());
    const sanitizedPhone = sanitizeText(formData.reporterPhone.trim());

    // Hitung rumus FR-06
    const severityScore = formData.severity === 'Kritis' ? 90 : formData.severity === 'Berat' ? 75 : 50;
    const priorityScore = (severityScore * 0.35) + (70 * 0.25) + (80 * 0.25) + (75 * 0.15);

    onSubmit({
      ticketNumber: `RC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      segmentName: formData.segmentName,
      staLocation: formData.staLocation,
      district: formData.district,
      uptd: formData.uptd,
      damageType: formData.damageType,
      severity: formData.severity,
      severityScore,
      priorityScore,
      priorityLevel: priorityScore >= 80 ? 'Kritis' : priorityScore >= 60 ? 'Tinggi' : 'Sedang',
      source: formData.source,
      reporterName: sanitizedReporterName || 'Warga Anonim',
      reporterPhone: sanitizedPhone || '08xx-xxxx-xxxx',
      description: sanitizedDescription,
      photoUrl: formData.photoUrl,
      coordinates: [formData.latitude, formData.longitude],
      reportedAt: '10/11/2026 ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      status: 'Menunggu Verifikasi',
      estimatedCost: 25000000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#151B2A] text-white p-5 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">Input Laporan Kerusakan Jalan</h2>
            <p className="text-xs text-gray-300">Pengaduan Masyarakat & Petugas Preservasi Lampung</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Ruas Jalan Provinsi *</label>
            <select
              value={formData.segmentName}
              onChange={(e) => setFormData({ ...formData, segmentName: e.target.value })}
              className="w-full p-2 bg-[#EFF4FF] border border-[#D5E0F8] rounded-lg text-xs font-medium text-gray-800 focus:outline-none"
            >
              <option value="Jl. Raya Lintas Sumatra (Natar - Tegineneng)">Jl. Raya Lintas Sumatra (Natar - Tegineneng)</option>
              <option value="Jl. ZA. Pagar Alam - Raden Intan">Jl. ZA. Pagar Alam - Raden Intan</option>
              <option value="Jl. Ryacudu (Akses Tol Kotabaru - ITERA)">Jl. Ryacudu (Akses Tol Kotabaru - ITERA)</option>
              <option value="Jl. Lintas Timur (Menggala - Sp. Penawar)">Jl. Lintas Timur (Menggala - Sp. Penawar)</option>
              <option value="Jl. Jend. Sudirman - Ahmad Yani (Metro)">Jl. Jend. Sudirman - Ahmad Yani (Metro)</option>
              <option value="Jl. Lintas Tengah (Gunung Sugih)">Jl. Lintas Tengah (Gunung Sugih)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Titik STA (Stasioning)</label>
              <input
                type="text"
                value={formData.staLocation}
                onChange={(e) => setFormData({ ...formData, staLocation: e.target.value })}
                placeholder="Contoh: STA 14+350"
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Jenis Kerusakan *</label>
              <select
                value={formData.damageType}
                onChange={(e) => setFormData({ ...formData, damageType: e.target.value as any })}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800"
              >
                <option value="Pothole">Pothole (Lubang)</option>
                <option value="Alligator Cracking">Alligator Cracking (Retak Buaya)</option>
                <option value="Rutting">Rutting (Alur Roda)</option>
                <option value="Edge Failure">Edge Failure (Bahu Rusak)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Tingkat Keparahan</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value as any })}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800"
              >
                <option value="Ringan">Ringan (Kedalaman &lt; 3cm)</option>
                <option value="Sedang">Sedang (Kedalaman 3-7cm)</option>
                <option value="Berat">Berat (Kedalaman &gt; 7cm)</option>
                <option value="Kritis">Kritis (Membahayakan Jiwa)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Sumber Pengaduan</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value as any })}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-800"
              >
                <option value="Masyarakat">Masyarakat (Warga)</option>
                <option value="Inspektur UPTD">Inspektur UPTD BMBK</option>
                <option value="AI Sensor / Patroli">AI Sensor / Patroli Mobil</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Deskripsi Kerusakan & Dampak Lalu Lintas *</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Jelaskan kondisi kerusakan jalan, perkiraan ukuran, dan potensi risiko kecelakaan..."
              className="w-full p-2.5 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Nama Pelapor</label>
              <input
                type="text"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                placeholder="Nama lengkap Anda"
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">No. WhatsApp</label>
              <input
                type="text"
                value={formData.reporterPhone}
                onChange={(e) => setFormData({ ...formData, reporterPhone: e.target.value })}
                placeholder="0812-xxxx-xxxx"
                className="w-full p-2 border border-gray-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Perlindungan Data:</strong> Nomor kontak dan nama Anda dilindungi enkripsi & penyamaran sesuai regulasi UU PDP No. 27/2022.
            </span>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg text-xs"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#000000] hover:bg-zinc-800 text-white font-semibold rounded-lg text-xs shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Kirim Laporan Resmi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
