import React, { useState } from 'react';
import { Staff, StaffSale } from '../../../types/staff';
import { formatCurrency } from '../../../utils/formatters';
import { Edit2, Trash2, DollarSign, ChevronDown, ChevronUp, MinusCircle } from 'lucide-react';
import { PaymentForm } from './payments/PaymentForm';
import { DiscountForm } from './discount/DiscountForm';
import { SalesList } from './SalesList';
import { AdminPasswordModal } from '../shared/AdminPasswordModal';

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (code: string) => void;
  onUpdateStaff: (code: string, staffData: Staff) => void;
}

export function StaffList({ staff, onEdit, onDelete, onUpdateStaff }: StaffListProps) {
  const [payingStaffCode, setPayingStaffCode] = useState<string | null>(null);
  const [discountingStaffCode, setDiscountingStaffCode] = useState<string | null>(null);
  const [expandedStaff, setExpandedStaff] = useState<Set<string>>(new Set());
  const [clearingHistoryCode, setClearingHistoryCode] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState('');

  const calculateTotalSales = (sales: StaffSale[]): number => {
    return sales.reduce((sum, sale) => sum + sale.amount, 0);
  };

  const calculateTotalCommissions = (sales: StaffSale[]): number => {
    return sales.reduce((sum, sale) => sum + sale.totalCommission, 0);
  };

  const handlePayCommission = (staffCode: string, payment: StaffSale) => {
    const staffMember = staff.find(s => s.code === staffCode);
    if (!staffMember) return;

    const resetTransaction: StaffSale = {
      id: payment.id,
      date: payment.date,
      amount: -calculateTotalSales(staffMember.sales),
      commission: 0,
      discount: 0,
      totalCommission: -calculateTotalCommissions(staffMember.sales),
      reason: 'Pago de comisiones y reinicio de ventas',
    };

    const updatedStaff: Staff = {
      ...staffMember,
      sales: [...staffMember.sales, resetTransaction]
    };

    onUpdateStaff(staffCode, updatedStaff);
    setPayingStaffCode(null);
  };

  const handleAddDiscount = (staffCode: string, discount: StaffSale) => {
    const staffMember = staff.find(s => s.code === staffCode);
    if (!staffMember) return;

    const updatedStaff: Staff = {
      ...staffMember,
      sales: [...staffMember.sales, discount]
    };

    onUpdateStaff(staffCode, updatedStaff);
    setDiscountingStaffCode(null);
  };

  const handleClearHistory = (staffCode: string, password: string) => {
    const staffMember = staff.find(s => s.code === staffCode);
    if (!staffMember) return;

    // Verify admin password (assuming 'admin' is the admin password)
    if (password !== 'admin') {
      setPasswordError('Contraseña incorrecta');
      return;
    }

    const updatedStaff: Staff = {
      ...staffMember,
      sales: []
    };

    onUpdateStaff(staffCode, updatedStaff);
    setClearingHistoryCode(null);
    setPasswordError('');
  };

  const toggleExpand = (code: string) => {
    const newExpanded = new Set(expandedStaff);
    if (newExpanded.has(code)) {
      newExpanded.delete(code);
    } else {
      newExpanded.add(code);
    }
    setExpandedStaff(newExpanded);
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No hay colaboradores registrados</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {staff.map((member) => {
          const totalSales = calculateTotalSales(member.sales);
          const totalCommissions = calculateTotalCommissions(member.sales);
          const isExpanded = expandedStaff.has(member.code);
          
          return (
            <div key={member.code} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleExpand(member.code)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    <h3 className="text-lg font-medium text-gray-900">
                      {member.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 ml-8">Código: {member.code}</p>
                  <p className="text-sm text-gray-500 ml-8">Teléfono: {member.phone}</p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4 ml-8">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Total Ventas:</p>
                      <p className="text-lg font-medium">{formatCurrency(totalSales)}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">Total Comisiones:</p>
                        {totalCommissions > 0 && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setDiscountingStaffCode(member.code)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Aplicar descuento"
                            >
                              <MinusCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setPayingStaffCode(member.code)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Pagar comisiones"
                            >
                              <DollarSign className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-lg font-medium">{formatCurrency(totalCommissions)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(member)}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"
                    title="Editar colaborador"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(member.code)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Eliminar colaborador"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {member.notes && (
                <div className="mt-3 text-sm ml-8">
                  <span className="font-medium text-gray-700">Notas:</span>{' '}
                  {member.notes}
                </div>
              )}

              {isExpanded && member.sales.length > 0 && (
                <div className="mt-6 ml-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">Historial</h4>
                    <button
                      onClick={() => setClearingHistoryCode(member.code)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Borrar Historial
                    </button>
                  </div>
                  <SalesList sales={member.sales} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {payingStaffCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Pagar Comisiones
            </h3>
            <PaymentForm
              maxAmount={calculateTotalCommissions(staff.find(s => s.code === payingStaffCode)?.sales || [])}
              onSubmit={(payment) => handlePayCommission(payingStaffCode, payment)}
              onCancel={() => setPayingStaffCode(null)}
            />
          </div>
        </div>
      )}

      {discountingStaffCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Aplicar Descuento
            </h3>
            <DiscountForm
              maxAmount={calculateTotalCommissions(staff.find(s => s.code === discountingStaffCode)?.sales || [])}
              onSubmit={(discount) => handleAddDiscount(discountingStaffCode, discount)}
              onCancel={() => setDiscountingStaffCode(null)}
            />
          </div>
        </div>
      )}

      {clearingHistoryCode && (
        <AdminPasswordModal
          onConfirm={(password) => handleClearHistory(clearingHistoryCode, password)}
          onCancel={() => {
            setClearingHistoryCode(null);
            setPasswordError('');
          }}
          error={passwordError}
        />
      )}
    </>
  );
}