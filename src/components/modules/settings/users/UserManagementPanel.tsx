import React, { useState } from 'react';
import { User } from '../../../../types/auth';
import { UserEditForm } from './UserEditForm';
import { Shield, User as UserIcon } from 'lucide-react';

interface UserManagementPanelProps {
  users: User[];
  onUpdateUser: (username: string, updates: Partial<User>) => void;
}

export function UserManagementPanel({ users, onUpdateUser }: UserManagementPanelProps) {
  const [editingUser, setEditingUser] = useState<string | null>(null);

  const editableUsers = users.filter(user => 
    user.username === 'admin' || user.username === 'user'
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {editableUsers.map((user) => (
          <div 
            key={user.username}
            className="bg-white rounded-lg border p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {user.role === 'admin' ? (
                  <Shield className="h-6 w-6 text-blue-600" />
                ) : (
                  <UserIcon className="h-6 w-6 text-gray-600" />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {user.username}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(user.username)}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Editar
              </button>
            </div>

            {editingUser === user.username && (
              <UserEditForm
                user={user}
                onSubmit={(updates) => {
                  onUpdateUser(user.username, updates);
                  setEditingUser(null);
                }}
                onCancel={() => setEditingUser(null)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}