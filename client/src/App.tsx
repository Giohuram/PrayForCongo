// import React, { useState, useEffect } from 'react';
// import { Prayer, Language, Quote, PrayerStats, PrayerChallenge as PrayerChallengeType } from './types';
// import { PrayerForm } from './components/PrayerForm';
// import { PrayerWall } from './components/PrayerWall';
// import { LanguageSelector } from './components/LanguageSelector';
// import { CategoryFilter } from './components/CategoryFilter';
// import { QuoteDisplay } from './components/QuoteDisplay';
// import { PrayerStats as PrayerStatsComponent } from './components/PrayerStats';
// import { PrayerMap } from './components/PrayerMap';
// import { PrayerChallenge } from './components/PrayerChallenge';
// import { Notifications } from './components/Notifications';
// import { Flame, Moon, Sun } from 'lucide-react';
// import { nanoid } from 'nanoid';

// const quotes: Quote[] = [
//   {
//     text: "Si mon peuple sur qui est invoqué mon nom s'humilie, prie, cherche ma face, et se détourne de ses mauvaises voies, je l'exaucerai des cieux, je lui pardonnerai son péché, et je guérirai son pays.",
//     author: "2 Chroniques 7:14",
//     language: "fr"
//   },
//   {
//     text: "Invoque-moi, et je te répondrai ; je te ferai connaître de grandes choses, des choses cachées, que tu ne sais pas.",
//     author: "Jérémie 33:3",
//     language: "fr"
//   },
//   {
//     text: "Ne crains rien, petit peuple du Congo, restes de la nation ! Je viens à ton secours, dit l'Éternel, le Saint d'Israël est ton Rédempteur.",
//     author: "Esaïe 41:14",
//     language: "fr"
//   }
// ];

// export interface PrayerChallenge {
//   daysCompleted: number;
//   currentStreak: number;
//   lastPrayerDate: string;
//   totalMinutesPrayed: number;
//   sessionId: string;
// }

// function App() {
//   const [darkMode, setDarkMode] = useState(true);
//   const [language, setLanguage] = useState<Language>('fr');
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
//   const [notificationsEnabled, setNotificationsEnabled] = useState(false);
//   const [prayers, setPrayers] = useState<Prayer[]>([]);
//   const [stats, setStats] = useState<PrayerStats>({
//     totalPrayers: 0,
//     totalAmens: 0,
//     prayersByCategory: {},
//     prayersByLanguage: {},
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasNextPage, setHasNextPage] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Initialize challenge state with sessionId from localStorage or create new one
//   const [challenge, setChallenge] = useState<PrayerChallenge>(() => {
//     const savedChallenge = localStorage.getItem('prayerChallenge');
//     const sessionId = localStorage.getItem('sessionId') || nanoid();
    
//     if (!localStorage.getItem('sessionId')) {
//       localStorage.setItem('sessionId', sessionId);
//     }

//     if (savedChallenge) {
//       const parsed = JSON.parse(savedChallenge);
//       return {
//         ...parsed,
//         sessionId // Ensure sessionId is always present
//       };
//     }
    
//     return {
//       daysCompleted: 0,
//       currentStreak: 0,
//       lastPrayerDate: '',
//       totalMinutesPrayed: 0,
//       sessionId
//     };
//   });

//   useEffect(() => {
//     fetchPrayers();
//     fetchStats();
//   }, [selectedCategory, language, currentPage]);

//   const fetchPrayers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params = new URLSearchParams();
//       if (selectedCategory) params.append('category', selectedCategory);
//       params.append('language', language);
//       params.append('page', currentPage.toString());
//       params.append('limit', '10');

//       const response = await fetch(`/api/prayers?${params}`);
//       if (!response.ok) throw new Error('Failed to fetch prayers');
//       const data = await response.json();
      
//       if (currentPage === 1) {
//         setPrayers(data.prayers);
//       } else {
//         setPrayers(prev => [...prev, ...data.prayers]);
//       }
      
