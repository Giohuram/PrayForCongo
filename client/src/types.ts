export interface Prayer {
  _id: string; // MongoDB uses _id instead of id
  message: string;
  category: 'peace' | 'victims' | 'leaders' | 'children' | 'church' | 'education' | 'humanitarian';
  language: Language;
  amens: number;
  timestamp: number;
  featured?: boolean;
  translations?: Record<Language, string>;
  location?: {
    lat: number;
    lng: number;
    region: string;
  };
}

export interface Quote {
  text: string;
  author: string;
  language: string;
}

export type Language = 'fr' | 'ln' | 'sw' | 'kg' | 'lu' | 'en';

export const languageNames = {
  fr: 'Français',
  ln: 'Lingala',
  sw: 'Swahili',
  kg: 'Kikongo',
  lu: 'Tshiluba',
  en: 'English',
};

export interface PrayerStats {
  totalPrayers: number;
  totalAmens: number;
  prayersByCategory: Record<string, number>;
  prayersByLanguage: Record<string, number>;
}

export interface GlobalChallengeStats {
  totalParticipants: number;
  totalMinutesPrayed: number;
  totalDaysCompleted: number;
  averageStreak: number;
}

export interface PrayerChallenge {
  sessionId: string;
  daysCompleted: number;
  currentStreak: number;
  lastPrayerDate: string;
  totalMinutesPrayed: number;
  globalStats?: GlobalChallengeStats;
}