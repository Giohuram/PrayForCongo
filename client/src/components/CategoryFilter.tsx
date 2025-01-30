import React from 'react';
import { Filter, Heart, Move as Dove, Users, Baby, Church, Book, HandHeart, LandPlotIcon, CurrencyIcon, Currency, UsersIcon, UserCheck2Icon } from 'lucide-react';

interface CategoryFilterProps {
  currentCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ currentCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    { value: 'peace', label: 'Paix', icon: Dove },
    { value: 'victims', label: 'Victimes de guerre', icon: Heart },
    { value: 'leaders', label: 'Dirigeants', icon: Users },
    { value: 'économie', label: 'Économie', icon: Currency },
    { value: 'Country', label: 'L\'intégrité térritoriale', icon: LandPlotIcon },
    { value: 'People', label: 'Peuple Congolais', icon: UsersIcon },
    { value: 'Army', label: 'L\'armée', icon: UserCheck2Icon },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Filter size={18} className="text-yellow-500 flex-shrink-0" />
        <h2 className="text-white font-medium">Catégories de prière</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex items-center justify-center gap-2 p-3 rounded-lg text-sm transition-all transform hover:scale-105 ${
            currentCategory === null
              ? 'bg-yellow-500 text-black'
              : 'bg-gray-800 bg-opacity-50 text-gray-400 hover:text-yellow-500'
          }`}
        >
          <Filter size={16} />
          <span>Tout</span>
        </button>
        
        {categories.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onCategoryChange(value)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg text-sm transition-all transform hover:scale-105 ${
              currentCategory === value
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 bg-opacity-50 text-gray-400 hover:text-yellow-500'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}