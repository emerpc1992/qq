import { Sale } from '../types/sales';
import { formatCurrency } from './formatters';

function generateInvoiceNumber(sale: Sale): string {
  const timestamp = sale.id.split('-')[1];
  return `FACT-${timestamp}`;
}

export function generateInvoiceHTML(sale: Sale, businessName: string): string {
  const invoiceNumber = generateInvoiceNumber(sale);
  const totalDiscount = sale.products.reduce((sum, product) => sum + (product.discount || 0), 0);
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Factura ${invoiceNumber}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
          }
          .invoice {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
          }
          .business-name {
            font-size: 24px;
            font-weight: bold;
            margin: 0;
            color: #2563eb;
          }
          .invoice-title {
            margin: 5px 0;
            color: #666;
          }
          .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .info-group {
            flex: 1;
          }
          .info-group p {
            margin: 5px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          th {
            background-color: #f8f9fa;
            font-weight: bold;
          }
          .amounts {
            margin-top: 20px;
            text-align: right;
          }
          .amounts p {
            margin: 5px 0;
          }
          .total {
            font-size: 18px;
            font-weight: bold;
            color: #2563eb;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
          @media print {
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="header">
            <h1 class="business-name">${businessName}</h1>
            <p class="invoice-title">Factura de Venta</p>
            <p class="invoice-title">N° ${invoiceNumber}</p>
          </div>

          <div class="info-section">
            <div class="info-group">
              <p><strong>Cliente:</strong> ${sale.client.name}</p>
              <p><strong>Teléfono:</strong> ${sale.client.phone || 'N/A'}</p>
              <p><strong>Fecha:</strong> ${new Date(sale.date).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> ${new Date(sale.date).toLocaleTimeString()}</p>
            </div>
            <div class="info-group" style="text-align: right;">
              <p><strong>Método de Pago:</strong> ${
                sale.payment.method === 'cash' ? 'Efectivo' :
                sale.payment.method === 'card' ? 'Tarjeta' : 'Transferencia'
              }</p>
              ${sale.payment.reference ? `<p><strong>Referencia:</strong> ${sale.payment.reference}</p>` : ''}
              <p><strong>Venta N°:</strong> ${sale.id}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th style="text-align: center;">Cantidad</th>
                <th style="text-align: right;">Precio Unit.</th>
                <th style="text-align: right;">Descuento</th>
                <th style="text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${sale.products.map(product => `
                <tr>
                  <td>${product.name}</td>
                  <td style="text-align: center;">${product.quantity}</td>
                  <td style="text-align: right;">${formatCurrency(product.salePrice)}</td>
                  <td style="text-align: right;">${formatCurrency(product.discount || 0)}</td>
                  <td style="text-align: right;">${formatCurrency(product.subtotal)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="amounts">
            <p><strong>Subtotal:</strong> ${formatCurrency(sale.total + totalDiscount)}</p>
            <p><strong>Descuento Total:</strong> ${formatCurrency(totalDiscount)}</p>
            <p class="total"><strong>Total:</strong> ${formatCurrency(sale.total)}</p>
          </div>

          <div class="footer">
            <p>¡Gracias por su compra!</p>
            <p>Este documento es un comprobante válido de su compra.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function printInvoice(sale: Sale, businessName: string): void {
  const invoiceHTML = generateInvoiceHTML(sale, businessName);
  
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    
    // Wait for content to load before printing
    setTimeout(() => {
      printWindow.print();
      // Close window after print dialog is closed
      printWindow.onfocus = () => {
        printWindow.close();
      };
    }, 250);
  }
}