//       setTotalPages(data.pagination.totalPages);
//       setHasNextPage(data.pagination.hasNextPage);
//     } catch (error) {
//       console.error('Error fetching prayers:', error);
//       setError('Failed to load prayers. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await fetch('/api/prayers/stats');
//       if (!response.ok) throw new Error('Failed to fetch stats');
//       const data = await response.json();
//       setStats(data);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
//       setCurrentQuote(randomQuote);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handlePrayerSubmit = async ({ message, category }: { message: string; category: string }) => {
//     try {
//       const response = await fetch('/api/prayers', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message,
//           category,
//           language,
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to submit prayer');
//       const newPrayer = await response.json();
//       setPrayers([newPrayer, ...prayers]);
//       fetchStats();

//       if (notificationsEnabled) {
//         new Notification('Nouvelle prière partagée', {
//           body: message,
//           icon: '/prayer-icon.png'
//         });
//       }
//     } catch (error) {
//       console.error('Error submitting prayer:', error);
//     }
//   };

//   const handleAmen = async (id: string) => {
//     try {
//       if (!id) {
//         console.error('Prayer ID is undefined');
//         return;
//       }

//       const response = await fetch(`/api/prayers/${id}/amen`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) throw new Error('Failed to add amen');
//       const updatedPrayer = await response.json();
//       setPrayers(prayers.map(prayer => 
//         prayer._id === id ? updatedPrayer : prayer
//       ));
//       fetchStats();
//     } catch (error) {
//       console.error('Error adding amen:', error);
//       setError('Failed to add amen. Please try again later.');
//     }
//   };
  
//   const handleLoadMore = () => {
//     if (!loading && hasNextPage) {
//       setCurrentPage(prev => prev + 1);
//     }
//   };

//   const startPrayerChallenge = () => {
//     const timer = setTimeout(() => {
//       setChallenge(prev => ({
//         ...prev,
//         daysCompleted: prev.daysCompleted + 1,
//         currentStreak: prev.currentStreak + 1,
//         lastPrayerDate: new Date().toISOString(),
//         totalMinutesPrayed: prev.totalMinutesPrayed + 10
//       }));
  
//       if (notificationsEnabled) {
//         new Notification('Défi de prière complété! 🎉', {
//           body: 'Merci d\'avoir prié pour la RDC aujourd\'hui.',
//           icon: '/prayer-icon.png'
//         });
//       }
//     }, 600000); // 10 minutes
  
//     return () => clearTimeout(timer);
//   };
  
//   const handleChallengeComplete = () => {
//     startPrayerChallenge();
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-black'} transition-colors`}>
//       <div className="container mx-auto px-4 py-8">
//         <header className="text-center mb-12">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               <LanguageSelector
//                 currentLanguage={language}
//                 onLanguageChange={setLanguage}
//               />
//               <Notifications
//                 enabled={notificationsEnabled}
//                 onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
//               />
//             </div>
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-full hover:bg-gray-800 transition-colors"
//             >
//               {darkMode ? (
//                 <Sun className="text-yellow-500" size={24} />
//               ) : (
//                 <Moon className="text-gray-600" size={24} />
//               )}
//             </button>
//           </div>
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Flame className="text-yellow-500" size={32} />
//             <h1 className="text-4xl font-bold text-white">Pray For Congo</h1>
//           </div>
//           <p className="text-gray-400 max-w-2xl mx-auto mb-6">
//             Unissons-nous dans la prière pour la paix et la restauration en République Démocratique du Congo.
//             Votre voix compte, votre prière fait la différence.
//           </p>
//           <QuoteDisplay quote={currentQuote} />
//         </header>

