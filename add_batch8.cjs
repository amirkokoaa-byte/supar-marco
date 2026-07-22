const fs = require('fs');

const newBranches = [
  {
    "id": "SPI-HYP-004",
    "chain_id": "spinneys",
    "chain_name_ar": "سبينيس",
    "chain_name_en": "Spinneys",
    "branch_name": "جليم باي",
    "type": "Hyper",
    "governorate": "الإسكندرية",
    "city_district": "جليم",
    "address": "مجمع جليم باي، طريق الكورنيش، الإسكندرية",
    "working_hours": "09:00 AM - 12:00 AM",
    "hotline_phone": "16005",
    "coordinates": { "lat": 31.2425, "lng": 29.9551 },
    "is_active_2026": true
  },
  {
    "id": "SPI-HYP-005",
    "chain_id": "spinneys",
    "chain_name_ar": "سبينيس",
    "chain_name_en": "Spinneys",
    "branch_name": "سيتي سكيب مول",
    "type": "Hyper",
    "governorate": "الجيزة",
    "city_district": "6 أكتوبر",
    "address": "ميدان الحرية، داخل سيتي سكيب مول، 6 أكتوبر",
    "working_hours": "09:00 AM - 12:00 AM",
    "hotline_phone": "16005",
    "coordinates": { "lat": 29.9801, "lng": 30.9412 },
    "is_active_2026": true
  },
  {
    "id": "SPI-MAR-002",
    "chain_id": "spinneys",
    "chain_name_ar": "سبينيس",
    "chain_name_en": "Spinneys",
    "branch_name": "ميفيدا",
    "type": "Market",
    "governorate": "القاهرة",
    "city_district": "التجمع الخامس",
    "address": "داخل كمبوند ميفيدا، إعمار، القاهرة الجديدة",
    "working_hours": "09:00 AM - 11:00 PM",
    "hotline_phone": "16005",
    "coordinates": { "lat": 30.0054, "lng": 31.5015 },
    "is_active_2026": true
  },
  {
    "id": "MET-MAR-004",
    "chain_id": "metro_market",
    "chain_name_ar": "مترو ماركت",
    "chain_name_en": "Metro Market",
    "branch_name": "الزمالك",
    "type": "Market",
    "governorate": "القاهرة",
    "city_district": "الزمالك",
    "address": "شارع إسماعيل محمد، متفرع من شارع البرازيل، الزمالك",
    "working_hours": "08:00 AM - 12:00 AM",
    "hotline_phone": "19619",
    "coordinates": { "lat": 30.0622, "lng": 31.2185 },
    "is_active_2026": true
  },
  {
    "id": "MET-MAR-005",
    "chain_id": "metro_market",
    "chain_name_ar": "مترو ماركت",
    "chain_name_en": "Metro Market",
    "branch_name": "المهندسين - سوريا",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "المهندسين",
    "address": "شارع سوريا، تقاطع شارع شهاب، المهندسين",
    "working_hours": "08:00 AM - 12:00 AM",
    "hotline_phone": "19619",
    "coordinates": { "lat": 30.0521, "lng": 31.1963 },
    "is_active_2026": true
  },
  {
    "id": "MET-MAR-006",
    "chain_id": "metro_market",
    "chain_name_ar": "مترو ماركت",
    "chain_name_en": "Metro Market",
    "branch_name": "مساكن شيراتون",
    "type": "Market",
    "governorate": "القاهرة",
    "city_district": "مصر الجديدة",
    "address": "شارع سيد زكريا، مساكن شيراتون",
    "working_hours": "08:00 AM - 12:00 AM",
    "hotline_phone": "19619",
    "coordinates": { "lat": 30.1085, "lng": 31.3741 },
    "is_active_2026": true
  },
  {
    "id": "KHE-ZAM-004",
    "chain_id": "kheir_zaman",
    "chain_name_ar": "خير زمان",
    "chain_name_en": "Kheir Zaman",
    "branch_name": "مدينة نصر - مكرم عبيد",
    "type": "Market",
    "governorate": "القاهرة",
    "city_district": "مدينة نصر",
    "address": "شارع مكرم عبيد، بجوار السراج مول",
    "working_hours": "08:00 AM - 12:00 AM",
    "hotline_phone": "16113",
    "coordinates": { "lat": 30.0567, "lng": 31.3411 },
    "is_active_2026": true
  },
  {
    "id": "KHE-ZAM-005",
    "chain_id": "kheir_zaman",
    "chain_name_ar": "خير زمان",
    "chain_name_en": "Kheir Zaman",
    "branch_name": "مصر الجديدة - روكسي",
    "type": "Market",
    "governorate": "القاهرة",
    "city_district": "مصر الجديدة",
    "address": "شارع الخليفة المأمون، منطقة روكسي",
    "working_hours": "08:00 AM - 12:00 AM",
    "hotline_phone": "16113",
    "coordinates": { "lat": 30.0881, "lng": 31.3125 },
    "is_active_2026": true
  },
  {
    "id": "KHE-ZAM-006",
    "chain_id": "kheir_zaman",
    "chain_name_ar": "خير زمان",
    "chain_name_en": "Kheir Zaman",
    "branch_name": "الهرم - المطبعة",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "الهرم",
    "address": "شارع الهرم الرئيسي، محطة المطبعة",
    "working_hours": "08:00 AM - 12:00 AM",
    "hotline_phone": "16113",
    "coordinates": { "lat": 29.9954, "lng": 31.1485 },
    "is_active_2026": true
  },
  {
    "id": "FER-MAR-004",
    "chain_id": "fergani_market",
    "chain_name_ar": "الفرجاني ماركت",
    "chain_name_en": "El Fergani Market",
    "branch_name": "فيصل - الطالبية",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "فيصل",
    "address": "شارع الملك فيصل، محطة الطالبية",
    "working_hours": "24 Hours",
    "hotline_phone": "19054",
    "coordinates": { "lat": 30.0021, "lng": 31.1612 },
    "is_active_2026": true
  },
  {
    "id": "FER-MAR-005",
    "chain_id": "fergani_market",
    "chain_name_ar": "الفرجاني ماركت",
    "chain_name_en": "El Fergani Market",
    "branch_name": "إمبابة",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "إمبابة",
    "address": "شارع الوحدة، إمبابة",
    "working_hours": "24 Hours",
    "hotline_phone": "19054",
    "coordinates": { "lat": 30.0754, "lng": 31.2058 },
    "is_active_2026": true
  },
  {
    "id": "RAY-MAR-004",
    "chain_id": "raya_market",
    "chain_name_ar": "الراية ماركت",
    "chain_name_en": "Raya Market",
    "branch_name": "أكتوبر - الحصري",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "6 أكتوبر",
    "address": "ميدان الحصري، المحور المركزي، 6 أكتوبر",
    "working_hours": "24 Hours",
    "hotline_phone": "16572",
    "coordinates": { "lat": 29.9723, "lng": 30.9451 },
    "is_active_2026": true
  },
  {
    "id": "RAY-MAR-005",
    "chain_id": "raya_market",
    "chain_name_ar": "الراية ماركت",
    "chain_name_en": "Raya Market",
    "branch_name": "حدائق الأهرام - البوابة الرابعة",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "حدائق الأهرام",
    "address": "البوابة الرابعة (مينا)، شارع الجيش",
    "working_hours": "24 Hours",
    "hotline_phone": "16572",
    "coordinates": { "lat": 29.9652, "lng": 31.0851 },
    "is_active_2026": true
  },
  {
    "id": "OTH-MAR-005",
    "chain_id": "othaim_markets",
    "chain_name_ar": "العثيم ماركت",
    "chain_name_en": "Othaim Markets",
    "branch_name": "حلوان",
    "type": "Market",
    "governorate": "القاهرة",
    "city_district": "حلوان",
    "address": "شارع رايل، تقاطع شارع عبد الرحمن، حلوان",
    "working_hours": "08:00 AM - 01:00 AM",
    "hotline_phone": "16475",
    "coordinates": { "lat": 29.8451, "lng": 31.3285 },
    "is_active_2026": true
  },
  {
    "id": "OTH-MAR-006",
    "chain_id": "othaim_markets",
    "chain_name_ar": "العثيم ماركت",
    "chain_name_en": "Othaim Markets",
    "branch_name": "قليوب",
    "type": "Market",
    "governorate": "القليوبية",
    "city_district": "قليوب",
    "address": "شارع مجلس المدينة، قليوب البلد",
    "working_hours": "08:00 AM - 01:00 AM",
    "hotline_phone": "16475",
    "coordinates": { "lat": 30.1856, "lng": 31.2051 },
    "is_active_2026": true
  },
  {
    "id": "BEI-GOM-004",
    "chain_id": "beit_elgomla",
    "chain_name_ar": "بيت الجملة",
    "chain_name_en": "Beit El Gomla",
    "branch_name": "الزقازيق",
    "type": "Market",
    "governorate": "الشرقية",
    "city_district": "الزقازيق",
    "address": "شارع المحافظة، بجوار نادي الشرقية",
    "working_hours": "09:00 AM - 01:00 AM",
    "hotline_phone": "15551",
    "coordinates": { "lat": 30.5851, "lng": 31.5056 },
    "is_active_2026": true
  },
  {
    "id": "BEI-GOM-005",
    "chain_id": "beit_elgomla",
    "chain_name_ar": "بيت الجملة",
    "chain_name_en": "Beit El Gomla",
    "branch_name": "أكتوبر - الحي المتميز",
    "type": "Market",
    "governorate": "الجيزة",
    "city_district": "6 أكتوبر",
    "address": "سنتر الضياء، الحي المتميز، 6 أكتوبر",
    "working_hours": "09:00 AM - 01:00 AM",
    "hotline_phone": "15551",
    "coordinates": { "lat": 29.9881, "lng": 30.9542 },
    "is_active_2026": true
  }
];

const reverseTypeMap = {
  'Hyper': 'هايبر ماركت',
  'Market': 'سوبر ماركت',
  'Express': 'إكسبريس',
  'Cooperative': 'مجمع استهلاكي'
};

const processedNewBranches = newBranches.map(b => ({
  ...b,
  type: reverseTypeMap[b.type] || b.type,
  google_maps_link: `https://maps.google.com/?q=${b.coordinates.lat},${b.coordinates.lng}`
}));

const existingData = JSON.parse(fs.readFileSync('public/branches_data.json', 'utf-8'));
const allBranches = [...existingData, ...processedNewBranches];

fs.writeFileSync('public/branches_data.json', JSON.stringify(allBranches, null, 2));

const out = `import { Branch } from '../types';\n\nexport const branches: Branch[] = ${JSON.stringify(allBranches, null, 2)};\n`;
fs.writeFileSync('src/data/branches.ts', out);
console.log('Appended batch 8 successfully. Total:', allBranches.length);
