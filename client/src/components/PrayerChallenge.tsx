// import React from 'react';
// import { Timer, Award, Flame } from 'lucide-react';
// import { PrayerChallenge as PrayerChallengeType } from '../types';

// interface PrayerChallengeProps {
//   challenge: PrayerChallengeType;
//   onStartChallenge: () => void;
// }

// export function PrayerChallenge({ challenge, onStartChallenge }: PrayerChallengeProps) {
//   return (
//     <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6">
//       <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
//         <Timer className="text-yellow-500" />
//         Défi de prière quotidien
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="text-center">
//           <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
//             <Flame size={24} />
//             <span className="text-2xl font-bold">{challenge.currentStreak}</span>
//           </div>
//           <p className="text-gray-400">Jours consécutifs</p>
//         </div>

//         <div className="text-center">
//           <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
//             <Award size={24} />
//             <span className="text-2xl font-bold">{challenge.daysCompleted}</span>
//           </div>
//           <p className="text-gray-400">Jours complétés</p>
//         </div>

//         <div className="text-center">
//           <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
//             <Timer size={24} />
//             <span className="text-2xl font-bold">{challenge.totalMinutesPrayed}</span>
//           </div>
//           <p className="text-gray-400">Minutes de prière</p>
//         </div>
//       </div>

//       <div className="mt-6">
//         <button
//           onClick={onStartChallenge}
//           className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
//         >
//           <Timer size={20} />
//           Commencer 10 minutes de prière
//         </button>
//       </div>

//       <div className="mt-4 text-center text-sm text-gray-400">
//         Dernier jour de prière: {new Date(challenge.lastPrayerDate).toLocaleDateString('fr-FR')}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Timer, Flame, Users, Clock, Calendar } from 'lucide-react';
import { PrayerChallenge as PrayerChallengeType } from '../types';

interface PrayerChallengeProps {
  challenge: PrayerChallengeType;
  onStartChallenge: () => void;
  darkMode: boolean;
}

export function PrayerChallenge({ challenge, onStartChallenge, darkMode }: PrayerChallengeProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatLargeNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(600);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsActive(false);
          onStartChallenge();
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  };

  return (
    <div className={`rounded-lg p-6 ${
      darkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-800 shadow-lg'
    }`}>
      <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
        darkMode ? 'text-white' : 'text-white'
      }`}>
        <Timer className="text-yellow-500" />
        Défi de prière quotidien
      </h2>

      {/* Global Stats */}
      {challenge.globalStats && (
        <div className="mb-8">
          <h3 className={`text-lg font-medium mb-4 ${
            darkMode ? 'text-gray-300' : 'text-white'
          }`}>
            Statistiques globales
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                <Users size={24} />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(challenge.globalStats.totalParticipants)}
                </span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-white'}>
                Participants
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                <Clock size={24} />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(challenge.globalStats.totalMinutesPrayed)}
                </span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-white'}>
                Minutes totales de prière
              </p>
            </div>

            <div className="text-center">
              {/* <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                <Calendar size={24} />
                <span className="text-2xl font-bold">
                  {formatLargeNumber(challenge.globalStats.totalDaysCompleted)}
                </span>
              </div> */}
              {/* <p className={darkMode ? 'text-gray-400' : 'text-white'}>
                Jours de prière complétés
              </p> */}
            </div>

            {/* <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                <Flame size={24} />
                <span className="text-2xl font-bold">
                  {challenge.globalStats.averageStreak.toFixed(1)}
                </span>
              </div>
              <p className={darkMode ? 'text-gray-400' : 'text-white'}>
                Moyenne des séries
              </p>
            </div> */}
          </div>
        </div>
      )}

      {/* Timer and Start Button */}
      <div className="mt-6">
        {isActive ? (
          <div className="text-center">
            <div className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-white'
            }`}>
              {formatTime(timeLeft)}
            </div>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-white'}`}>
              Merci pour votre temps et votre prière...
            </p>
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Timer size={20} />
            <span>Commencer 10 minutes de prière</span>
          </button>
        )}
      </div>

      {/* <div className={`mt-4 text-center text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        Dernier jour de prière: {challenge.lastPrayerDate ? new Date(challenge.lastPrayerDate).toLocaleDateString('fr-FR') : 'Aucune date disponible'}
      </div> */}
    </div>
  );
}