import { useState, useEffect } from 'react';
import { Staff, StaffSale } from '../types/staff';
import { loadStaff, saveStaff } from '../storage/staff';
import { Sale } from '../types/sales';

export function useStaff() {
  const [staff, setStaff] = useState<Staff[]>(() => {
    return loadStaff() || [];
  });

  useEffect(() => {
    saveStaff(staff);
  }, [staff]);

  const addStaff = (staffMember: Staff) => {
    setStaff(current => [...current, staffMember]);
  };

  const updateStaff = (code: string, staffData: Staff) => {
    setStaff(current =>
      current.map(member =>
        member.code === code ? staffData : member
      )
    );
  };

  const deleteStaff = (code: string) => {
    setStaff(current =>
      current.filter(member => member.code !== code)
    );
  };

  const addSaleToStaff = (sale: Sale) => {
    if (!sale.staff) return;

    const { member, commission, commissionAmount } = sale.staff;
    
    setStaff(current => 
      current.map(staffMember => {
        if (staffMember.code === member.code) {
          const newSale: StaffSale = {
            id: sale.id,
            date: sale.date,
            amount: sale.total,
            commission,
            discount: 0,
            totalCommission: commissionAmount,
          };

          return {
            ...staffMember,
            sales: [...staffMember.sales, newSale]
          };
        }
        return staffMember;
      })
    );
  };

  const removeSaleFromStaff = (saleId: string) => {
    setStaff(current =>
      current.map(staffMember => ({
        ...staffMember,
        sales: staffMember.sales.filter(sale => sale.id !== saleId)
      }))
    );
  };

  return {
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    addSaleToStaff,
    removeSaleFromStaff,
  };
}