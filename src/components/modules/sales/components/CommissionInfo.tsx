import React from 'react';
import { User } from 'lucide-react';
import { formatCurrency } from '../../../../utils/formatters';

interface CommissionInfoProps {
  staff: {
    member: { name: string };
    commission: number;
    commissionAmount: number;
  };
}

export function CommissionInfo({ staff }: CommissionInfoProps) {
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <User className="h-4 w-4" />
      <span>
        {staff.member.name} ({staff.commission}% - {formatCurrency(staff.commissionAmount)})
      </span>
    </div>
  );
}