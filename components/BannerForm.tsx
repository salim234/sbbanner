import React, { useState } from 'react';
import { AppData, RowItem, Section } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface BannerFormProps {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-slate-200 rounded-lg bg-white">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors rounded-t-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
                <span>{title}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 text-slate-600 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 space-y-4 border-t border-slate-200">
                    {children}
                </div>
            )}
        </div>
    );
};

const FormInput: React.FC<{
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}> = ({ label, name, value, onChange, type = 'text' }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">{label}</label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
    </div>
);

const ImageUpload: React.FC<{
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
}> = ({ label, value, onChange }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        onChange(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="mt-1 flex items-center gap-4">
        {value ? (
          <img src={value} alt="Preview" className="w-16 h-16 object-contain rounded-md border p-1 bg-slate-50" />
        ) : (
          <div className="w-16 h-16 rounded-md border-2 border-dashed bg-slate-100 flex items-center justify-center text-slate-400 text-xs text-center p-1">
            No Image
          </div>
        )}
        <div className="flex flex-col gap-2">
            <input type="file" accept="image/png, image/jpeg, image/svg+xml" ref={inputRef} onChange={handleFileChange} className="hidden" />
            <button type="button" onClick={() => inputRef.current?.click()} className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-md transition-colors">Choose File</button>
            {value && <button type="button" onClick={() => onChange('')} className="text-sm text-red-600 hover:text-red-800 font-semibold">Remove</button>}
        </div>
      </div>
    </div>
  );
};

