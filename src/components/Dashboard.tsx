import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Sidebar } from './navigation/Sidebar';
import { ModuleContainer } from './modules/ModuleContainer';
import { TRANSLATIONS } from '../constants/translations';
import { User } from '../types/auth';

interface DashboardProps {
  onLogout: () => void;
  currentUser: User;
}

export function Dashboard({ onLogout, currentUser }: DashboardProps) {
  const [currentModule, setCurrentModule] = useState('appointments');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        currentModule={currentModule}
        onModuleChange={setCurrentModule}
        onLogout={onLogout}
        userRole={currentUser.role}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <ModuleContainer 
            title={TRANSLATIONS.modules[currentModule as keyof typeof TRANSLATIONS.modules]} 
            currentModule={currentModule}
            userRole={currentUser.role}
          />
        </main>
      </div>
    </div>
  );
}