import React from 'react';
import { X, Facebook, Twitter, Apple as WhatsApp, Link2 } from 'lucide-react';

interface ShareModalProps {
  message: string;
  onClose: () => void;
}

export function ShareModal({ message, onClose }: ShareModalProps) {
  const shareUrl = window.location.href;
  const encodedMessage = encodeURIComponent(`${message}\n\n${shareUrl}`);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: WhatsApp,
      url: `https://wa.me/?text=${encodedMessage}`,
      color: 'bg-green-500',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodedMessage}`,
      color: 'bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedMessage}`,
      color: 'bg-sky-500',
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${message}\n\n${shareUrl}`);
      alert('Lien copié!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-xl font-semibold text-white mb-4">Partager cette prière</h3>
        
        <div className="space-y-4">
          <div className="flex flex-col gap-3">
            {shareLinks.map(({ name, icon: Icon, url, color }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${color} text-white px-4 py-2 rounded-lg flex items-center gap-3 hover:opacity-90 transition-opacity`}
              >
                <Icon size={20} />
                <span>Partager sur {name}</span>
              </a>
            ))}
          </div>
          
          <button
            onClick={copyToClipboard}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-3 hover:bg-gray-600 transition-colors"
          >
            <Link2 size={20} />
            <span>Copier le lien</span>
          </button>
        </div>
      </div>
    </div>
  );
}