const RowInput: React.FC<{
  item: RowItem;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onRemove: () => void;
}> = ({ item, onChange, onRemove }) => {
  return (
    <div className="grid grid-cols-12 gap-x-3 gap-y-2 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
      <div className="col-span-12">
        <label className="text-xs font-semibold text-slate-600">Description</label>
        <input name="description" value={item.description} onChange={onChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>
      <div className="col-span-12 sm:col-span-5">
        <label className="text-xs font-semibold text-slate-600">Initial (Semula)</label>
        <input type="number" name="initial" value={item.initial} onChange={onChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>
      <div className="col-span-12 sm:col-span-5">
        <label className="text-xs font-semibold text-slate-600">Final (Menjadi)</label>
        <input type="number" name="final" value={item.final} onChange={onChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
      </div>
      <div className="col-span-12 sm:col-span-2 flex items-end h-full">
        <button onClick={onRemove} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors w-full flex justify-center items-center h-[38px] mt-[19px] sm:mt-0">
            <TrashIcon />
        </button>
      </div>
    </div>
  );
};

const AddButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 font-semibold px-4 py-2 rounded-md transition-colors">
        <PlusIcon /> {children}
    </button>
);


const BannerForm: React.FC<BannerFormProps> = ({ data, setData }) => {

  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, header: { ...prev.header, [name]: value } }));
  };

  const handleImageChange = (name: keyof AppData['header'], dataUrl: string) => {
    setData(prev => ({ ...prev, header: { ...prev.header, [name]: dataUrl }}));
  };

  const handleRowChange = <T extends keyof AppData>(section: T, index: number, field: keyof RowItem, value: string | number) => {
    setData(prev => {
        const sectionData = prev[section] as { rows: RowItem[] };
        const newRows = [...sectionData.rows];
        newRows[index] = { ...newRows[index], [field]: value };
        return { ...prev, [section]: { ...sectionData, rows: newRows } };
    });
  };
  
  const handleBelanjaRowChange = (sectionIndex: number, rowIndex: number, field: keyof RowItem, value: string | number) => {
    setData(prev => {
      const newBelanja = [...prev.belanja];
      const newRows = [...newBelanja[sectionIndex].rows];
      newRows[rowIndex] = {...newRows[rowIndex], [field]: value};
      newBelanja[sectionIndex] = {...newBelanja[sectionIndex], rows: newRows};
      return {...prev, belanja: newBelanja};
    });
  }

  const handleFinancingRowChange = (type: 'penerimaanRows' | 'pengeluaranRows', rowIndex: number, field: keyof RowItem, value: string | number) => {
    setData(prev => {
        const newRows = [...prev.pembiayaan[type]];
        newRows[rowIndex] = {...newRows[rowIndex], [field]: value};
        return {...prev, pembiayaan: {...prev.pembiayaan, [type]: newRows}};
    });
  }

  const addRow = <T extends keyof AppData>(section: T) => {
    const newRow: RowItem = { id: Date.now().toString(), description: 'New Item', initial: 0, final: 0 };
    setData(prev => {
        const sectionData = prev[section] as { rows: RowItem[] };
        return { ...prev, [section]: { ...sectionData, rows: [...sectionData.rows, newRow] } };
    });
  };

  const addBelanjaRow = (sectionIndex: number) => {
      const newRow: RowItem = { id: Date.now().toString(), description: 'New Item', initial: 0, final: 0 };
      setData(prev => {
          const newBelanja = [...prev.belanja];
          newBelanja[sectionIndex] = {...newBelanja[sectionIndex], rows: [...newBelanja[sectionIndex].rows, newRow]};
          return {...prev, belanja: newBelanja};
      });
  }

   const addFinancingRow = (type: 'penerimaanRows' | 'pengeluaranRows') => {
      const newRow: RowItem = { id: Date.now().toString(), description: 'New Item', initial: 0, final: 0 };
      setData(prev => ({
          ...prev,
          pembiayaan: {...prev.pembiayaan, [type]: [...prev.pembiayaan[type], newRow]}
      }));
  }

  const removeRow = <T extends keyof AppData>(section: T, index: number) => {
    setData(prev => {
        const sectionData = prev[section] as { rows: RowItem[] };
        const newRows = sectionData.rows.filter((_, i) => i !== index);
        return { ...prev, [section]: { ...sectionData, rows: newRows } };
    });
  };
  
  const removeBelanjaRow = (sectionIndex: number, rowIndex: number) => {
    setData(prev => {
      const newBelanja = [...prev.belanja];
      const newRows = newBelanja[sectionIndex].rows.filter((_, i) => i !== rowIndex);
      newBelanja[sectionIndex] = {...newBelanja[sectionIndex], rows: newRows};
      return {...prev, belanja: newBelanja};
    });
  }

  const removeFinancingRow = (type: 'penerimaanRows' | 'pengeluaranRows', rowIndex: number) => {
    setData(prev => ({
        ...prev,
        pembiayaan: {...prev.pembiayaan, [type]: prev.pembiayaan[type].filter((_,i) => i !== rowIndex)}
    }));
  }

  return (
    <div className="space-y-6">
      <CollapsibleSection title="Header & Background" defaultOpen>
        <div className="space-y-4">
            <FormInput label="Village Name" name="villageName" value={data.header.villageName} onChange={handleHeaderChange} />
            <FormInput label="District Name" name="districtName" value={data.header.districtName} onChange={handleHeaderChange} />
            <FormInput label="Regency Name" name="regencyName" value={data.header.regencyName} onChange={handleHeaderChange} />
            <FormInput label="Head of Village Name" name="headOfVillageName" value={data.header.headOfVillageName} onChange={handleHeaderChange} />
            <FormInput label="Year" name="year" value={data.header.year} onChange={handleHeaderChange} type="number" />
            <ImageUpload label="Logo Kabupaten" value={data.header.logoCiamis} onChange={(url) => handleImageChange('logoCiamis', url)} />
            <ImageUpload label="Logo Kemendesa" value={data.header.logoKemendesa} onChange={(url) => handleImageChange('logoKemendesa', url)} />
            <ImageUpload label="Headshot" value={data.header.headshot} onChange={(url) => handleImageChange('headshot', url)} />
            <ImageUpload label="Background Image" value={data.header.backgroundImage} onChange={(url) => handleImageChange('backgroundImage', url)} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Pendapatan (Revenue)">
        <div className="space-y-3">
          {data.pendapatan.rows.map((item, index) => (
              <RowInput 
                  key={item.id} 
                  item={item} 
                  onChange={(e) => handleRowChange('pendapatan', index, e.target.name as keyof RowItem, e.target.type === 'number' ? Number(e.target.value) : e.target.value)}
                  onRemove={() => removeRow('pendapatan', index)} 
              />
          ))}
          <AddButton onClick={() => addRow('pendapatan')}>Add Row</AddButton>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Belanja (Expenditure)">
        <div className="space-y-4">
            {data.belanja.map((section, sectionIndex) => (
                <CollapsibleSection key={section.id} title={section.title}>
                    <div className="space-y-3">
                        {section.rows.map((item, rowIndex) => (
                           <RowInput 
                                key={item.id}
                                item={item}
                                onChange={(e) => handleBelanjaRowChange(sectionIndex, rowIndex, e.target.name as keyof RowItem, e.target.type === 'number' ? Number(e.target.value) : e.target.value)}
                                onRemove={() => removeBelanjaRow(sectionIndex, rowIndex)}
                           />
                        ))}
                        <AddButton onClick={() => addBelanjaRow(sectionIndex)}>Add Row</AddButton>
                    </div>
                </CollapsibleSection>
            ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Pembiayaan (Financing)">
        <div className="space-y-4">
            <CollapsibleSection title="Penerimaan">
                 <div className="space-y-3">
                    {data.pembiayaan.penerimaanRows.map((item, index) => (
                        <RowInput
                            key={item.id}
                            item={item}
                            onChange={(e) => handleFinancingRowChange('penerimaanRows', index, e.target.name as keyof RowItem, e.target.type === 'number' ? Number(e.target.value) : e.target.value)}
                            onRemove={() => removeFinancingRow('penerimaanRows', index)}
                        />
                    ))}
                    <AddButton onClick={() => addFinancingRow('penerimaanRows')}>Add Penerimaan</AddButton>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Pengeluaran">
                 <div className="space-y-3">
                    {data.pembiayaan.pengeluaranRows.map((item, index) => (
                        <RowInput
                            key={item.id}
                            item={item}
                            onChange={(e) => handleFinancingRowChange('pengeluaranRows', index, e.target.name as keyof RowItem, e.target.type === 'number' ? Number(e.target.value) : e.target.value)}
                            onRemove={() => removeFinancingRow('pengeluaranRows', index)}
                        />
                    ))}
                    <AddButton onClick={() => addFinancingRow('pengeluaranRows')}>Add Pengeluaran</AddButton>
                </div>
            </CollapsibleSection>
        </div>
      </CollapsibleSection>
    </div>
  );
};

export default BannerForm;