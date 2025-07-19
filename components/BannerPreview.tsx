
import React, { forwardRef, useMemo } from 'react';
import { AppData, RowItem, Section } from '../types';

interface BannerPreviewProps {
    data: AppData;
}

// --- PLACEHOLDER COMPONENTS ---
const LogoCiamisPlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 50 55" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 0L50 12.5V29.16C50 45.83 37.5 55 25 55C12.5 55 0 45.83 0 29.16V12.5L25 0Z" fill="#a5f3fc"/><path d="M25 5L45 15.5V29.16C45 42.5 35 50 25 50C15 50 5 42.5 5 29.16V15.5L25 5Z" fill="#0c4a6e"/><text x="25" y="32" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">KABUPATEN</text></svg>
);
const LogoKemendesaPlaceholder: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="27.5" cy="27.5" r="27.5" fill="#15803d"/><circle cx="27.5" cy="27.5" r="23.5" fill="white"/><path d="M27.5 14L41.5 28L27.5 42L13.5 28L27.5 14Z" fill="#15803d"/><text x="27.5" y="31" fontSize="5" fill="white" textAnchor="middle" fontWeight="bold">KEMENDESA</text></svg>
);
const HeadshotPlaceholder: React.FC<{ className?: string; hasBg?: boolean }> = ({ className, hasBg }) => (
    <div className={`${className} ${hasBg ? 'bg-slate-500/30 border-slate-400/50' : 'bg-slate-200 border-2 border-slate-300'} flex items-center justify-center`}><svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></div>
);

// --- HELPER FUNCTIONS & STYLES ---
const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID').format(value);

const ChangeValue: React.FC<{ value: number; theme?: 'light' | 'dark' }> = ({ value, theme = 'light' }) => {
  const isNegative = value < 0;
  const formattedValue = formatCurrency(Math.abs(value));
  const displayValue = isNegative ? `(${formattedValue})` : formattedValue;
  
  const colorClass = theme === 'dark' 
    ? (value === 0 ? 'text-slate-300' : isNegative ? 'text-red-400' : 'text-green-400')
    : (value === 0 ? 'text-slate-700' : isNegative ? 'text-red-600' : 'text-green-600');
  
  return <span className={`font-mono font-bold ${colorClass}`}>{displayValue}</span>;
};

const colorMap: { [key: string]: string } = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  amber: 'bg-amber-500',
  rose: 'bg-rose-600',
  indigo: 'bg-indigo-600'
};


