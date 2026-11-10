---
description: Skill desain UI/UX untuk membangun dan mengembangkan
  dashboard RoadCare / SIM-PJ Preservasi Jalan Provinsi Lampung dengan
  gaya enterprise government dashboard, GIS, AI road monitoring, dan
  operasional preservasi jalan.
name: roadcare-design-system
---

# RoadCare Design System & UI/UX Skill

## 1. Tujuan Skill

Gunakan skill ini ketika merancang, memperbaiki, atau mengembangkan
antarmuka **RoadCare / SIM-PJ Provinsi Lampung**. Skill ini mengubah
pola visual dan struktur yang terdapat pada kode HTML/Tailwind sumber
menjadi pedoman desain yang konsisten untuk seluruh halaman aplikasi.

RoadCare adalah dashboard pengelolaan preservasi jalan yang
menggabungkan: - Pemantauan jaringan jalan berbasis GIS. - Pelaporan dan
verifikasi kerusakan jalan. - Deteksi kerusakan menggunakan AI/computer
vision. - Penilaian kondisi jalan. - Penjadwalan inspeksi dan
pekerjaan. - Pengelolaan Surat Perintah Kerja (SPK). - Anggaran dan
realisasi. - Manajemen aset, armada, dan logistik. - Analitik,
rekomendasi, serta audit trail.

**Prinsip utama:** desain harus terasa seperti sistem operasional
pemerintah daerah yang serius, padat informasi tetapi tetap terstruktur,
bukan landing page, aplikasi sosial, atau dashboard SaaS generik.

## 2. Identitas Produk

  -----------------------------------------------------------------------
  Elemen                              Ketentuan
  ----------------------------------- -----------------------------------
  Nama aplikasi                       RoadCare

  Nama sistem pendukung               SIM-PJ Prov. Lampung

  Tagline                             Smart Road Infrastructure

  Fokus                               Preservasi dan pemantauan
                                      infrastruktur jalan

  Wilayah contoh                      Provinsi Lampung

  Mitra/instansi yang ditampilkan     Dinas BMBK Prov. Lampung dan
                                      Universitas Teknokrat Indonesia

  Bahasa antarmuka                    Bahasa Indonesia

  Font utama                          Inter

  Ikon                                Material Symbols Outlined

  CSS utility                         Tailwind CSS
  -----------------------------------------------------------------------

Gunakan logo RoadCare dan logo instansi dari aset yang disediakan. Jika
aset logo belum tersedia, gunakan placeholder yang proporsional; jangan
menggambar ulang atau mengarang logo resmi.

## 3. Design Language

### 3.1 Karakter visual

-   Enterprise government dashboard.
-   Modern, teknis, informatif, dan berorientasi data.
-   Dominan permukaan putih dan biru sangat muda.
-   Sidebar navy gelap sebagai jangkar visual.
-   Kontras teks kuat dan hierarki informasi jelas.
-   Card sederhana dengan radius sedang dan shadow tipis.
-   Gunakan warna status secara semantik, bukan dekoratif.
-   Hindari gradient mencolok, ilustrasi kartun, efek glassmorphism
    berlebihan, dan animasi yang tidak memiliki makna operasional.

### 3.2 Palet warna dari kode sumber

Gunakan token berikut sebagai acuan utama. Jangan mengganti palet dengan
warna lain tanpa alasan produk yang kuat.

  -----------------------------------------------------------------------------
  Token                         Hex                     Pemakaian
  ----------------------------- ----------------------- -----------------------
  `primary`                     `#000000`               Tombol utama dan elemen
                                                        aksi tertentu

  `primary-container`           `#151B2A`               Sidebar gelap, peta
                                                        gelap, area kontras

  `on-primary-container`        `#7D8496`               Teks sekunder pada
                                                        sidebar

  `secondary`                   `#545F73`               Teks sekunder, elemen
                                                        pendukung

  `surface`                     `#F8F9FF`               Latar halaman

  `background`                  `#F8F9FF`               Latar aplikasi

  `surface-container-lowest`    `#FFFFFF`               Card dan panel utama

  `surface-container-low`       `#EFF4FF`               Panel filter, latar
                                                        tabel, area sekunder

  `surface-container`           `#E6EEFF`               Permukaan komponen dan
                                                        pembatas

  `surface-container-high`      `#DCE9FF`               Track progress dan
                                                        elemen terangkat

  `surface-container-highest`   `#D5E3FC`               Permukaan kontras lebih
                                                        tinggi

  `on-surface`                  `#0D1C2E`               Teks utama

  `on-surface-variant`          `#45474C`               Teks sekunder yang
                                                        lebih kuat

  `outline`                     `#76777D`               Outline dan ikon netral

  `outline-variant`             `#C6C6CC`               Border halus

  `error`                       `#BA1A1A`               Bahaya, kritis,
                                                        kegagalan

  `error-container`             `#FFDAD6`               Latar badge/error

  `on-error-container`          `#93000A`               Teks pada latar error

  `secondary-container`         `#D5E0F8`               Status sekunder dan
                                                        penanda tertentu

  `tertiary-container`          `#00174B`               Aksen navy tambahan
  -----------------------------------------------------------------------------

