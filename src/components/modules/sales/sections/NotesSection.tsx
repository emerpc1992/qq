import React from 'react';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (notes: string) => void;
}

export function NotesSection({ notes, onNotesChange }: NotesSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Notas (opcional)
      </label>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}