import React from 'react';
import { Staff } from '../../../../types/staff';

interface StaffSectionProps {
  staff: Staff[];
  selectedStaff: Staff | null;
  commission: number;
  onStaffSelect: (staff: Staff | null) => void;
  onCommissionChange: (commission: number) => void;
}

export function StaffSection({
  staff,
  selectedStaff,
  commission,
  onStaffSelect,
  onCommissionChange
}: StaffSectionProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Vendedor (opcional)
        </label>
        <select
          value={selectedStaff?.code || ''}
          onChange={(e) => {
            const member = staff.find(s => s.code === e.target.value);
            onStaffSelect(member || null);
          }}
          className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Seleccionar vendedor</option>
          {staff.map((member) => (
            <option key={member.code} value={member.code}>
              {member.name}
            </option>
          ))}
        </select>
      </div>

      {selectedStaff && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comisión (%)
          </label>
          <input
            type="number"
            value={commission}
            onChange={(e) => onCommissionChange(Number(e.target.value))}
            min="0"
            max="100"
            step="0.1"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </>
  );
}