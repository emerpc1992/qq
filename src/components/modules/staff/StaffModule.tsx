import React, { useState } from 'react';
import { StaffList } from './StaffList';
import { StaffForm } from './StaffForm';
import { StaffSearch } from './StaffSearch';
import { Plus } from 'lucide-react';
import { useStaff } from '../../../hooks/useStaff';
import { Staff } from '../../../types/staff';

export function StaffModule() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { staff, addStaff, updateStaff, deleteStaff } = useStaff();

  const handleCreateStaff = (staffData: Staff) => {
    addStaff(staffData);
    setIsCreating(false);
  };

  const handleUpdateStaff = (staffData: Staff) => {
    updateStaff(staffData.code, staffData);
    setEditingStaff(null);
  };

  const filteredStaff = staff.filter(member => {
    const searchLower = searchTerm.toLowerCase();
    return (
      member.code.toLowerCase().includes(searchLower) ||
      member.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Colaboradores</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nuevo Colaborador</span>
        </button>
      </div>

      <div className="md:w-64">
        <StaffSearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {(isCreating || editingStaff) && (
        <StaffForm
          staff={editingStaff}
          onSubmit={editingStaff ? handleUpdateStaff : handleCreateStaff}
          onCancel={() => {
            setIsCreating(false);
            setEditingStaff(null);
          }}
        />
      )}

      <StaffList
        staff={filteredStaff}
        onEdit={setEditingStaff}
        onDelete={deleteStaff}
        onUpdateStaff={updateStaff}
      />
    </div>
  );
}