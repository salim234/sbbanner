import { AppData } from './types';

export const INITIAL_DATA: AppData = {
  header: {
    villageName: "....................",
    districtName: "....................",
    regencyName: "",
    headOfVillageName: "ISMAIL",
    year: 2025,
    logoCiamis: '',
    logoKemendesa: '',
    headshot: '',
    backgroundImage: '',
  },
  pendapatan: {
    rows: [
      { id: 'pad1', description: 'Pendapatan Asli Desa', initial: 40325000, final: 40325000 },
      { id: 'pad2', description: 'Hasil Aset Desa', initial: 40325000, final: 40325000 },
      { id: 'pt1', description: 'Pendapatan Transfer', initial: 1615553800, final: 1615553800 },
      { id: 'pt2', description: 'Dana Desa', initial: 934850000, final: 934850000 },
      { id: 'pt3', description: 'Bagi Hasil Pajak dan Retribusi', initial: 32206000, final: 32206000 },
      { id: 'pt4', description: 'Alokasi Dana Desa', initial: 518497800, final: 518497800 },
      { id: 'pt5', description: 'Bantuan Keuangan Provinsi', initial: 130000000, final: 130000000 },
      { id: 'pl1', description: 'Pendapatan Lain-lain', initial: 2000000, final: 2000000 },
      { id: 'pl2', description: 'Bunga Bank', initial: 2000000, final: 2000000 },
    ],
  },
  belanja: [
    {
      id: 'b1',
      title: 'BIDANG PENYELENGGARAAN PEMERINTAHAN DESA',
      color: 'blue',
      rows: [
        { id: 'b1r1', description: 'Penyelenggaran Belanja Siltap, Tunjangan dan Operasional Pemerintahan Desa', initial: 550550284, final: 550550284 },
        { id: 'b1r2', description: 'Penyediaan Sarana Prasarana Pemerintahan Desa', initial: 148467993, final: 148467993 },
        { id: 'b1r3', description: 'Pengelolaan Administrasi Kependudukan, Pencatatan Sipil, Statistik dan Kearsipan', initial: 40657800, final: 40657800 },
        { id: 'b1r4', description: 'Penyelenggaraan Tata Praja Pemerintahan, Perencanaan, Keuangan dan Pelaporan', initial: 30761000, final: 29161000 },
        { id: 'b1r5', description: 'Sub Bidang Pertanahan', initial: 7541834, final: 7541834 },
      ],
    },
    {
      id: 'b2',
      title: 'BIDANG PELAKSANAAN PEMBANGUNAN DESA',
      color: 'green',
      rows: [
        { id: 'b2r1', description: 'Sub Bidang Pendidikan', initial: 42962000, final: 38962000 },
        { id: 'b2r2', description: 'Sub Bidang Kesehatan', initial: 119900000, final: 119900000 },
        { id: 'b2r3', description: 'Sub Bidang Pekerjaan Umum dan Penataan Ruang', initial: 737892178, final: 775743978 },
        { id: 'b2r4', description: 'Sub Bidang Kawasan Pemukiman', initial: 40946000, final: 40946000 },
        { id: 'b2r5', description: 'Sub Bidang Perhubungan, Komunikasi dan Informatika', initial: 1000000, final: 1000000 },
        { id: 'b2r6', description: 'Sub Bidang Pariwisata', initial: 86447750, final: 86447750 },
      ],
    },
    {
      id: 'b3',
      title: 'BIDANG PEMBINAAN KEMASYARAKATAN',
      color: 'purple',
      rows: [
          { id: 'b3r1', description: 'Sub Bidang Ketenteraman, Ketertiban Umum dan Perlindungan Masyarakat', initial: 22799900, final: 22799900 },
          { id: 'b3r2', description: 'Sub Bidang Kebudayaan dan Keagamaan', initial: 71000000, final: 71000000 },
          { id: 'b3r3', description: 'Sub Bidang Kepemudaan dan Olahraga', initial: 45720000, final: 41720000 },
          { id: 'b3r4', description: 'Sub Bidang Kelembagaan Masyarakat', initial: 14000000, final: 14000000 },
      ],
    },
    {
      id: 'b4',
      title: 'BIDANG PENANGGULANGAN BENCANA, DARURAT DAN MENDESAK DESA',
      color: 'amber',
      rows: [
          { id: 'b4r1', description: 'Sub Bidang Penanggulangan Bencana', initial: 10682400, final: 10682400 },
          { id: 'b4r2', description: 'Sub Bidang Keadaan Mendesak', initial: 126000000, final: 126000000 },
      ],
    },
    {
      id: 'b5',
      title: 'BIDANG PEMBERDAYAAN MASYARAKAT',
      color: 'rose',
      rows: [
          { id: 'b5r1', description: 'Sub Bidang Kelautan dan Perikanan', initial: 13857000, final: 0 },
          { id: 'b5r2', description: 'Sub Bidang Pertanian dan Peternakan', initial: 64151000, final: 5000000 },
      ],
    },
  ],
  pembiayaan: {
    penerimaanRows: [
        { id: 'fin1', description: 'Penerimaan Pembiayaan', initial: 681171239, final: 681171239 },
        { id: 'fin2', description: 'SILPA Tahun Sebelumnya', initial: 681171239, final: 681171239 },
    ],
    pengeluaranRows: [
        { id: 'fout1', description: 'Pengeluaran Pembiayaan', initial: 163712900, final: 208469100 },
        { id: 'fout2', description: 'Pembentukan Dana Cadangan', initial: 5000000, final: 6600000 },
        { id: 'fout3', description: 'Penyertaan Modal Desa', initial: 158712900, final: 201869100 },
    ],
  },
};