**Catatan implementasi:** kode sumber memakai `primary` hitam
(`#000000`) dan `primary-container` navy (`#151B2A`). Pertahankan
perbedaan ini. Jangan otomatis mengubah seluruh tombol menjadi biru
terang.

### 3.3 Aturan warna status

Gunakan pemetaan yang mudah dikenali dan konsisten: - **Baik / Mantap:**
gunakan nuansa status positif yang tenang. - **Sedang / Dalam proses:**
gunakan warna netral atau biru keabu-abuan. - **Rusak ringan / Perlu
perhatian:** gunakan amber/oranye. - **Rusak berat / Kritis:** gunakan
`error` (`#BA1A1A`) dan `error-container`. - **Selesai /
Terverifikasi:** gunakan warna positif yang tidak mendominasi. -
**Menunggu verifikasi:** gunakan warna netral atau amber.

Jangan memakai merah untuk status biasa. Warna merah hanya untuk keadaan
yang benar-benar membutuhkan perhatian.

## 4. Tipografi

Font utama adalah **Inter**, dengan skala yang mengikuti konfigurasi
Tailwind pada kode sumber.

  Token                   Ukuran   Line height   Weight Penggunaan
  --------------------- -------- ------------- -------- ---------------------------------
  `display-lg`              32px          40px      700 Judul utama halaman tertentu
  `display-lg-mobile`       26px          34px      700 Judul utama mobile
  `headline-lg`             24px          32px      600 Heading bagian utama
  `headline-md`             20px          28px      600 Heading panel
  `headline-sm`             16px          24px      600 Heading card dan subbagian
  `metric-stat`             28px          32px      700 Angka KPI
  `body-lg`                 16px          24px      400 Teks isi penting
  `body-md`                 14px          20px      400 Teks isi standar
  `body-sm`                 12px          18px      400 Metadata dan deskripsi kecil
  `label-lg`                14px          20px      500 Label penting
  `label-md`                12px          16px      500 Label kontrol dan navigasi
  `label-sm`                11px          14px      600 Caption, metadata, status kecil

Pedoman: - Gunakan heading secara bertingkat; jangan melompati hierarki
tanpa alasan. - Angka KPI harus lebih menonjol daripada labelnya. -
Metadata tabel boleh kecil, tetapi harus tetap terbaca. - Gunakan
`font-mono` untuk kode ruas, nomor tiket, koordinat, STA, ID SPK, dan
data teknis yang perlu disejajarkan. - Hindari terlalu banyak variasi
font weight dalam satu card.

## 5. Layout Aplikasi

### 5.1 Struktur desktop

Gunakan shell aplikasi yang konsisten: 1. Sidebar tetap di sisi kiri. 2.
Topbar tetap di bagian atas area konten. 3. Konten utama berada di
sebelah kanan sidebar. 4. Footer berada di bagian bawah aplikasi.

Spesifikasi acuan: - Sidebar: lebar sekitar `250px`. - Topbar: tinggi
sekitar `64px`. - Sidebar: latar `primary-container` (`#151B2A`). -
Topbar: putih dengan transparansi ringan dan blur halus. - Area konten:
latar `surface` (`#F8F9FF`). - Card: putih, radius `xl` (sekitar 12px),
shadow tipis. - Gunakan padding dan gutter konsisten, umumnya
16px--24px.

### 5.2 Sidebar

Sidebar memuat: - Logo RoadCare dan nama aplikasi. - Tagline singkat. -
Identitas Dinas BMBK Prov. Lampung. - Identitas Universitas Teknokrat
Indonesia sebagai Research & Tech Partner. - Navigasi utama. - Indikator
status server dan data hub pada area bawah.

