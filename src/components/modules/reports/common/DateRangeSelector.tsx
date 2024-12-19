import React from 'react';

interface DateRangeSelectorProps {
  value: {
    startDate: string;
    endDate: string;
  };
  onChange: (range: { startDate: string; endDate: string }) => void;
}

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <div className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm border">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha Inicial
        </label>
        <input
          type="date"
          value={value.startDate}
          onChange={(e) => onChange({ ...value, startDate: e.target.value })}
          max={value.endDate}
          className="px-3 py-1.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fecha Final
        </label>
        <input
          type="date"
          value={value.endDate}
          onChange={(e) => onChange({ ...value, endDate: e.target.value })}
          min={value.startDate}
          max={new Date().toISOString().split('T')[0]}
          className="px-3 py-1.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>
    </div>
  );
}