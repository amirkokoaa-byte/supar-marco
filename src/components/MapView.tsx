import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Branch } from '../types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ExternalLink } from 'lucide-react';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  branches: Branch[];
  userLocation?: { lat: number; lng: number } | null;
}

// Component to re-center map when branches change or user location is found
function MapController({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function MapView({ branches, userLocation }: MapViewProps) {
  const defaultCenter: [number, number] = [30.0444, 31.2357]; // Cairo center
  
  // Calculate center based on first branch or user location
  let center = defaultCenter;
  let zoom = 11;

  if (userLocation) {
    center = [userLocation.lat, userLocation.lng];
    zoom = 13;
  } else if (branches.length > 0) {
    center = [branches[0].coordinates.lat, branches[0].coordinates.lng];
  }

  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 shadow-sm z-0 relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={center} zoom={zoom} />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
             <Popup>
               <div className="text-center font-bold font-sans">موقعك الحالي</div>
             </Popup>
          </Marker>
        )}

        {branches.map((branch) => (
          <Marker 
            key={branch.id} 
            position={[branch.coordinates.lat, branch.coordinates.lng]}
          >
            <Popup className="font-sans" dir="rtl">
              <div className="p-1 min-w-[200px]">
                <div className="font-bold text-base mb-1 text-slate-800">{branch.branch_name}</div>
                <div className="text-sm text-blue-600 mb-2">{branch.chain_name_ar}</div>
                <p className="text-xs text-slate-600 mb-3">{branch.address}</p>
                <a 
                  href={branch.google_maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white text-xs font-medium py-1.5 px-3 rounded-md flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  الاتجاهات
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
