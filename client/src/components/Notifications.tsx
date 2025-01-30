import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

interface NotificationsProps {
  onToggleNotifications: () => void;
  enabled: boolean;
}

export function Notifications({ onToggleNotifications, enabled }: NotificationsProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        onToggleNotifications();
      }
    }
  };

  if (!('Notification' in window)) {
    return null;
  }

  return (
    <button
      onClick={permission === 'granted' ? onToggleNotifications : requestPermission}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        enabled && permission === 'granted'
          ? 'bg-yellow-500 text-black'
          : 'bg-gray-800 text-gray-400 hover:text-yellow-500'
      }`}
    >
      <Bell size={18} />
      <span className="text-sm">
        {permission === 'granted'
          ? enabled
            ? 'Notifications activées'
            : 'Activer les notifications'
          : 'Recevoir les notifications'}
      </span>
    </button>
  );
}