Navigasi yang tercermin dalam kode sumber: 1. Beranda / Dashboard. 2.
Pemantauan Jalan. 3. Laporan Kerusakan. 4. Jadwal & SPK. 5. Anggaran &
Realisasi. 6. Analitik AI. 7. Manajemen Aset. 8. Pengaturan Sistem.

Aturan navigasi: - Ikon berada di kiri label. - Item aktif menggunakan
latar terang transparan dan teks kontras. - Item nonaktif menggunakan
teks sekunder. - Hover state harus jelas tetapi tidak mencolok. - Jangan
mengubah urutan navigasi antarhalaman. - Gunakan ikon Material Symbols
Outlined yang relevan.

### 5.3 Topbar

Topbar dapat berisi: - Breadcrumb wilayah/modul. - Judul halaman. -
Label periode atau cakupan data. - Pencarian global. - Notifikasi dengan
indikator jumlah. - Tombol aksi cepat sesuai konteks. - Profil pengguna
dan peran.

Jangan memaksakan semua kontrol pada layar kecil. Pada mobile,
sembunyikan metadata sekunder dan pindahkan navigasi ke drawer/menu yang
sesuai.

### 5.4 Footer

Footer menampilkan identitas sistem, status sinkronisasi, dan copyright
bila diperlukan.

Gunakan teks copyright berikut jika diminta dalam desain:
`Copyright©2026 by Edo Aldi Irvanto dan Dr. Erliyan Redy Susanto, M.Kom`

Jangan mengubah ejaan nama atau tahun tanpa instruksi.

## 6. Spacing, Radius, dan Elevation

### 6.1 Spacing

Ikuti skala dasar 4px: - `space-xs`: 4px. - `space-sm`: 8px. -
`space-md`: 12px. - `space-lg`: 16px. - `space-xl`: 24px. - `gutter`:
16px. - `gutter-lg`: 24px. - Margin halaman dapat menggunakan 16px,
24px, atau 32px sesuai breakpoint.

Gunakan jarak yang konsisten antar-card, antar-section, dan di dalam
komponen.

### 6.2 Radius

-   Default: 4px.
-   `lg`: 8px.
-   `xl`: 12px.
-   `full`: 9999px untuk avatar, indikator bulat, dan pill.

Gunakan radius 8--12px untuk sebagian besar card dan kontrol. Jangan
mencampur banyak radius dalam satu halaman.

### 6.3 Shadow dan border

-   Shadow tipis untuk memisahkan card dari background.
-   Border `outline-variant` atau warna permukaan untuk pembatas halus.
-   Hindari shadow gelap dan efek 3D.
-   Jangan memberi shadow tebal pada setiap elemen.

## 7. Komponen UI Standar

### 7.1 KPI Cards

KPI card biasanya berisi: - Label metrik. - Angka utama. - Perbandingan
terhadap periode sebelumnya bila tersedia. - Progress bar atau rincian
pendukung. - Badge status bila diperlukan.

Gunakan angka besar (sekitar 28px), label ringkas, dan informasi
pendukung yang tidak berlebihan. Jangan menampilkan lebih dari satu
pesan utama per card.

Contoh metrik: - Indeks Kemantapan Jalan (IKJ). - Total laporan
kerusakan aktif. - Jumlah SPK dan tim beroperasi. - Realisasi anggaran
preservasi.

### 7.2 Filter strip

Gunakan filter dalam panel putih atau permukaan sekunder: - Wilayah
kerja / UPTD. - Status kemantapan. - Tahun anggaran dan periode. -
Metode deteksi. - Filter tambahan sesuai modul.

Label filter harus berada di atas kontrol. Pilihan default harus jelas.
Filter yang diterapkan perlu tercermin pada data yang ditampilkan.

### 7.3 Tabel data

Tabel merupakan komponen penting untuk operasional pemerintah: - Header
menggunakan latar `surface-container-low`. - Label kolom ringkas dan
jelas. - Baris memiliki pemisah halus. - Hover row sangat ringan. -
Informasi utama menggunakan teks lebih tegas. - Metadata seperti waktu,
STA, koordinat, sumber, dan unit kerja menggunakan teks sekunder. -
Kolom angka/biaya rata kanan. - ID teknis dapat memakai monospace. -
Aksi menggunakan ikon dengan tooltip. - Tabel lebar harus berada dalam
container `overflow-x-auto`.

Sediakan pencarian, filter, pagination, empty state, loading state, dan
state error bila konteksnya membutuhkan.

### 7.4 Badge status