//         <main className="space-y-12">
//           <PrayerForm onSubmit={handlePrayerSubmit} />
//           <PrayerChallenge
//             challenge={challenge}
//             onStartChallenge={handleChallengeComplete}
//             darkMode={darkMode}
//           />
//           <PrayerMap prayers={prayers} />
//           <PrayerStatsComponent stats={stats} />
//           <CategoryFilter
//             currentCategory={selectedCategory}
//             onCategoryChange={(category) => {
//               setSelectedCategory(category);
//               setCurrentPage(1);
//             }}
//           />
//           {error ? (
//             <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
//               {error}
//             </div>
//           ) : (
//             <PrayerWall
//               prayers={prayers}
//               onAmen={handleAmen}
//               currentLanguage={language}
//               onLoadMore={handleLoadMore}
//               loading={loading}
//               hasNextPage={hasNextPage}
//               currentPage={currentPage}
//               totalPages={totalPages}
//             />
//           )}
//         </main>
//         <footer className="mt-16 text-center text-gray-400 text-sm space-y-2">
//           <p className="text-yellow-500 font-medium">
//             🕊️ Rejoignez le défi de prière de 10 minutes par jour
//           </p>
//           <p>
//             Ensemble, nous pouvons faire la différence pour la RDC
//           </p>
//           <p>© 2025 Pray For Congo. Créé par Huram Abi.</p>
//         </footer>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { Prayer, Language, Quote, PrayerStats, PrayerChallenge as PrayerChallengeType } from './types';
import { PrayerForm } from './components/PrayerForm';
import { PrayerWall } from './components/PrayerWall';
import { LanguageSelector } from './components/LanguageSelector';
import { CategoryFilter } from './components/CategoryFilter';
import { QuoteDisplay } from './components/QuoteDisplay';
import { PrayerStats as PrayerStatsComponent } from './components/PrayerStats';
import { PrayerMap } from './components/PrayerMap';
import { PrayerChallenge } from './components/PrayerChallenge';
import { Notifications } from './components/Notifications';
import { Flame, Moon, Sun } from 'lucide-react';
import { nanoid } from 'nanoid';

const quotes: Quote[] = [
  {
    text: "Si mon peuple sur qui est invoqué mon nom s'humilie, prie, cherche ma face, et se détourne de ses mauvaises voies, je l'exaucerai des cieux, je lui pardonnerai son péché, et je guérirai son pays.",
    author: "2 Chroniques 7:14",
    language: "fr"
  },
  {
    text: "Invoque-moi, et je te répondrai ; je te ferai connaître de grandes choses, des choses cachées, que tu ne sais pas.",
    author: "Jérémie 33:3",
    language: "fr"
  }
];

