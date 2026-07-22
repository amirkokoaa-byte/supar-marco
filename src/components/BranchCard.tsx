import React from 'react';
import { Branch } from '../types';
import { MapPin, Phone, Clock, Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface BranchCardProps {
  branch: Branch;
  distance?: number;
}

export function BranchCard({ branch, distance }: BranchCardProps) {
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(branch.address);
    alert('تم نسخ العنوان بنجاح!');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5 border-b border-slate-100 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              {branch.chain_name_ar}
            </span>
            {branch.is_active_2026 && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" title="موثق لعام 2026">
                <CheckCircle className="w-3 h-3" />
                يعمل
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-800">{branch.branch_name}</h3>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            {branch.type} &bull; {branch.governorate} ({branch.city_district})
          </p>
        </div>
        {distance !== undefined && (
          <div className="text-right">
            <span className="block text-xl font-black text-blue-600">
              {distance < 1 ? (distance * 1000).toFixed(0) + ' م' : distance.toFixed(1) + ' كم'}
            </span>
            <span className="text-xs text-slate-500">المسافة</span>
          </div>
        )}
      </div>
      
      <div className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-slate-700 text-sm">{branch.address}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-slate-400 shrink-0" />
          <p className="text-slate-700 text-sm" dir="ltr">{branch.working_hours}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-slate-400 shrink-0" />
          <a href={`tel:${branch.hotline_phone}`} className="text-slate-700 text-sm font-medium hover:text-blue-600" dir="ltr">
            {branch.hotline_phone}
          </a>
        </div>
      </div>
      
      <div className="bg-slate-50 p-4 flex items-center gap-3">
        <a 
          href={branch.google_maps_link || `https://www.google.com/maps/search/?api=1&query=${branch.coordinates?.lat},${branch.coordinates?.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-blue-600 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors border border-transparent text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          الخريطة
        </a>
        <button 
          onClick={handleCopyAddress}
          className="flex-1 bg-white border border-slate-300 text-slate-700 font-medium py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm"
        >
          <Copy className="w-4 h-4" />
          نسخ العنوان
        </button>
      </div>
    </div>
  );
}