const BannerPreview = forwardRef<HTMLDivElement, BannerPreviewProps>(({ data }, ref) => {
    const { header, pendapatan, belanja, pembiayaan } = data;
    const hasBg = !!header.backgroundImage;

    const { totalPendapatan, belanjaTotals, totalBelanja, surplusDefisit, totalPenerimaanPembiayaan, totalPengeluaranPembiayaan, pembiayaanNetto, sisaPembiayaan } = useMemo(() => {
        const totalPendapatan = pendapatan.rows.reduce((acc, r) => ({ initial: acc.initial + r.initial, final: acc.final + r.final }), { initial: 0, final: 0 });
        const belanjaTotals = belanja.map(section => section.rows.reduce((acc, r) => ({ initial: acc.initial + r.initial, final: acc.final + r.final }), { initial: 0, final: 0 }));
        const totalBelanja = belanjaTotals.reduce((acc, totals) => ({ initial: acc.initial + totals.initial, final: acc.final + totals.final }), { initial: 0, final: 0 });
        const surplusDefisit = { initial: totalPendapatan.initial - totalBelanja.initial, final: totalPendapatan.final - totalBelanja.final };
        const totalPenerimaanPembiayaan = pembiayaan.penerimaanRows.reduce((acc, r) => ({ initial: acc.initial + r.initial, final: acc.final + r.final }), { initial: 0, final: 0 });
        const totalPengeluaranPembiayaan = pembiayaan.pengeluaranRows.reduce((acc, r) => ({ initial: acc.initial + r.initial, final: acc.final + r.final }), { initial: 0, final: 0 });
        const pembiayaanNetto = { initial: totalPenerimaanPembiayaan.initial - totalPengeluaranPembiayaan.initial, final: totalPenerimaanPembiayaan.final - totalPengeluaranPembiayaan.final };
        const sisaPembiayaan = { initial: surplusDefisit.initial + pembiayaanNetto.initial, final: surplusDefisit.final + pembiayaanNetto.final };
        return { totalPendapatan, belanjaTotals, totalBelanja, surplusDefisit, totalPenerimaanPembiayaan, totalPengeluaranPembiayaan, pembiayaanNetto, sisaPembiayaan };
    }, [pendapatan, belanja, pembiayaan]);

    const DataTable: React.FC<{ rows: RowItem[] }> = ({ rows }) => {
        const rowBgClass = hasBg ? 'bg-black/5' : 'bg-slate-50/50';
        const borderClass = hasBg ? 'border-black/10' : 'border-slate-100';
        const headerBorderClass = hasBg ? 'border-black/20' : 'border-slate-200';
        return (
            <div className="text-[9px] sm:text-[11px]">
                <div className={`grid grid-cols-10 gap-2 text-slate-600 font-bold p-1.5 text-center border-b-2 ${headerBorderClass}`}>
                    <div className="col-span-4 text-left pl-1">URAIAN</div>
                    <div className="col-span-2">SEMULA</div>
                    <div className="col-span-2">MENJADI</div>
                    <div className="col-span-2">PERUBAHAN</div>
                </div>
                <div>
                    {rows.map((item, index) => (
                        <div key={item.id} className={`grid grid-cols-10 gap-2 px-1.5 py-1 items-center border-b ${borderClass} last:border-0 ${index % 2 !== 0 ? rowBgClass : ''}`}>
                            <div className="col-span-4 font-bold text-slate-800 break-words leading-snug">{item.description}</div>
                            <div className="col-span-2 text-right font-mono font-semibold text-slate-800">{formatCurrency(item.initial)}</div>
                            <div className="col-span-2 text-right font-mono font-semibold text-slate-800">{formatCurrency(item.final)}</div>
                            <div className="col-span-2 text-right"><ChangeValue value={item.final - item.initial} /></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    const TotalRow: React.FC<{ label: string; initial: number; final: number; }> = ({ label, initial, final }) => {
        const bgClass = hasBg ? 'bg-black/10' : 'bg-slate-200/80';
        return (
          <div className={`grid grid-cols-10 gap-2 text-[10px] sm:text-[12px] ${bgClass} font-bold p-1.5 mt-2 rounded-md text-slate-800`}>
            <div className="col-span-4 uppercase">{label}</div>
            <div className="col-span-2 text-right font-mono font-bold">{formatCurrency(initial)}</div>
            <div className="col-span-2 text-right font-mono font-bold">{formatCurrency(final)}</div>
            <div className="col-span-2 text-right"><ChangeValue value={final - initial} /></div>
          </div>
        );
    };
    
    const SectionCard: React.FC<{ title: string; rows: RowItem[]; totalLabel?: string; totalInitial?: number; totalFinal?: number; color: string; }> = ({ title, rows, color, totalLabel, totalInitial, totalFinal }) => {
        const colorClass = colorMap[color] || 'bg-slate-600';
        const cardClass = hasBg ? 'rounded-lg overflow-hidden shadow-xl bg-white/70 backdrop-blur-sm' : 'rounded-lg overflow-hidden shadow-lg bg-white';
        return (
            <div className={cardClass}>
                <div className={`${colorClass} p-2 sm:p-3`}>
                    <h3 className="font-bold text-white text-sm sm:text-base uppercase">{title}</h3>
                </div>
                <div className="p-2 sm:p-3">
                    <DataTable rows={rows} />
                    {totalLabel && totalInitial !== undefined && totalFinal !== undefined && (
                         <TotalRow label={totalLabel} initial={totalInitial} final={totalFinal} />
                    )}
                </div>
            </div>
        );
    };
    
    const BannerHeader: React.FC<{ header: AppData['header'] }> = ({ header }) => {
        const containerClass = hasBg
            ? 'bg-black/20 backdrop-blur-sm text-white'
            : 'bg-white text-slate-900';
        const titleTextClass = hasBg ? 'text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]' : 'text-slate-900';
        const greenTextClass = hasBg ? 'text-green-400' : 'text-green-600';
        const redTextClass = hasBg ? 'text-red-500' : 'text-red-600';
    
        return (
            <div className={`${containerClass} px-6 sm:px-8 py-4 sm:py-6 flex justify-between items-center gap-4 rounded-t-lg`}>
                {/* Left Side: Headshot */}
                <div className="flex-shrink-0">
                    <div className="w-28 h-auto sm:w-32">
                         {header.headshot ? 
                            <img src={header.headshot} alt={header.headOfVillageName} className="w-full h-auto object-contain" /> : 
                            <HeadshotPlaceholder className="w-28 h-36 sm:w-32 sm:h-40" hasBg={hasBg} />
                        }
                    </div>
                </div>
    
                {/* Center: Title */}
                <div className={`text-center flex-grow mx-4 ${titleTextClass}`}>
                    <p className="font-extrabold text-xl sm:text-2xl uppercase tracking-wider">INFOGRAFIS PERUBAHAN</p>
                    <p className="font-black text-5xl sm:text-6xl md:text-7xl my-1">
                        <span className={greenTextClass}>APBDES</span> <span className={redTextClass}>{header.year}</span>
                    </p>
                    <p className="font-bold text-base sm:text-lg">
                        Desa {header.villageName} Kec. {header.districtName}
                    </p>
                </div>
    
                {/* Right Side: Logos */}
                <div className="flex-shrink-0 flex items-center gap-4">
                    {header.logoCiamis ? 
                        <img src={header.logoCiamis} alt="Logo Kabupaten" className="h-20 sm:h-24 object-contain" /> : 
                        <LogoCiamisPlaceholder className="h-20 sm:h-24 w-auto" />
                    }
                    {header.logoKemendesa ? 
                        <img src={header.logoKemendesa} alt="Logo Kemendesa" className="h-24 sm:h-[115px] object-contain" /> : 
                        <LogoKemendesaPlaceholder className="h-24 sm:h-[115px] w-auto" />
                    }
                </div>
            </div>
        );
    };
    
  return (
    <div 
        ref={ref} 
        style={hasBg ? { backgroundImage: `url(${header.backgroundImage})` } : {}}
        className={`w-full flex flex-col font-['Inter'] rounded-lg shadow-2xl relative ${hasBg ? 'bg-cover bg-center' : 'bg-white'}`}
    >
        {hasBg && <div className="absolute inset-0 bg-black/10 rounded-lg"></div>}
        
        <div className="relative z-10">
            <BannerHeader header={header} />
            
            <div className="p-3 sm:p-4 space-y-4">
                {/* Main Content */}
                <SectionCard 
                    title="PENDAPATAN" 
                    rows={pendapatan.rows} 
                    color="green" 
                    totalLabel="JUMLAH PENDAPATAN"
                    totalInitial={totalPendapatan.initial}
                    totalFinal={totalPendapatan.final}
                />

                {/* Belanja Section */}
                <div>
                     <h2 className={`text-2xl sm:text-3xl font-bold pb-2 mb-2 mt-4 text-center ${hasBg ? 'text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]' : 'text-slate-700'}`}>BELANJA</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {belanja.map((section, index) => (
                            <SectionCard 
                                key={section.id} 
                                title={section.title}
                                rows={section.rows} 
                                color={section.color}
                                totalLabel="JUMLAH"
                                totalInitial={belanjaTotals[index].initial}
                                totalFinal={belanjaTotals[index].final}
                            />
                        ))}
                    </div>
                     <div className={`p-2 rounded-lg mt-4 ${hasBg ? 'bg-white/70 backdrop-blur-sm' : 'bg-white'}`}>
                        <TotalRow label="JUMLAH TOTAL BELANJA" initial={totalBelanja.initial} final={totalBelanja.final} />
                    </div>
                </div>

                {/* Surplus/Defisit */}
                <div className={`${hasBg ? 'bg-slate-800/70 backdrop-blur-sm' : 'bg-slate-700'} text-white rounded-lg p-1.5 shadow-lg`}>
                    <div className="grid grid-cols-10 gap-2 text-[10px] sm:text-[12px] font-bold items-center">
                        <div className="col-span-4 uppercase">SURPLUS / (DEFISIT)</div>
                        <div className="col-span-2 text-right font-mono">{formatCurrency(surplusDefisit.initial)}</div>
                        <div className="col-span-2 text-right font-mono">{formatCurrency(surplusDefisit.final)}</div>
                        <div className="col-span-2 text-right">
                            <ChangeValue value={surplusDefisit.final - surplusDefisit.initial} theme="dark" />
                        </div>
                    </div>
                </div>

                {/* Pembiayaan */}
                 <div className="space-y-4">
                    <SectionCard 
                        title="Penerimaan Pembiayaan" 
                        rows={pembiayaan.penerimaanRows} 
                        color="indigo" 
                        totalLabel="Total Penerimaan"
                        totalInitial={totalPenerimaanPembiayaan.initial}
                        totalFinal={totalPenerimaanPembiayaan.final}
                    />
                    <SectionCard 
                        title="Pengeluaran Pembiayaan" 
                        rows={pembiayaan.pengeluaranRows} 
                        color="indigo"
                        totalLabel="Total Pengeluaran"
                        totalInitial={totalPengeluaranPembiayaan.initial}
                        totalFinal={totalPengeluaranPembiayaan.final}
                    />
                     <div className={`p-2 rounded-lg ${hasBg ? 'bg-white/70 backdrop-blur-sm' : 'bg-white'}`}>
                        <TotalRow label="PEMBIAYAAN NETTO" initial={pembiayaanNetto.initial} final={pembiayaanNetto.final} />
                        <TotalRow label="SISA LEBIH / (KURANG) PEMBIAYAAN ANGGARAN" initial={sisaPembiayaan.initial} final={sisaPembiayaan.final} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
});

export default BannerPreview;
