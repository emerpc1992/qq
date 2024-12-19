import React from 'react';
import { AppointmentsModule } from './appointments/AppointmentsModule';
import { ProductsModule } from './products/ProductsModule';
import { SalesModule } from './sales/SalesModule';
import { ClientsModule } from './clients/ClientsModule';
import { ExpensesModule } from './expenses/ExpensesModule';
import { CreditsModule } from './credits/CreditsModule';
import { StaffModule } from './staff/StaffModule';
import { SettingsModule } from './settings/SettingsModule';
import { PettyCashModule } from './pettyCash/PettyCashModule';
import { ReportsModule } from './reports/ReportsModule';

interface ModuleContainerProps {
  title: string;
  currentModule: string;
  userRole: string;
}

export function ModuleContainer({ currentModule, userRole }: ModuleContainerProps) {
  const renderContent = () => {
    switch (currentModule) {
      case 'appointments':
        return <AppointmentsModule />;
      case 'products':
        return <ProductsModule />;
      case 'sales':
        return <SalesModule />;
      case 'clients':
        return <ClientsModule />;
      case 'credits':
        return <CreditsModule />;
      case 'pettyCash':
        return <PettyCashModule />;
      case 'expenses':
        return <ExpensesModule />;
      case 'staff':
        return <StaffModule />;
      case 'reports':
        return <ReportsModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return (
          <div className="text-center text-gray-500">
            Este módulo está en construcción
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {renderContent()}
    </div>
  );
}