import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface SaveNotificationProps {
  show: boolean;
}

export function SaveNotification({ show }: SaveNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg">
      <CheckCircle2 className="h-5 w-5 mr-2" />
      <p>Cambios guardados correctamente</p>
    </div>
  );
}