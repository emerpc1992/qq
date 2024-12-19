import React, { useState } from 'react';
import { User } from '../../../../types/auth';

interface UserEditFormProps {
  user: User;
  onSubmit: (updates: Partial<User>) => void;
  onCancel: () => void;
}

export function UserEditForm({ user, onSubmit, onCancel }: UserEditFormProps) {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username.trim() === '') {
      setError('El nombre de usuario no puede estar vacío');
      return;
    }

    const updates: Partial<User> = {};
    
    if (username !== user.username) {
      updates.username = username;
    }
    
    if (password) {
      updates.password = password;
    }

    if (Object.keys(updates).length === 0) {
      setError('No se han realizado cambios');
      return;
    }

    onSubmit(updates);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 border-t pt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de Usuario
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nueva Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Dejar en blanco para mantener la actual"
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
}