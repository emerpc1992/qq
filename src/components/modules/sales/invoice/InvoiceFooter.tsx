import React from 'react';

export function InvoiceFooter() {
  return (
    <div className="text-center space-y-1 text-sm">
      <p>¡Gracias por su compra!</p>
      <p>Este documento es un</p>
      <p>comprobante válido de su compra</p>
      <div className="text-xs mt-2">
        <p>* * * * * * * * * * * * * * *</p>
      </div>
    </div>
  );
}