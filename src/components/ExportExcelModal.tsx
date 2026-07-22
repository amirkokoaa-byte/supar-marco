import React, { useState } from 'react';
import { Branch } from '../types';
import { X, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ExportExcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  branches: Branch[];
}

export function ExportExcelModal({ isOpen, onClose, branches }: ExportExcelModalProps) {
  const [selectedChain, setSelectedChain] = useState<string>('all');
  
  if (!isOpen) return null;
  
  const uniqueChains = Array.from(new Set(branches.map(b => b.chain_name_ar)));

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    
    const exportChain = (chainName: string) => {
      const chainBranches = branches.filter(b => b.chain_name_ar === chainName);
      
      const worksheetData = [
        [chainName], // Title at the top
        [], // Empty row
        ['الفرع', 'العنوان', 'اللوكيشن'] // Headers
      ];
      
      chainBranches.forEach(b => {
        worksheetData.push([
          b.branch_name,
          b.address,
          `https://maps.google.com/?q=${b.coordinates.lat},${b.coordinates.lng}`
        ]);
      });
      
      const ws = XLSX.utils.aoa_to_sheet(worksheetData);
      
      // Styling and merging the title
      ws['!merges'] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } } // Merge first row across 3 columns
      ];
      
      // Basic column widths
      ws['!cols'] = [
        { wch: 30 }, // الفرع
        { wch: 60 }, // العنوان
        { wch: 50 }  // اللوكيشن
      ];
      
      // We must make sure the sheet name is valid and less than 31 characters
      const sheetName = chainName.substring(0, 31).replace(/[\\/?*\[\]]/g, '');
      
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    };

    if (selectedChain === 'all') {
      uniqueChains.forEach(chain => {
        exportChain(chain);
      });
    } else {
      exportChain(selectedChain);
    }
    
    const fileName = selectedChain === 'all' ? 'All_Branches.xlsx' : `${selectedChain}_Branches.xlsx`;
    XLSX.writeFile(wb, fileName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl relative p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-red-500 font-bold p-2 transition-colors rounded-lg hover:bg-red-50"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center mb-6 mt-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">تصدير ملف إكسيل</h2>
        </div>
        
        <div className="mb-6">
          <label className="block text-slate-700 font-semibold mb-2">اختر السلسلة للطباعة:</label>
          <select 
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-slate-50"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="all">كل السلاسل</option>
            {uniqueChains.map(chain => (
              <option key={chain} value={chain}>{chain}</option>
            ))}
          </select>
        </div>
        
        <button 
          onClick={handleExport}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <FileSpreadsheet className="w-5 h-5" />
          تصدير الآن
        </button>
      </div>
    </div>
  );
}
