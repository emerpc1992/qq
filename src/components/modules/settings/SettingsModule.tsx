import React, { useState } from 'react';
import { SETTINGS_MODULES } from '../../../constants/settings';
import { UserManagementPanel } from './users/UserManagementPanel';
import { AppearancePanel } from './appearance/AppearancePanel';
import { InvoiceSettingsPanel } from './invoices/InvoiceSettingsPanel';
import { useUsers } from '../../../hooks/useUsers';

export function SettingsModule() {
  const [currentSubModule, setCurrentSubModule] = useState('users');
  const { users, updateUser } = useUsers();

  const renderContent = () => {
    switch (currentSubModule) {
      case 'users':
        return <UserManagementPanel users={users} onUpdateUser={updateUser} />;
      case 'appearance':
        return <AppearancePanel />;
      case 'invoices':
        return <InvoiceSettingsPanel />;
      default:
        return (
          <div className="text-gray-500">
            Este submódulo está en construcción
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      <div className="col-span-1 bg-white rounded-lg shadow p-4">
        <nav className="space-y-2">
          {SETTINGS_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => setCurrentSubModule(module.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                currentSubModule === module.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {module.icon}
              <span className="text-sm font-medium">{module.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="col-span-3 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {SETTINGS_MODULES.find(m => m.id === currentSubModule)?.label}
        </h2>
        {renderContent()}
      </div>
    </div>
  );
}