export function generateStaffCode(): string {
  const prefix = 'COL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function generateSaleId(): string {
  const prefix = 'VTA';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function calculateTotalCommission(amount: number, commission: number, discount: number): number {
  const commissionAmount = (amount * commission) / 100;
  return Math.max(0, commissionAmount - discount);
}