Badge harus: - Ringkas dan mudah dipindai. - Menggunakan warna status
semantik. - Memiliki padding kecil dan radius pill atau rounded. - Tidak
menggantikan label teks. - Tidak menggunakan animasi berkedip kecuali
untuk peringatan kritis yang memang perlu perhatian segera.

### 7.5 Tombol

Gunakan tiga tingkat: - Primary: aksi utama halaman. - Secondary: aksi
pendukung. - Tertiary/ghost: aksi kecil atau ikon.

Label tombol harus berupa kata kerja yang jelas, misalnya: - Buat
Laporan. - Verifikasi. - Terbitkan SPK. - Sinkronisasi Peta GIS. -
Export Rekap. - Simpan Penilaian.

Jangan membuat tombol hanya sebagai dekorasi. Setiap tombol yang
ditampilkan sebagai interaktif harus mempunyai aksi atau state yang
jelas.

### 7.6 Form

-   Label selalu terlihat.
-   Placeholder hanya sebagai contoh, bukan pengganti label.
-   Kelompokkan field berdasarkan konteks.
-   Tampilkan validasi dekat field terkait.
-   Gunakan helper text untuk instruksi penting.
-   Field wajib diberi penanda.
-   Upload file harus menampilkan nama file/preview bila memungkinkan.
-   Form panjang dibagi menjadi beberapa section.

### 7.7 Chart dan visualisasi

-   Gunakan chart untuk menjawab pertanyaan operasional, bukan dekorasi.
-   Judul chart harus menyebut metrik dan cakupan.
-   Sertakan legend dan label satuan.
-   Gunakan warna kategori yang konsisten.
-   Jangan menggunakan terlalu banyak seri dalam satu chart.
-   Sertakan filter periode/wilayah bila relevan.
-   Pastikan informasi penting tetap tersedia dalam bentuk teks atau
    tabel.

### 7.8 Peta GIS

Peta adalah salah satu area visual utama RoadCare: - Gunakan canvas peta
yang cukup luas. - Berikan layer control untuk ruas jalan, sensor AI,
armada, dan heatmap jika relevan. - Gunakan marker dan warna kondisi
yang konsisten. - Tampilkan legenda. - Marker terpilih dapat membuka
tooltip atau panel detail. - Sertakan informasi lokasi, nama ruas, STA,
kondisi, waktu deteksi, dan status penanganan. - Jangan menggambar peta
abstrak yang tidak membantu orientasi geografis. - Jika data peta masih
simulasi, tandai sebagai data demonstrasi.

### 7.9 Alert dan early warning

Panel peringatan berisi: - Tingkat urgensi. - Lokasi/ruas jalan. - Jenis
dan ukuran kerusakan. - Sumber dan waktu deteksi. - Dampak atau
risiko. - Estimasi biaya jika tersedia. - Aksi tindak lanjut.

Peringatan kritis harus lebih menonjol daripada notifikasi rutin. Jangan
membuat semua alert berwarna merah.

### 7.10 Timeline dan audit trail

Gunakan timeline untuk: - Riwayat inspeksi. - Perubahan status SPK. -
Progres pekerjaan. - Aktivitas pengguna. - Riwayat verifikasi.

Setiap item sebaiknya mencantumkan waktu, aktor, tindakan, dan ringkasan
perubahan. Jangan mengarang status audit atau klaim kepatuhan yang tidak
didukung data.

## 8. Modul dan Pola Halaman

Gunakan pola berikut saat membangun halaman. Shell, sidebar, topbar,
typography, warna, dan footer harus tetap sama.

### 8.1 Beranda / Executive Dashboard

Prioritas: - Ikhtisar kondisi jalan. - KPI kemantapan. - Laporan
aktif. - SPK dan progres. - Anggaran dan realisasi. - Peta spasial. -
Peringatan kritis AI. - Kesiapan logistik dan armada. - Tabel laporan
terbaru.

Komposisi yang disarankan: 1. Banner operasional dan cakupan wilayah. 2.
Filter multi-dimensi. 3. Grid KPI. 4. Area utama peta dan panel alert.
5. Distribusi jenis kerusakan. 6. Tabel laporan dan progres penanganan.

### 8.2 Admin Dashboard

Prioritas: - Distribusi laporan dan siklus penanganan. - Kinerja
verifikator dan armada. - Daftar laporan masyarakat terbaru. - Audit
trail dan log sistem.

Gunakan layout administratif yang berorientasi pada pekerjaan harian.

### 8.3 Pemantauan Jalan

