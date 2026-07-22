import React, { useState } from 'react';
import { Branch } from '../types';
import { X, Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteTitle: string;
  setSiteTitle: (title: string) => void;
  siteSubtitle: string;
  setSiteSubtitle: (subtitle: string) => void;
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
}

export function SettingsModal({
  isOpen, onClose, siteTitle, setSiteTitle, siteSubtitle, setSiteSubtitle, branches, setBranches
}: SettingsModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [chainFilter, setChainFilter] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '0000') {
      setIsAuthenticated(true);
      setPasswordInput('');
    } else {
      alert('كلمة المرور خاطئة!');
    }
  };

  const handleSaveBranchEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranch) {
      setBranches(branches.map(b => b.id === editingBranch.id ? editingBranch : b));
      setEditingBranch(null);
      alert('تم تعديل بيانات الفرع بنجاح!');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setEditingBranch(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm" dir="rtl">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-red-500 font-bold p-2 transition-colors rounded-lg hover:bg-red-50"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="p-6 md:p-8">
          {!isAuthenticated ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Settings className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-6 text-slate-800">تسجيل الدخول للإعدادات</h2>
              <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto">
                <input 
                  type="password" 
                  placeholder="أدخل كلمة المرور..." 
                  className="p-3 border border-slate-300 rounded-lg text-center text-xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm">
                  دخول
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                <Settings className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-800">لوحة تحكم الموقع</h2>
              </div>
              
              {/* Site Identity Settings */}
              <div className="mb-8 bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="font-bold text-lg mb-4 text-slate-800">إعدادات الموقع</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">اسم الموقع (Title):</label>
                    <input 
                      type="text" 
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">الوصف الفرعي (Subtitle):</label>
                    <input 
                      type="text" 
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      value={siteSubtitle}
                      onChange={(e) => setSiteSubtitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Branch Management */}
              {!editingBranch ? (
                <div>
                  <h3 className="font-bold text-lg mb-4 text-slate-800">إدارة الفروع:</h3>
                  <div className="mb-4">
                    <label className="block text-slate-700 font-semibold mb-2">تصفية بالسلسلة:</label>
                    <select 
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      onChange={(e) => {
                        // We will need a state for the selected chain filter
                        setChainFilter(e.target.value);
                      }}
                      value={chainFilter}
                    >
                      <option value="">كل السلاسل</option>
                      {Array.from(new Set(branches.map(b => b.chain_name_ar))).map(chain => (
                        <option key={chain} value={chain}>{chain}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-4 border border-slate-200 rounded-xl bg-slate-50">
                    {branches.filter(b => chainFilter ? b.chain_name_ar === chainFilter : true).map(b => (
                      <div key={b.id} className="flex justify-between items-center p-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors">
                        <div className="flex flex-col overflow-hidden mr-2">
                          <span className="text-sm font-bold text-slate-800 truncate">{b.chain_name_ar}</span>
                          <span className="text-xs text-slate-500 truncate">{b.branch_name}</span>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button 
                            onClick={() => setEditingBranch(b)}
                            className="bg-amber-100 text-amber-700 px-3 py-1.5 text-sm font-semibold rounded-md hover:bg-amber-200 transition-colors"
                          >
                            تعديل
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('هل أنت متأكد من حذف هذا الفرع؟')) {
                                setBranches(branches.filter(branch => branch.id !== b.id));
                              }
                            }}
                            className="bg-red-100 text-red-700 px-3 py-1.5 text-sm font-semibold rounded-md hover:bg-red-200 transition-colors"
                          >
                            حذف
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center mb-6 pb-3 border-b border-blue-200">
                    <h3 className="font-bold text-lg text-blue-800">
                      تعديل: {editingBranch.chain_name_ar} - {editingBranch.branch_name}
                    </h3>
                    <button 
                      onClick={() => setEditingBranch(null)} 
                      className="text-slate-500 hover:text-red-500 text-sm font-medium transition-colors bg-white px-3 py-1.5 rounded-md border border-slate-200"
                    >
                      رجوع للقائمة
                    </button>
                  </div>
                  
                  <form onSubmit={handleSaveBranchEdit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">اسم الفرع</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={editingBranch.branch_name} onChange={e => setEditingBranch({...editingBranch, branch_name: e.target.value})} required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">المحافظة</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={editingBranch.governorate} onChange={e => setEditingBranch({...editingBranch, governorate: e.target.value})} required />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">العنوان التفصيلي</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={editingBranch.address} onChange={e => setEditingBranch({...editingBranch, address: e.target.value})} required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">ساعات العمل</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-left" value={editingBranch.working_hours} onChange={e => setEditingBranch({...editingBranch, working_hours: e.target.value})} required dir="ltr"/>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">رقم الهاتف / الخط الساخن</label>
                      <input type="text" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-left" value={editingBranch.hotline_phone} onChange={e => setEditingBranch({...editingBranch, hotline_phone: e.target.value})} required dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">خط العرض (Latitude)</label>
                      <input type="number" step="any" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-left" value={editingBranch.coordinates.lat} onChange={e => setEditingBranch({...editingBranch, coordinates: {...editingBranch.coordinates, lat: parseFloat(e.target.value)}})} required dir="ltr" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">خط الطول (Longitude)</label>
                      <input type="number" step="any" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-left" value={editingBranch.coordinates.lng} onChange={e => setEditingBranch({...editingBranch, coordinates: {...editingBranch.coordinates, lng: parseFloat(e.target.value)}})} required dir="ltr" />
                    </div>
                    <div className="md:col-span-2 mt-2">
                      <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm">
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
