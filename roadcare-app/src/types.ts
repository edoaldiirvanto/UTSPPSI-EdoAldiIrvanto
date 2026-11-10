export interface RoadSegment {
  id: string;
  code: string; // e.g. "RUAS-014"
  name: string;
  uptd: string;
  district: string;
  lengthKm: number;
  widthM: number;
  condition: 'Mantap' | 'Sedang' | 'Rusak Ringan' | 'Rusak Berat' | 'Kritis';
  pciScore: number; // 0-100 (Pavement Condition Index)
  iriScore: number; // International Roughness Index (m/km)
  trafficLhr: number; // Lalu lintas harian rata-rata
  coordinates: [number, number][]; // Polyline
  lastInspected: string;
}

export interface DamageReport {
  id: string;
  ticketNumber: string; // "RC-2026-XXXX"
  segmentId: string;
  segmentName: string;
  staLocation: string; // "STA 14+250"
  district: string;
  uptd: string;
  damageType: 'Pothole' | 'Alligator Cracking' | 'Longitudinal Cracking' | 'Transverse Cracking' | 'Rutting' | 'Edge Failure';
  severity: 'Ringan' | 'Sedang' | 'Berat' | 'Kritis';
  severityScore: number; // 0 - 100
  aiConfidence?: number; // 0.0 - 1.0
  source: 'Masyarakat' | 'AI Sensor / Patroli' | 'Inspektur UPTD';
  reporterName?: string;
  reporterPhone?: string;
  reportedAt: string;
  status: 'Menunggu Verifikasi' | 'Terverifikasi' | 'Dalam Penanganan' | 'Selesai' | 'Ditolak';
  priorityScore: number; // Calculated FR-06
  priorityLevel: 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah';
  estimatedCost: number;
  coordinates: [number, number];
  photoUrl: string;
  description: string;
  workOrderId?: string;
}

export interface WorkOrder {
  id: string;
  spkNumber: string; // "SPK/BMBK-LPG/2026/089"
  title: string;
  segmentName: string;
  contractor: string;
  budgetAllocated: number;
  budgetRealized: number;
  startDate: string;
  endDate: string;
  progressPercent: number;
  status: 'Draft' | 'Approved' | 'Scheduled' | 'In Progress' | 'Completed' | 'Verified' | 'Closed';
  assignedTeam: string;
  supervisor: string;
  items: { description: string; volume: string; unitPrice: number; total: number }[];
}

export interface AssetEquipment {
  id: string;
  code: string;
  name: string;
  category: 'Alat Berat' | 'Kendaraan Patroli' | 'Material Campuran' | 'Sensor AI';
  uptd: string;
  status: 'Siap Operasi' | 'Sedang Digunakan' | 'Dalam Perawatan' | 'Siaga';
  location: string;
  fuelCapacity?: string;
  operator?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  details: string;
}

