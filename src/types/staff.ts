export interface Staff {
  code: string;
  name: string;
  phone: string;
  notes?: string;
  sales: StaffSale[];
}

export interface StaffSale {
  id: string;
  date: string;
  amount: number;
  commission: number;
  discount: number;
  totalCommission: number;
  reason?: string;
}