import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface PrayerFormProps {
  onSubmit: (prayer: { message: string; category: string }) => void;
}

export function PrayerForm({ onSubmit }: PrayerFormProps) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('peace');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit({ message, category });
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-4">
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Partagez votre prière..."
          className="w-full p-4 rounded-lg bg-opacity-10 bg-white border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none h-32"
        />
      </div>
      <div className="flex gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-opacity-10 bg-white border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500"
        >
          <option value="peace">Paix</option>
          <option value="victims">Victimes</option>
          <option value="leaders">Dirigeants</option>
          <option value="children">Enfants</option>
        </select>
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition-colors"
        >
          <Send size={18} />
          Envoyer
        </button>
      </div>
    </form>
  );
}