// import React from 'react';
// import { Prayer } from '../types';
// import { Heart, Share2, Calendar, MapPin, MessageCircle, ChevronDown } from 'lucide-react';
// import { ShareModal } from './ShareModal';

// interface PrayerWallProps {
//   prayers: Prayer[];
//   onAmen: (id: string) => void;
//   currentLanguage: string;
//   onLoadMore: () => void;
//   loading: boolean;
//   hasNextPage: boolean;
//   currentPage: number;
//   totalPages: number;
// }

// export function PrayerWall({
//   prayers,
//   onAmen,
//   currentLanguage,
//   onLoadMore,
//   loading,
//   hasNextPage,
//   currentPage,
//   totalPages
// }: PrayerWallProps) {
//   const [shareModalPrayer, setShareModalPrayer] = React.useState<Prayer | null>(null);

//   const getPrayerMessage = (prayer: Prayer) => {
//     if (prayer.language === currentLanguage) {
//       return prayer.message;
//     }
//     return prayer.translations?.[currentLanguage as keyof typeof prayer.translations] || prayer.message;
//   };

//   return (
//     <div className="space-y-8">
//       <div className="grid gap-6">
//         {prayers.map((prayer) => (
//           <div
//             key={prayer.id}
//             className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden transition-all hover:bg-opacity-70"
//           >
//             <div className="p-6">
//               {prayer.featured && (
//                 <div className="mb-3 text-yellow-500 text-sm font-medium flex items-center gap-2">
//                   ⭐ Prière du jour
//                 </div>
//               )}
              
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0">
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold">
//                     {prayer.message.charAt(0).toUpperCase()}
//                   </div>
//                 </div>
                
//                 <div className="flex-grow">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="text-gray-300 font-medium">Anonyme</span>
//                     <span className="text-gray-500">•</span>
//                     <span className="text-gray-500 text-sm">
//                       {new Date(prayer.timestamp).toLocaleDateString('fr-FR', {
//                         day: 'numeric',
//                         month: 'long',
//                         year: 'numeric'
//                       })}
//                     </span>
//                   </div>
                  
//                   <p className="text-white text-lg mb-4 leading-relaxed">
//                     {getPrayerMessage(prayer)}
//                   </p>
                  
//                   <div className="flex flex-wrap items-center gap-4 text-sm">
//                     <button
//                       onClick={() => onAmen(prayer.id)}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
//                         prayer.amens > 0
//                           ? 'bg-yellow-500 bg-opacity-20 text-yellow-500'
//                           : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-10'
//                       }`}
//                     >
//                       <Heart
//                         size={16}
//                         className={prayer.amens > 0 ? 'fill-yellow-500' : ''}
//                       />
//                       <span>{prayer.amens} Amen{prayer.amens !== 1 ? 's' : ''}</span>
//                     </button>
                    
//                     <button
//                       onClick={() => setShareModalPrayer(prayer)}
//                       className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-400 hover:text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-10 transition-colors"
//                     >
//                       <Share2 size={16} />
//                       <span>Partager</span>
//                     </button>
                    
//                     {prayer.location && (
//                       <div className="flex items-center gap-2 text-gray-500 ml-auto">
//                         <MapPin size={16} />
//                         <span>{prayer.location.region}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {hasNextPage && (
//         <div className="text-center pt-4">
//           <button
//             onClick={onLoadMore}
//             disabled={loading}
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//             ) : (
//               <ChevronDown size={20} />
//             )}
//             <span>
//               {loading ? 'Chargement...' : `Voir plus de prières (Page ${currentPage}/${totalPages})`}
//             </span>
//           </button>
//         </div>
//       )}
      
//       {shareModalPrayer && (
//         <ShareModal
//           message={getPrayerMessage(shareModalPrayer)}
//           onClose={() => setShareModalPrayer(null)}
//         />
//       )}
//     </div>
//   );
// }

import React from 'react';
import { Prayer } from '../types';
import { Heart, Share2, Calendar, MapPin, MessageCircle, ChevronDown } from 'lucide-react';
import { ShareModal } from './ShareModal';

interface PrayerWallProps {
  prayers: Prayer[];
  onAmen: (id: string) => void;
  currentLanguage: string;
  onLoadMore: () => void;
  loading: boolean;
  hasNextPage: boolean;
  currentPage: number;
  totalPages: number;
}

export function PrayerWall({
  prayers,
  onAmen,
  currentLanguage,
  onLoadMore,
  loading,
  hasNextPage,
  currentPage,
  totalPages
}: PrayerWallProps) {
  const [shareModalPrayer, setShareModalPrayer] = React.useState<Prayer | null>(null);

  const getPrayerMessage = (prayer: Prayer) => {
    if (prayer.language === currentLanguage) {
      return prayer.message;
    }
    return prayer.translations?.[currentLanguage as keyof typeof prayer.translations] || prayer.message;
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        {prayers.map((prayer) => (
          <div
            key={prayer._id}
            className="bg-gray-800 bg-opacity-50 rounded-xl overflow-hidden transition-all hover:bg-opacity-70"
          >
            <div className="p-6">
              {prayer.featured && (
                <div className="mb-3 text-yellow-500 text-sm font-medium flex items-center gap-2">
                  ⭐ Prière du jour
                </div>
              )}
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold">
                    {prayer.message.charAt(0).toUpperCase()}
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-300 font-medium">Anonyme</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(prayer.timestamp).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <p className="text-white text-lg mb-4 leading-relaxed">
                    {getPrayerMessage(prayer)}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <button
                      onClick={() => prayer._id && onAmen(prayer._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                        prayer.amens > 0
                          ? 'bg-yellow-500 bg-opacity-20 text-yellow-500'
                          : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-10'
                      }`}
                    >
                      <Heart
                        size={16}
                        className={prayer.amens > 0 ? 'fill-yellow-500' : ''}
                      />
                      <span>{prayer.amens} Amen{prayer.amens !== 1 ? 's' : ''}</span>
                    </button>
                    
                    <button
                      onClick={() => setShareModalPrayer(prayer)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-400 hover:text-yellow-500 hover:bg-yellow-500 hover:bg-opacity-10 transition-colors"
                    >
                      <Share2 size={16} />
                      <span>Partager</span>
                    </button>
                    
                    {prayer.location && (
                      <div className="flex items-center gap-2 text-gray-500 ml-auto">
                        <MapPin size={16} />
                        <span>{prayer.location.region}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center pt-4">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ChevronDown size={20} />
            )}
            <span>
              {loading ? 'Chargement...' : `Voir plus de prières (Page ${currentPage}/${totalPages})`}
            </span>
          </button>
        </div>
      )}
      
      {shareModalPrayer && (
        <ShareModal
          message={getPrayerMessage(shareModalPrayer)}
          onClose={() => setShareModalPrayer(null)}
        />
      )}
    </div>
  );
}