Prioritas: - Peta jaringan jalan. - Status kondisi per ruas. - Layer
kerusakan. - Titik inspeksi dan deteksi. - Armada atau tim aktif. -
Panel detail ruas.

### 8.4 Laporan Kerusakan

Prioritas: - Daftar laporan. - Sumber laporan. - Lokasi dan bukti
visual. - Klasifikasi kerusakan. - Skor/confidence AI bila tersedia. -
Status verifikasi. - Status tindak lanjut/SPK.

### 8.5 Form Laporan Masyarakat

Prioritas: - Lokasi dan nama jalan. - Jenis kerusakan. - Deskripsi. -
Foto bukti. - Identitas pelapor sesuai kebutuhan. - Konfirmasi
pengiriman dan nomor tiket.

Form masyarakat harus lebih sederhana daripada form internal petugas.

### 8.6 AI Road Damage Detection

Prioritas: - Upload foto/video. - Preview citra. - Parameter model. -
Hasil deteksi dan bounding box. - Klasifikasi kerusakan. - Confidence
score. - Estimasi kuantifikasi. - Riwayat pemindaian dan verifikasi
petugas.

Jenis kerusakan dapat mencakup pothole, alligator cracking, longitudinal
cracking, transverse cracking, rutting, dan edge failure sesuai
data/model yang tersedia.

Hasil AI harus diberi konteks bahwa deteksi merupakan dukungan keputusan
dan dapat memerlukan verifikasi lapangan. Jangan mengklaim akurasi model
tanpa sumber data yang sah.

### 8.7 Road Condition Assessment

Prioritas: - Identitas inspektur dan waktu survei. - Data ruas dan
lokasi. - Parameter teknis permukaan. - Catatan teknis. - Foto
geotagging bila tersedia. - Kalkulasi indeks kondisi. - Riwayat
penilaian.

### 8.8 Jadwal & SPK

Prioritas: - Jadwal inspeksi. - Penugasan petugas. - Paket pekerjaan. -
Kontrak dan pelaksana. - Prioritas penanganan. - Status dan progres.

### 8.9 Work Order Detail

Prioritas: - Ringkasan SPK dan kontrak. - Progres fisik. - Rincian
BoQ/divisi pekerjaan. - Foto sebelum, selama, dan sesudah. - Timeline
pengawasan. - Perubahan status dan audit trail. - Verifikasi mutu dan
catatan pengawas. - Sumber daya dan alat berat.

### 8.10 Anggaran & Realisasi

Prioritas: - Pagu anggaran. - Realisasi. - Sisa anggaran. - Termin
pembayaran. - Paket pekerjaan. - Perbandingan rencana dan realisasi. -
Filter tahun anggaran dan unit kerja.

### 8.11 Analitik AI

Prioritas: - Tren kerusakan. - Distribusi kerusakan. - Skor prioritas. -
Rekomendasi penanganan. - Perbandingan antarwilayah dan periode. -
Penjelasan sumber data dan batasan analisis.

### 8.12 Manajemen Aset

Prioritas: - Inventaris aset jalan. - Armada dan alat berat. -
Material/logistik. - Lokasi penyimpanan. - Ketersediaan dan status
operasional.

### 8.13 Pengaturan Sistem

Prioritas: - Pengguna dan organisasi. - Unit kerja. - Role dan
permission. - Konfigurasi sistem. - Integrasi dan status koneksi. -
Notifikasi. - Audit log.

## 9. Data, Bahasa, dan Konteks Lokal

-   Gunakan Bahasa Indonesia untuk label, navigasi, tombol, dan pesan.
-   Gunakan format tanggal `DD/MM/YYYY`.
-   Gunakan format waktu 24 jam dan zona waktu WIB bila sesuai.
-   Gunakan format Rupiah, misalnya `Rp 64.500.000`.
-   Gunakan satuan panjang `km`, `m`, `cm`, dan luas `m²`.
-   Gunakan istilah teknis seperti UPTD, STA, SPK, BoQ, IKJ, preservasi,
    dan kemantapan jalan secara konsisten.
-   Contoh wilayah dapat memakai Bandar Lampung, Lampung Selatan,
    Lampung Tengah, Metro, Kotabumi, Menggala, Mesuji, dan wilayah
    Lampung lainnya.
-   Data contoh harus diberi status sebagai data demo/simulasi jika
    bukan data resmi.
-   Jangan menciptakan angka kinerja, data anggaran, identitas pejabat,
    atau klaim institusional seolah-olah data faktual.

