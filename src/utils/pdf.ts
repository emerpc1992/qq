import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Sale } from '../types/sales';
import { Expense } from '../types/expenses';
import { Credit } from '../types/credits';
import { formatCurrency } from './formatters';

export function generateFinancialReport(
  title: string,
  dateRange: { startDate: string; endDate: string },
  sales: Sale[],
  expenses: Expense[],
  credits: Credit[],
  summary: {
    totalSales: number;
    totalExpenses: number;
    totalCommissions: number;
    grossProfit: number;
    netProfit: number;
    cashInRegister: number;
  }
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Title
  doc.setFontSize(20);
  doc.text(title, pageWidth / 2, 20, { align: 'center' });

  // Date Range
  doc.setFontSize(12);
  doc.text(
    `Período: ${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}`,
    pageWidth / 2,
    30,
    { align: 'center' }
  );

  // Summary Section
  doc.setFontSize(14);
  doc.text('Resumen Financiero', 14, 45);

  const summaryData = [
    ['Total Ventas', formatCurrency(summary.totalSales)],
    ['Total Gastos', formatCurrency(summary.totalExpenses)],
    ['Total Comisiones', formatCurrency(summary.totalCommissions)],
    ['Ganancia Bruta', formatCurrency(summary.grossProfit)],
    ['Ganancia Neta', formatCurrency(summary.netProfit)],
    ['Dinero en Caja', formatCurrency(summary.cashInRegister)],
  ];

  autoTable(doc, {
    startY: 50,
    head: [['Concepto', 'Monto']],
    body: summaryData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });

  // Sales Section
  doc.addPage();
  doc.setFontSize(14);
  doc.text('Detalle de Ventas', 14, 20);

  const salesData = sales.map(sale => [
    new Date(sale.date).toLocaleDateString(),
    sale.client.name,
    sale.payment.method === 'cash' ? 'Efectivo' : 
    sale.payment.method === 'card' ? 'Tarjeta' : 'Transferencia',
    formatCurrency(sale.total),
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Fecha', 'Cliente', 'Método', 'Total']],
    body: salesData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });

  // Expenses Section
  doc.addPage();
  doc.setFontSize(14);
  doc.text('Detalle de Gastos', 14, 20);

  const expensesData = expenses.map(expense => [
    new Date(expense.date).toLocaleDateString(),
    expense.reason,
    formatCurrency(expense.amount),
  ]);

  autoTable(doc, {
    startY: 25,
    head: [['Fecha', 'Concepto', 'Monto']],
    body: expensesData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });

  // Credits Section
  doc.addPage();
  doc.setFontSize(14);
  doc.text('Detalle de Créditos', 14, 20);

  const creditsData = credits.map(credit => {
    const totalPaid = credit.payments.reduce((sum, payment) => 
      payment.status === 'active' ? sum + payment.amount : sum, 0
    );
    const pending = credit.totalAmount - totalPaid;

    return [
      credit.clientName,
      formatCurrency(credit.totalAmount),
      formatCurrency(totalPaid),
      formatCurrency(pending),
      credit.status,
    ];
  });

  autoTable(doc, {
    startY: 25,
    head: [['Cliente', 'Total', 'Pagado', 'Pendiente', 'Estado']],
    body: creditsData,
    theme: 'striped',
    headStyles: { fillColor: [37, 99, 235] },
    styles: { fontSize: 10 },
  });

  // Save the PDF
  doc.save(`reporte-financiero-${new Date().toISOString().split('T')[0]}.pdf`);
}