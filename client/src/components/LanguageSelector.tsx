import React from 'react';
import { Globe2 } from 'lucide-react';
import { Language, languageNames } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe2 size={18} className="text-yellow-500" />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-opacity-10 bg-white border border-gray-700 rounded-lg px-3 py-1 text-white text-sm focus:ring-2 focus:ring-yellow-500"
      >
        {Object.entries(languageNames).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}