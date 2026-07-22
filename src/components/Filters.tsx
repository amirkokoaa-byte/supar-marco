import React, { useMemo } from 'react';
import { BranchType, Governorate } from '../types';
import { chains } from '../data/chains';
import { branches } from '../data/branches';

interface FiltersProps {
  selectedChains: string[];
  setSelectedChains: (chains: string[]) => void;
  selectedGovs: Governorate[];
  setSelectedGovs: (govs: Governorate[]) => void;
  selectedTypes: BranchType[];
  setSelectedTypes: (types: BranchType[]) => void;
}

export function Filters({
  selectedChains,
  setSelectedChains,
  selectedGovs,
  setSelectedGovs,
  selectedTypes,
  setSelectedTypes
}: FiltersProps) {

  // Dynamically extract unique governorates and types from real data
  const allGovs = useMemo(() => {
    const govs = new Set(branches.map(b => b.governorate));
    return Array.from(govs).sort();
  }, []);

  const allTypes = useMemo(() => {
    const types = new Set(branches.map(b => b.type));
    return Array.from(types).sort();
  }, []);

  const toggleArrayItem = <T,>(array: T[], setArray: (val: T[]) => void, item: T) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-6">
      <div>
        <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">السلسلة التجارية</h3>
        <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
          {chains.map(chain => (
            <label key={chain.id} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={selectedChains.includes(chain.id)}
                onChange={() => toggleArrayItem(selectedChains, setSelectedChains, chain.id)}
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                {chain.name_ar}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">المحافظة</h3>
        <div className="space-y-2">
          {allGovs.map(gov => (
            <label key={gov} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={selectedGovs.includes(gov)}
                onChange={() => toggleArrayItem(selectedGovs, setSelectedGovs, gov)}
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                {gov}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-800 mb-3 border-b pb-2">نوع الفرع</h3>
        <div className="space-y-2">
          {allTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleArrayItem(selectedTypes, setSelectedTypes, type)}
              />
              <span className="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                {type}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
