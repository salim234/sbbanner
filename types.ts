
export interface RowItem {
  id: string;
  description: string;
  initial: number;
  final: number;
}

export interface Section {
  id: string;
  title: string;
  rows: RowItem[];
  color: string;
}

export interface FinancingData {
  penerimaanRows: RowItem[];
  pengeluaranRows: RowItem[];
}

export interface AppData {
  header: {
    villageName: string;
    districtName: string;
    regencyName: string;
    headOfVillageName: string;
    year: number;
    logoCiamis: string;
    logoKemendesa: string;
    headshot: string;
    backgroundImage: string;
  };
  pendapatan: {
    rows: RowItem[];
  };
  belanja: Section[];
  pembiayaan: FinancingData;
}
