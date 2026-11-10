import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { WorkOrder, DamageReport } from '../types';

export const exportSpkPdf = (wo: WorkOrder) => {
  const doc = new jsPDF();

  // Header Dinas
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PEMERINTAH PROVINSI LAMPUNG', 105, 18, { align: 'center' });
  doc.setFontSize(12);
  doc.text('DINAS BINA MARGA DAN BINA KONSTRUKSI', 105, 25, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Jl. Zainal Abidin Pagar Alam No. 1, Rajabasa, Bandar Lampung - 35144', 105, 31, { align: 'center' });
  doc.line(14, 34, 196, 34);

  // SPK Title
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('SURAT PERINTAH KERJA (SPK) PRESERVASI JALAN', 105, 43, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Nomor: ${wo.spkNumber}`, 105, 49, { align: 'center' });

  // Summary Info
  autoTable(doc, {
    startY: 55,
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 2 },
    body: [
      ['Paket Pekerjaan', ':', wo.title],
      ['Ruas Jalan', ':', wo.segmentName],
      ['Penyedia Jasa (Kontraktor)', ':', wo.contractor],
      ['Tim Reaksi Cepat / UPTD', ':', wo.assignedTeam],
      ['Pengawas Lapangan', ':', wo.supervisor],
      ['Masa Pelaksanaan', ':', `${wo.startDate} s/d ${wo.endDate}`],
      ['Nilai Kontrak', ':', `Rp ${wo.budgetAllocated.toLocaleString('id-ID')}`],
      ['Status Pelaksanaan', ':', `${wo.status} (${wo.progressPercent}%)`],
    ],
  });

  // Table BoQ
  const currentY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Rincian Mata Pembayaran & Bill of Quantities (BoQ):', 14, currentY);

  const tableBody = wo.items.map((item: { description: string; volume: string; unitPrice: number; total: number }, idx: number) => [
    (idx + 1).toString(),
    item.description,
    item.volume,
    `Rp ${item.unitPrice.toLocaleString('id-ID')}`,
    `Rp ${item.total.toLocaleString('id-ID')}`,
  ]);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['No', 'Uraian Mata Pembayaran', 'Volume', 'Harga Satuan', 'Jumlah']],
    body: tableBody,
    foot: [['', 'Total Nilai Pekerjaan', '', '', `Rp ${wo.budgetAllocated.toLocaleString('id-ID')}`]],
    headStyles: { fillColor: [21, 27, 42] },
    footStyles: { fillColor: [240, 244, 255], textColor: [13, 28, 46], fontStyle: 'bold' },
    styles: { fontSize: 8.5 },
  });

  // Signature section
  const signY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(9);
  doc.text('Mengetahui / Menyetujui:', 14, signY);
  doc.text('Bandar Lampung, 10 November 2026', 130, signY);

  doc.text('Penyedia Jasa Rekanan', 14, signY + 6);
  doc.text('Pejabat Pembuat Komitmen (PPK)', 130, signY + 6);

  doc.setFont('helvetica', 'bold');
  doc.text(wo.contractor, 14, signY + 28);
  doc.text(wo.supervisor, 130, signY + 28);

  doc.save(`${wo.spkNumber.replace(/\//g, '_')}.pdf`);
};

export const exportDamageReportsPdf = (reports: DamageReport[]) => {
  const doc = new jsPDF('landscape');

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('REKAPITULASI LAPORAN KERUSAKAN JALAN PROVINSI LAMPUNG', 148, 16, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistem Monitoring & Preservasi Jalan RoadCare (SIM-PJ) - Tahun Anggaran 2026', 148, 22, { align: 'center' });

  const rows = reports.map((rep: DamageReport) => [
    rep.ticketNumber,
    rep.segmentName,
    rep.staLocation,
    rep.damageType,
    rep.severity,
    rep.priorityScore.toFixed(1),
    rep.source,
    rep.status,
    `Rp ${(rep.estimatedCost / 1000000).toFixed(1)} Jt`,
  ]);

  autoTable(doc, {
    startY: 28,
    head: [['No. Tiket', 'Ruas Jalan', 'STA', 'Tipe Kerusakan', 'Tingkat', 'Prioritas', 'Sumber', 'Status', 'Est. Biaya']],
    body: rows,
    headStyles: { fillColor: [21, 27, 42] },
    styles: { fontSize: 8 },
  });

  doc.save(`Rekap_Kerusakan_Jalan_Lampung_${Date.now()}.pdf`);
};