## 10. Responsive Design

### Desktop

-   Sidebar tetap terlihat.
-   Dashboard menggunakan grid multi-kolom.
-   Peta dan tabel mendapat ruang yang memadai.
-   Topbar menampilkan breadcrumb, pencarian, notifikasi, dan profil.

### Tablet

-   Sidebar dapat diperkecil atau menjadi drawer.
-   Grid KPI menjadi dua kolom.
-   Filter dapat membungkus ke baris berikutnya.
-   Panel peta dan alert disusun ulang secara proporsional.

### Mobile

-   Gunakan satu kolom.
-   Navigasi menjadi drawer/menu.
-   KPI ditampilkan dalam card yang mudah dipindai.
-   Tabel menggunakan horizontal scroll atau tampilan daftar yang
    terstruktur.
-   Peta tetap dapat digunakan tanpa menutupi kontrol.
-   Tombol utama mudah dijangkau.
-   Hindari mengecilkan seluruh desktop layout secara paksa.

## 11. Accessibility dan Usability

-   Pastikan kontras teks memadai.
-   Jangan mengandalkan warna saja untuk membedakan status; sertakan
    label.
-   Gunakan ukuran target klik yang nyaman.
-   Berikan label pada input dan ikon aksi.
-   Sediakan tooltip untuk ikon tanpa teks.
-   Pastikan navigasi keyboard dan focus state terlihat.
-   Gunakan heading semantik dan urutan baca yang logis.
-   Berikan empty state, loading state, error state, dan success
    feedback.
-   Hindari animasi berkedip atau gerakan berlebihan.
-   Pertahankan keterbacaan tabel dan peta.

## 12. Aturan Konsistensi yang Wajib

Saat membuat halaman baru atau mengubah halaman lama:

1.  Pertahankan sidebar 250px, topbar 64px, dan struktur shell yang sama
    pada desktop.
2.  Pertahankan palet warna dan token tipografi dari skill ini.
3.  Gunakan Inter dan Material Symbols Outlined.
4.  Gunakan card putih, latar biru sangat muda, radius 8--12px, dan
    shadow tipis.
5.  Gunakan pola tabel, filter, badge, tombol, dan form yang seragam.
6.  Jangan mengganti nama atau urutan menu tanpa kebutuhan produk.
7.  Jangan menambahkan warna aksen baru secara sembarangan.
8.  Jangan membuat tiap modul mempunyai gaya visual berbeda.
9.  Pastikan tiap halaman memiliki satu tujuan utama dan hierarki konten
    yang jelas.
10. Prioritaskan keterbacaan data operasional daripada dekorasi.

## 13. Prompt Penggunaan Skill

Gunakan instruksi berikut saat skill diterapkan:

> Rancang atau perbaiki halaman RoadCare dengan mengikuti seluruh aturan
> dalam RoadCare Design System & UI/UX Skill. Pertahankan shell
> aplikasi, sidebar, topbar, palet warna, tipografi Inter, Material
> Symbols Outlined, spacing, radius, komponen, dan footer. Sesuaikan isi
> halaman dengan tujuan modul yang diminta. Gunakan data contoh yang
> realistis untuk konteks preservasi jalan Provinsi Lampung dan tandai
> data simulasi secara jelas. Prioritaskan dashboard pemerintahan yang
> profesional, informatif, responsif, dan mudah digunakan. Jangan
> membuat tampilan landing page atau mengubah identitas visual RoadCare.

## 14. Checklist Review Sebelum Final

-   [ ] Identitas RoadCare dan logo placeholder benar.
-   [ ] Sidebar dan topbar konsisten.
-   [ ] Palet warna sesuai token.
-   [ ] Typography menggunakan Inter dan skala yang tepat.
-   [ ] Card, tabel, filter, badge, dan tombol konsisten.
-   [ ] Data memiliki format lokal yang benar.
-   [ ] Status kritis terlihat jelas tanpa membuat seluruh halaman
    terasa alarm.
-   [ ] Peta, chart, dan tabel memiliki konteks dan legenda.
-   [ ] Tombol dan kontrol memiliki fungsi/state yang jelas.
-   [ ] Tersedia loading, empty, error, dan success state bila
    diperlukan.
-   [ ] Tampilan responsif pada desktop, tablet, dan mobile.
-   [ ] Tidak ada angka atau klaim simulasi yang disajikan sebagai data
    resmi.
-   [ ] Footer dan copyright mengikuti instruksi proyek.
