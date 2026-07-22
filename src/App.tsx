import React, { useState, useMemo } from 'react';
import { branches } from './data/branches';
import { BranchCard } from './components/BranchCard';
import { Filters } from './components/Filters';
import { MapView } from './components/MapView';
import { SettingsModal } from './components/SettingsModal';
import { ExportExcelModal } from './components/ExportExcelModal';
import { BranchType, Governorate } from './types';
import { calculateDistance } from './lib/utils';
import { Search, Map as MapIcon, Grid, MapPin, SlidersHorizontal, Loader2, Printer, Download, Settings, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const [siteTitle, setSiteTitle] = useState('دليل السوبر ماركت 2026');
  const [siteSubtitle, setSiteSubtitle] = useState('الدليل الشامل الأحدث لجميع فروع الهايبر ماركت في مصر');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExportExcelOpen, setIsExportExcelOpen] = useState(false);
  const [allBranches, setAllBranches] = useState(branches);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [selectedGovs, setSelectedGovs] = useState<Governorate[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<BranchType[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Get user location for nearest branch
  const handleGetLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("تعذر الحصول على موقعك. يرجى التأكد من تفعيل خدمات الموقع.");
          setIsLocating(false);
        }
      );
    } else {
      alert("متصفحك لا يدعم تحديد الموقع.");
      setIsLocating(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredBranches, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "branches_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Filter and sort branches
  const filteredBranches = useMemo(() => {
    return allBranches.filter(branch => {
      const matchesSearch = 
        branch.branch_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city_district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.chain_name_ar.includes(searchQuery);

      const matchesChain = selectedChains.length === 0 || selectedChains.includes(branch.chain_id);
      const matchesGov = selectedGovs.length === 0 || selectedGovs.includes(branch.governorate);
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(branch.type);

      return matchesSearch && matchesChain && matchesGov && matchesType;
    }).map(branch => {
      // Calculate distance if user location is available
      if (userLocation) {
        return {
          ...branch,
          distance: calculateDistance(
            userLocation.lat, 
            userLocation.lng, 
            branch.coordinates.lat, 
            branch.coordinates.lng
          )
        };
      }
      return branch;
    }).sort((a, b) => {
      // Sort by distance if available
      if (a.distance !== undefined && b.distance !== undefined) {
        return a.distance - b.distance;
      }
      return 0;
    });
  }, [searchQuery, selectedChains, selectedGovs, selectedTypes, userLocation]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-800">{siteTitle.split(' ').map((word, i, arr) => i === arr.length - 1 ? <span key={i} className="text-blue-600">{word}</span> : word + ' ')}</h1>
              <p className="text-sm text-slate-500 mt-1">{siteSubtitle}</p>
            </div>
            
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text"
                  placeholder="ابحث باسم الفرع، الحي، أو الشارع..."
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-100 border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsExportExcelOpen(true)}
                className="flex items-center gap-2 px-3 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-medium transition-colors text-sm border border-emerald-200"
                title="تصدير إكسيل"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span className="hidden sm:inline">إكسيل</span>
              </button>
              <button 
                onClick={handleExportJSON}
                className="flex items-center gap-2 px-3 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium transition-colors text-sm border border-blue-200"
                title="تصدير JSON"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">تصدير</span>
              </button>
              <button 
                onClick={() => window.print()}
                className="hidden lg:flex items-center gap-2 px-3 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-medium transition-colors text-sm border border-slate-200"
                title="طباعة"
              >
                <Printer className="w-4 h-4" />
                طباعة
              </button>
              <button 
                onClick={handleGetLocation}
                disabled={isLocating}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-medium transition-colors text-sm border border-emerald-200"
              >
                {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                أقرب فرع
              </button>
              
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-2 p-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                title="الإعدادات"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button 
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="md:hidden p-2.5 bg-slate-100 text-slate-700 rounded-lg"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 lg:w-72 shrink-0 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28">
            <Filters 
              selectedChains={selectedChains}
              setSelectedChains={setSelectedChains}
              selectedGovs={selectedGovs}
              setSelectedGovs={setSelectedGovs}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
            />
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1 min-w-0 flex flex-col">
          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              النتائج ({filteredBranches.length})
            </h2>
            
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Grid className="w-4 h-4" /> القائمة
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <MapIcon className="w-4 h-4" /> الخريطة
              </button>
            </div>
          </div>

          {/* Results */}
          {filteredBranches.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد نتائج</h3>
              <p className="text-slate-500">حاول تعديل خيارات البحث أو الفلترة لعرض نتائج أكثر.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedChains([]);
                  setSelectedGovs([]);
                  setSelectedTypes([]);
                }}
                className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
              >
                مسح الفلاتر
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredBranches.map(branch => (
                <div key={branch.id}><BranchCard branch={branch} distance={branch.distance} /></div>
              ))}
            </div>
          ) : (
            <div className="flex-1 min-h-[600px]">
              <MapView branches={filteredBranches} userLocation={userLocation} />
            </div>
          )}
        </section>

      </main>

      {/* Floating Side Button for Excel Export */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={() => setIsExportExcelOpen(true)}
          className="bg-emerald-600 text-white p-3 rounded-r-xl shadow-lg hover:bg-emerald-700 transition-colors flex items-center justify-center border border-l-0 border-emerald-500 hover:w-32 group relative"
          title="تصدير ملف إكسيل"
        >
          <FileSpreadsheet className="w-6 h-6" />
          <span className="hidden group-hover:inline-block mr-2 font-bold whitespace-nowrap overflow-hidden transition-all duration-300">
            تصدير إكسيل
          </span>
        </button>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        siteTitle={siteTitle}
        setSiteTitle={setSiteTitle}
        siteSubtitle={siteSubtitle}
        setSiteSubtitle={setSiteSubtitle}
        branches={allBranches}
        setBranches={setAllBranches}
      />
      
      <ExportExcelModal
        isOpen={isExportExcelOpen}
        onClose={() => setIsExportExcelOpen(false)}
        branches={allBranches}
      />
    </div>
  );
}
