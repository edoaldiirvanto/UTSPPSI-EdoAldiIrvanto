import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  Cpu, 
  CheckCircle2, 
  Crosshair,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react';
import { DamageReport } from '../types';
import { validateImageUpload } from '../utils/security';

interface AiDetectionViewProps {
  onAddDetectedReport: (report: Partial<DamageReport>) => void;
}

export const AiDetectionView: React.FC<AiDetectionViewProps> = ({ onAddDetectedReport }) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80'
  );
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [detectionResult, setDetectionResult] = useState<any>({
    damageType: 'Pothole (Lubang Menganga)',
    confidence: 0.942,
    severity: 'Kritis',
    dimensions: 'Diameter 1.2 m, Kedalaman ~12 cm',
    estimatedCost: 18500000,
    model: 'YOLOv8x-RoadDamage-Lampung-v2.4',
    boxes: [
      { x: '28%', y: '35%', w: '44%', h: '40%', label: 'Pothole (0.94)' }
    ]
  });

  const sampleImages = [
    {
      name: 'Sampel 1: Lubang Parah (Natar)',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      type: 'Pothole',
      conf: 0.94,
      sev: 'Kritis'
    },
    {
      name: 'Sampel 2: Retak Buaya (Alligator Cracking)',
      url: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=800&q=80',
      type: 'Alligator Cracking',
      conf: 0.89,
      sev: 'Berat'
    },
    {
      name: 'Sampel 3: Deformasi Alur (Rutting)',
      url: 'https://images.unsplash.com/photo-1578965870233-a26b21649033?auto=format&fit=crop&w=800&q=80',
      type: 'Rutting',
      conf: 0.82,
      sev: 'Sedang'
    }
  ];

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const handleSelectSample = (sample: any) => {
    setUploadError(null);
    setSelectedImage(sample.url);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDetectionResult({
        damageType: sample.type,
        confidence: sample.conf,
        severity: sample.sev,
        dimensions: sample.type === 'Pothole' ? 'Diameter 1.1m' : 'Panjang area ~25m',
        estimatedCost: sample.type === 'Pothole' ? 18500000 : 45000000,
        model: 'YOLOv8x-RoadDamage-Lampung-v2.4',
        boxes: [
          { x: '25%', y: '30%', w: '50%', h: '45%', label: `${sample.type} (${sample.conf})` }
        ]
      });
    }, 800);
  };

  // Secure File Upload with Sanitization & Validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Perform security validation
      const validation = validateImageUpload(file);
      if (!validation.isValid) {
        setUploadError(validation.errorMessage || 'File ditolak oleh filter keamanan.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setSelectedImage(uploadEvent.target.result as string);
          handleSimulateScan();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-xl border border-[#E6EEFF] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              AI ROAD DAMAGE INFERENCE ENGINE
            </span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Safe File Upload & Anti-RCE Enabled
            </span>
          </div>
          <h2 className="text-base font-bold text-[#0D1C2E]">Deteksi Otomatis Kerusakan Jalan dengan YOLOv8</h2>
          <p className="text-xs text-[#545F73] mt-0.5">
            Menganalisis citra jalan secara langsung, menghitung bounding box, confidence score, dan estimasi biaya penanganan awal.
          </p>
        </div>

        {/* Upload Custom Image Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-[#000000] hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-all">
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Unggah Citra / Foto Lapangan</span>
            <input 
              type="file" 
              accept="image/jpeg,image/png,image/webp" 
              className="hidden" 
              onChange={handleFileUpload} 
            />
          </label>
        </div>
      </div>

      {/* Security alert if file upload rejected */}
      {uploadError && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2">
          <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
          <span><strong>Keamanan Unggah File:</strong> {uploadError}</span>
        </div>
      )}

      {/* Main Detection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Image Canvas & Bounding Box */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-rose-600" />
              <span className="font-bold text-xs text-[#0D1C2E]">Visualisasi Bounding Box & Segmentasi AI</span>
            </div>
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-sm transition-all disabled:opacity-50"
            >
              {isScanning ? 'Memproses Citra...' : 'Jalankan Ulang Inference'}
            </button>
          </div>

          {/* Canvas container with relative overlay */}
          <div className="relative rounded-lg overflow-hidden bg-slate-900 aspect-video flex items-center justify-center border border-slate-700">
            <img 
              src={selectedImage} 
              alt="Road Damage Source" 
              className={`w-full h-full object-cover transition-opacity duration-300 ${isScanning ? 'opacity-40' : 'opacity-100'}`}
            />

            {/* Scanning radar line animation */}
            {isScanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs">
                <div className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_#34d399] animate-pulse"></div>
                <div className="mt-4 px-3 py-1.5 rounded-full bg-black/80 text-white font-mono text-xs flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span>Menganalisis matriks piksel tensor...</span>
                </div>
              </div>
            )}

            {/* Bounding Box Overlays */}
            {!isScanning && detectionResult?.boxes?.map((box: any, i: number) => (
              <div
                key={i}
                className="absolute border-2 border-rose-500 bg-rose-500/20 rounded pointer-events-none transition-all duration-300"
                style={{
                  left: box.x,
                  top: box.y,
                  width: box.w,
                  height: box.h,
                }}
              >
                <span className="absolute -top-6 left-0 bg-rose-600 text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded shadow">
                  {box.label}
                </span>
              </div>
            ))}
          </div>

          {/* Preset image selector */}
          <div className="mt-4">
            <span className="text-xs font-semibold text-[#545F73] block mb-2">Gunakan Sampel Uji Coba:</span>
            <div className="grid grid-cols-3 gap-2">
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(s)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                    selectedImage === s.url ? 'border-blue-500 bg-blue-50/50 font-semibold text-blue-900' : 'border-gray-200 hover:border-gray-300 bg-gray-50'
                  }`}
                >
                  <div className="truncate font-medium">{s.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.type} • Conf {(s.conf * 100).toFixed(0)}%</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: AI Inference Metrics & Auto-Dispatch */}
        <div className="bg-white rounded-xl border border-[#E6EEFF] shadow-sm p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D1C2E] pb-3 border-b border-gray-100">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Hasil Inferensi & Kuantifikasi</span>
            </div>

            <div className="space-y-3.5 my-4 text-xs">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-semibold">Jenis Kerusakan Terdeteksi</span>
                <div className="font-bold text-sm text-[#0D1C2E] mt-0.5">{detectionResult.damageType}</div>
              </div>

              <div>
                <span className="text-gray-400 text-[10px] uppercase font-semibold">Tingkat Keyakinan Model</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${(detectionResult.confidence * 100)}%` }}
                    ></div>
                  </div>
                  <span className="font-mono font-bold text-emerald-600">
                    {(detectionResult.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Klasifikasi Severity</span>
                <span className="font-bold text-rose-600">{detectionResult.severity}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Estimasi Dimensi</span>
                <span className="font-mono text-gray-800">{detectionResult.dimensions}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500">Estimasi Kebutuhan Biaya</span>
                <span className="font-bold text-[#0D1C2E]">
                  Rp {detectionResult.estimatedCost.toLocaleString('id-ID')}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-gray-500">Arsitektur Model</span>
                <span className="font-mono text-[10px] text-gray-600">{detectionResult.model}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-[11px] text-blue-900">
              <strong>Catatan Validasi Sistem:</strong> Sesuai PRD Bab 9, hasil AI merupakan rekomendasi keputusan (Decision Support System) yang harus divalidasi inspektur lapangan sebelum penagihan termin kontrak.
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                onAddDetectedReport({
                  damageType: detectionResult.damageType.split(' ')[0] as any,
                  severity: detectionResult.severity,
                  severityScore: 88,
                  aiConfidence: detectionResult.confidence,
                  estimatedCost: detectionResult.estimatedCost,
                  source: 'AI Sensor / Patroli',
                  description: `Hasil inferensi otomatis dari citra dashcam patroli dengan confidence ${(detectionResult.confidence * 100).toFixed(1)}%.`,
                  photoUrl: selectedImage,
                });
              }}
              className="w-full py-2.5 bg-[#000000] hover:bg-zinc-800 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Daftarkan sebagai Tiket Laporan Resmi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
