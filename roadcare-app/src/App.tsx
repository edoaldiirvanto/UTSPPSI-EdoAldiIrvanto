import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { Footer } from './components/Footer';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { GisMap } from './components/GisMap';
import { DamageReportsView } from './components/DamageReportsView';
import { InspectionsView } from './components/InspectionsView';
import { RoadAssessmentView } from './components/RoadAssessmentView';
import { AiDetectionView } from './components/AiDetectionView';
import { AiAnalyticsView } from './components/AiAnalyticsView';
import { WorkOrdersView } from './components/WorkOrdersView';
import { WorkOrderDetailModal } from './components/WorkOrderDetailModal';
import { DamageReportModal } from './components/DamageReportModal';
import { NewReportModal } from './components/NewReportModal';
import { BudgetView } from './components/BudgetView';
import { AssetsView } from './components/AssetsView';
import { SettingsView } from './components/SettingsView';

import { 
  INITIAL_ROAD_SEGMENTS, 
  INITIAL_DAMAGE_REPORTS, 
  INITIAL_WORK_ORDERS, 
  INITIAL_EQUIPMENT, 
  INITIAL_AUDIT_LOGS 
} from './mockData';
import { RoadSegment, DamageReport, WorkOrder, AssetEquipment, AuditLog } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedUptd, setSelectedUptd] = useState<string>('Semua UPTD');

  // State entities
  const [segments, setSegments] = useState<RoadSegment[]>(INITIAL_ROAD_SEGMENTS);
  const [reports, setReports] = useState<DamageReport[]>(INITIAL_DAMAGE_REPORTS);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(INITIAL_WORK_ORDERS);
  const [equipment, setEquipment] = useState<AssetEquipment[]>(INITIAL_EQUIPMENT);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Modals state
  const [selectedReport, setSelectedReport] = useState<DamageReport | null>(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Actions
  const handleUpdateReportStatus = (reportId: string, newStatus: DamageReport['status']) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );

    // Add audit log
    const rep = reports.find((r) => r.id === reportId);
    if (rep) {
      const newLog: AuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleDateString('id-ID') + ' ' + new Date().toLocaleTimeString('id-ID') + ' WIB',
        actor: 'Ir. Hendra Gunawan',
        role: 'Kabid Bina Marga',
        action: `Perubahan Status Laporan ${rep.ticketNumber}`,
        details: `Status tiket diubah menjadi "${newStatus}"`,
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
  };

  const handleUpdateWorkOrderStatus = (woId: string, newStatus: WorkOrder['status']) => {
    setWorkOrders((prev) =>
      prev.map((w) => {
        if (w.id === woId) {
          const progress = newStatus === 'Completed' || newStatus === 'Verified' ? 100 : w.progressPercent;
          const realized = newStatus === 'Completed' || newStatus === 'Verified' ? w.budgetAllocated : w.budgetRealized;
          return { ...w, status: newStatus, progressPercent: progress, budgetRealized: realized };
        }
        return w;
      })
    );

    const wo = workOrders.find((w) => w.id === woId);
    if (wo) {
      const newLog: AuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleDateString('id-ID') + ' ' + new Date().toLocaleTimeString('id-ID') + ' WIB',
        actor: 'Ir. Hendra Gunawan',
        role: 'Kabid Bina Marga',
        action: `Pembaruan SPK ${wo.spkNumber}`,
        details: `Status SPK diperbarui menjadi "${newStatus}"`,
      };
      setAuditLogs((prev) => [newLog, ...prev]);
    }
  };

  const handleAddNewReport = (newRep: Partial<DamageReport>) => {
    const createdReport: DamageReport = {
      id: `rep-${Date.now()}`,
      ticketNumber: newRep.ticketNumber || `RC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      segmentId: 'seg-1',
      segmentName: newRep.segmentName || 'Jl. Raya Lintas Sumatra',
      staLocation: newRep.staLocation || 'STA 00+000',
      district: newRep.district || 'Lampung Selatan',
      uptd: newRep.uptd || 'UPTD II Lampung Selatan',
      damageType: newRep.damageType || 'Pothole',
      severity: newRep.severity || 'Sedang',
      severityScore: newRep.severityScore || 60,
      aiConfidence: newRep.aiConfidence,
      source: newRep.source || 'Masyarakat',
      reporterName: newRep.reporterName,
      reporterPhone: newRep.reporterPhone,
      reportedAt: newRep.reportedAt || '10/11/2026 ' + new Date().toLocaleTimeString('id-ID'),
      status: 'Menunggu Verifikasi',
      priorityScore: newRep.priorityScore || 65,
      priorityLevel: newRep.priorityLevel || 'Sedang',
      estimatedCost: newRep.estimatedCost || 20000000,
      coordinates: newRep.coordinates || [-5.3200, 105.2000],
      photoUrl: newRep.photoUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
      description: newRep.description || 'Laporan kerusakan jalan baru masuk dari sistem.',
    };

    setReports((prev) => [createdReport, ...prev]);

    // Audit log
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('id-ID') + ' ' + new Date().toLocaleTimeString('id-ID') + ' WIB',
      actor: createdReport.source === 'Masyarakat' ? (createdReport.reporterName || 'Warga') : 'Sistem AI / Petugas',
      role: createdReport.source,
      action: 'Pengajuan Laporan Kerusakan',
      details: `Tiket baru ${createdReport.ticketNumber} didaftarkan pada ${createdReport.segmentName}`,
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    alert(`Laporan ${createdReport.ticketNumber} berhasil didaftarkan ke sistem!`);
  };

  // Filter based on selected UPTD
  const filteredSegments = selectedUptd === 'Semua UPTD' 
    ? segments 
    : segments.filter(s => s.uptd === selectedUptd);

  const filteredReports = selectedUptd === 'Semua UPTD'
    ? reports
    : reports.filter(r => r.uptd === selectedUptd);

  return (
    <div className="flex h-screen bg-[#F8F9FF] overflow-hidden text-[#0D1C2E]">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        reportCount={reports.filter(r => r.status === 'Menunggu Verifikasi').length}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <Topbar 
          onOpenReportModal={() => setIsReportModalOpen(true)}
          selectedUptd={selectedUptd}
          setSelectedUptd={setSelectedUptd}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              segments={filteredSegments}
              reports={filteredReports}
              workOrders={workOrders}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectReport={(r) => setSelectedReport(r)}
            />
          )}

          {activeTab === 'gis-map' && (
            <GisMap
              segments={filteredSegments}
              reports={filteredReports}
              onSelectReport={(r) => setSelectedReport(r)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === 'damage-reports' && (
            <DamageReportsView
              reports={filteredReports}
              onSelectReport={(r) => setSelectedReport(r)}
              onOpenReportModal={() => setIsReportModalOpen(true)}
              onUpdateStatus={handleUpdateReportStatus}
            />
          )}

          {activeTab === 'inspections' && (
            <InspectionsView
              segments={filteredSegments}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />
          )}

          {activeTab === 'pci-assessment' && (
            <RoadAssessmentView
              segments={filteredSegments}
            />
          )}

          {activeTab === 'ai-detection' && (
            <AiDetectionView
              onAddDetectedReport={handleAddNewReport}
            />
          )}

          {activeTab === 'ai-analytics' && (
            <AiAnalyticsView
              reports={filteredReports}
              segments={filteredSegments}
            />
          )}

          {activeTab === 'work-orders' && (
            <WorkOrdersView
              workOrders={workOrders}
              onSelectWorkOrder={(wo) => setSelectedWorkOrder(wo)}
              onUpdateStatus={handleUpdateWorkOrderStatus}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetView
              workOrders={workOrders}
            />
          )}

          {activeTab === 'assets' && (
            <AssetsView
              equipment={equipment}
              onAddEquipment={(item) => setEquipment(prev => [item, ...prev])}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              auditLogs={auditLogs}
            />
          )}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals */}
      {selectedReport && (
        <DamageReportModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onUpdateStatus={handleUpdateReportStatus}
        />
      )}

      {selectedWorkOrder && (
        <WorkOrderDetailModal
          workOrder={selectedWorkOrder}
          onClose={() => setSelectedWorkOrder(null)}
          onUpdateStatus={handleUpdateWorkOrderStatus}
        />
      )}

      {isReportModalOpen && (
        <NewReportModal
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={handleAddNewReport}
        />
      )}
    </div>
  );
};

export default App;
