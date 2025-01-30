import React, { useEffect, useRef } from 'react';
import { Prayer } from '../types';
import { Map } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface PrayerMapProps {
  prayers: Prayer[];
}

export function PrayerMap({ prayers }: PrayerMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([-4.0383, 21.7587], 5);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMap.current);
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (leafletMap.current) {
      // Clear existing markers
      leafletMap.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.remove();
        }
      });

      // Add markers for prayers with locations
      prayers
        .filter(prayer => prayer.location)
        .forEach(prayer => {
          if (prayer.location && leafletMap.current) {
            const marker = L.marker([prayer.location.lat, prayer.location.lng])
              .addTo(leafletMap.current)
              .bindPopup(`
                <div class="p-2">
                  <p class="font-medium">${prayer.location.region}</p>
                  <p class="text-sm mt-1">${prayer.message}</p>
                  <p class="text-xs text-gray-500 mt-1">🙏 ${prayer.amens} Amens</p>
                </div>
              `);
          }
        });
    }
  }, [prayers]);

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <Map className="text-yellow-500" />
        Carte des prières
      </h2>
      <div ref={mapRef} className="h-[400px] rounded-lg overflow-hidden" />
    </div>
  );
}