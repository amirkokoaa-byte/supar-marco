export type BranchType = 'هايبر ماركت' | 'سوبر ماركت' | 'إكسبريس' | 'مجمع استهلاكي';
export type Governorate = 
  | 'القاهرة' | 'الجيزة' | 'الإسكندرية' | 'القليوبية' | 'الشرقية' 
  | 'الدقهلية' | 'الغربية' | 'المنوفية' | 'البحيرة' | 'كفر الشيخ' 
  | 'دمياط' | 'بورسعيد' | 'الإسماعيلية' | 'السويس' | 'الفيوم' 
  | 'بني سويف' | 'المنيا' | 'أسيوط' | 'سوهاج' | 'قنا' | 'الأقصر' 
  | 'أسوان' | 'البحر الأحمر' | 'الوادي الجديد' | 'مطروح' | 'شمال سيناء' | 'جنوب سيناء';

export interface Chain {
  id: string;
  name_ar: string;
  name_en: string;
  logoUrl?: string;
  defaultHotline?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Branch {
  id: string;
  chain_id: string;
  chain_name_ar: string;
  chain_name_en: string;
  branch_name: string;
  type: BranchType;
  governorate: Governorate;
  city_district: string;
  address: string;
  working_hours: string;
  hotline_phone: string;
  coordinates: Coordinates;
  google_maps_link: string;
  is_active_2026: boolean;
}