export interface PrayerChallenge {
  daysCompleted: number;
  currentStreak: number;
  lastPrayerDate: string;
  totalMinutesPrayed: number;
  sessionId: string;
  globalStats?: {
    totalParticipants: number;
    totalMinutesPrayed: number;
    totalDaysCompleted: number;
    averageStreak: number;
  };
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState<Language>('fr');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState<Quote>(quotes[0]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [stats, setStats] = useState<PrayerStats>({
    totalPrayers: 0,
    totalAmens: 0,
    prayersByCategory: {},
    prayersByLanguage: {},
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [globalStats, setGlobalStats] = useState({
    totalParticipants: 0,
    totalMinutesPrayed: 0,
    totalDaysCompleted: 0,
    averageStreak: 0,
  });

  const [challenge, setChallenge] = useState<PrayerChallenge>(() => {
    const savedChallenge = localStorage.getItem('prayerChallenge');
    const sessionId = localStorage.getItem('sessionId') || nanoid();
    
    if (!localStorage.getItem('sessionId')) {
      localStorage.setItem('sessionId', sessionId);
    }

    if (savedChallenge) {
      const parsed = JSON.parse(savedChallenge);
      return {
        ...parsed,
        sessionId // Ensure sessionId is always present
      };
    }
    
    return {
      daysCompleted: 0,
      currentStreak: 0,
      lastPrayerDate: '',
      totalMinutesPrayed: 0,
      sessionId
    };
  });

  useEffect(() => {
    fetchPrayers();
    fetchStats();
  }, [selectedCategory, language, currentPage]);

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      params.append('language', language);
      params.append('page', currentPage.toString());
      params.append('limit', '10');

      const response = await fetch(`/api/prayers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch prayers');
      const data = await response.json();
      
      if (currentPage === 1) {
        setPrayers(data.prayers);
      } else {
        setPrayers(prev => [...prev, ...data.prayers]);
      }
      
      setTotalPages(data.pagination.totalPages);
      setHasNextPage(data.pagination.hasNextPage);
    } catch (error) {
      console.error('Error fetching prayers:', error);
      setError('Failed to load prayers. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/prayers/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handlePrayerSubmit = async ({ message, category }: { message: string; category: string }) => {
    try {
      const response = await fetch('/api/prayers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          category,
          language,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit prayer');
      const newPrayer = await response.json();
      setPrayers([newPrayer, ...prayers]);
      fetchStats();

      if (notificationsEnabled) {
        new Notification('Nouvelle prière partagée', {
          body: message,
          icon: '/prayer-icon.png'
        });
      }
    } catch (error) {
      console.error('Error submitting prayer:', error);
    }
  };

  const handleAmen = async (id: string) => {
    try {
      if (!id) {
        console.error('Prayer ID is undefined');
        return;
      }

      const response = await fetch(`/api/prayers/${id}/amen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to add amen');
      const updatedPrayer = await response.json();
      setPrayers(prayers.map(prayer => 
        prayer._id === id ? updatedPrayer : prayer
      ));
      fetchStats();
    } catch (error) {
      console.error('Error adding amen:', error);
      setError('Failed to add amen. Please try again later.');
    }
  };
  
  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // const handleChallengeComplete = async () => {
  //   try {
  //     const response = await fetch('/api/complete', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sessionId: challenge.sessionId,
  //       }),
  //     });

  //     if (!response.ok) throw new Error('Failed to complete challenge');

  //     const data = await response.json();

  //     setChallenge({
  //       ...challenge,
  //       daysCompleted: data.challenge.daysCompleted,
  //       currentStreak: data.challenge.currentStreak,
  //       lastPrayerDate: data.challenge.lastPrayerDate,
  //       totalMinutesPrayed: data.challenge.totalMinutesPrayed,
  //     });

  //     setGlobalStats(data.globalStats);

  //     if (notificationsEnabled) {
  //       new Notification('Défi de prière complété! 🎉', {
  //         body: 'Merci d\'avoir prié pour la RDC aujourd\'hui.',
  //         icon: '/prayer-icon.png',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error completing challenge:', error);
  //   }
  // };

  const handleChallengeComplete = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/challenges/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: challenge.sessionId,
        }),
      });
  
      if (!response.ok) throw new Error('Failed to complete challenge');
  
      const data = await response.json();
  
      setChallenge({
        ...challenge,
        daysCompleted: data.challenge.daysCompleted,
        currentStreak: data.challenge.currentStreak,
        lastPrayerDate: data.challenge.lastPrayerDate,
        totalMinutesPrayed: data.challenge.totalMinutesPrayed,
      });
  
      setGlobalStats(data.globalStats);
  
      if (notificationsEnabled) {
        new Notification('Défi de prière complété! 🎉', {
          body: 'Merci d\'avoir prié pour la RDC aujourd\'hui.',
          icon: '/prayer-icon.png',
        });
      }
    } catch (error) {
      console.error('Error completing challenge:', error);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-black'} transition-colors`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <LanguageSelector
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <Notifications
                enabled={notificationsEnabled}
                onToggleNotifications={() => setNotificationsEnabled(!notificationsEnabled)}
              />
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="text-yellow-500" size={24} />
              ) : (
                <Moon className="text-gray-600" size={24} />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Flame className="text-yellow-500" size={32} />
            <h1 className="text-4xl font-bold text-white">Pray For Congo</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Unissons-nous dans la prière pour la paix et la restauration en République Démocratique du Congo.
            Votre voix compte, votre prière fait la différence.
          </p>
          <QuoteDisplay quote={currentQuote} />
        </header>

        <main className="space-y-12">
          <PrayerForm onSubmit={handlePrayerSubmit} />
          <PrayerChallenge
            challenge={{
              ...challenge,
              globalStats,
            }}
            onStartChallenge={handleChallengeComplete}
            darkMode={darkMode}
          />
          {/* <PrayerMap prayers={prayers} /> */}
          <PrayerStatsComponent stats={stats} />
          <CategoryFilter
            currentCategory={selectedCategory}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          />
          {error ? (
            <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
              {error}
            </div>
          ) : (
            <PrayerWall
              prayers={prayers}
              onAmen={handleAmen}
              currentLanguage={language}
              onLoadMore={handleLoadMore}
              loading={loading}
              hasNextPage={hasNextPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </main>
        <footer className="mt-16 text-center text-gray-400 text-sm space-y-2">
          <p className="text-yellow-500 font-medium">
            🕊️ Rejoignez le défi de prière de 10 minutes par jour
          </p>
          <p>
            Ensemble, nous pouvons faire la différence pour la RDC
          </p>
          <p>© 2025 Pray For Congo. Créé par Huram Abi.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;