import React from 'react';
import { BarChart3, Users, Heart, PieChart } from 'lucide-react';
import { PrayerStats as PrayerStatsType } from '../types';

interface PrayerStatsProps {
  stats: PrayerStatsType;
}

export function PrayerStats({ stats }: PrayerStatsProps) {
  const maxValue = Math.max(...Object.values(stats.prayersByCategory));
  const maxLanguageValue = Math.max(...Object.values(stats.prayersByLanguage));

  return (
    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 md:p-6">
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="text-yellow-500" />
        Statistiques des prières
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
            <Users size={24} />
            <span className="text-2xl font-bold">{stats.totalPrayers}</span>
          </div>
          <p className="text-gray-400 text-sm">Prières partagées</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
            <Heart size={24} />
            <span className="text-2xl font-bold">{stats.totalAmens}</span>
          </div>
          <p className="text-gray-400 text-sm">Amens reçus</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
            <PieChart size={24} />
            <span className="text-2xl font-bold">
              {Object.keys(stats.prayersByLanguage).length}
            </span>
          </div>
          <p className="text-gray-400 text-sm">Langues utilisées</p>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white font-medium mb-3 text-sm">Par catégorie</h3>
          <div className="space-y-3">
            {Object.entries(stats.prayersByCategory).map(([category, count]) => (
              <div key={category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{category}</span>
                  <span className="text-yellow-500">{count}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-white font-medium mb-3 text-sm">Par langue</h3>
          <div className="space-y-3">
            {Object.entries(stats.prayersByLanguage).map(([lang, count]) => (
              <div key={lang} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{lang}</span>
                  <span className="text-yellow-500">{count}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${(count / maxLanguageValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}