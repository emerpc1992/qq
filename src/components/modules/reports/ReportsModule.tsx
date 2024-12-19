import React, { useState } from 'react';
import { SalesReport } from './sales/SalesReport';
import { ExpensesReport } from './expenses/ExpensesReport';
import { CreditsReport } from './credits/CreditsReport';
import { ProfitReport } from './profit/ProfitReport';
import { StaffReport } from './staff/StaffReport';
import { PettyCashReport } from './pettyCash/PettyCashReport';
import { CashRegisterReport } from './cashRegister/CashRegisterReport';
import { DateRangeSelector } from './common/DateRangeSelector';
import { ReportTypeSelector } from './common/ReportTypeSelector';

type ReportType = 'sales' | 'expenses' | 'credits' | 'profit' | 'staff' | 'pettyCash' | 'cashRegister';

export function ReportsModule() {
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0], // First day of current month
    endDate: new Date().toISOString().split('T')[0], // Today
  });

  const renderReport = () => {
    switch (reportType) {
      case 'sales':
        return <SalesReport dateRange={dateRange} />;
      case 'expenses':
        return <ExpensesReport dateRange={dateRange} />;
      case 'credits':
        return <CreditsReport dateRange={dateRange} />;
      case 'profit':
        return <ProfitReport dateRange={dateRange} />;
      case 'staff':
        return <StaffReport dateRange={dateRange} />;
      case 'pettyCash':
        return <PettyCashReport dateRange={dateRange} />;
      case 'cashRegister':
        return <CashRegisterReport dateRange={dateRange} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Reportes Financieros</h2>
          <ReportTypeSelector
            value={reportType}
            onChange={setReportType}
          />
        </div>
        <DateRangeSelector
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      {renderReport()}
    </div>
  );
}