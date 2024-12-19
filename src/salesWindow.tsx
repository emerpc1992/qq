import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SalesWindow } from './components/modules/sales/SalesWindow';
import './index.css';

// Get the shared data from the opener window
const opener = window.opener;
if (opener) {
  const products = opener.products;
  const clients = opener.clients;
  const staff = opener.staff;
  const addClient = opener.addClient;
  const handleCreateSale = opener.handleCreateSale;

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <SalesWindow
        products={products}
        clients={clients}
        staff={staff}
        onAddClient={addClient}
        onSubmit={handleCreateSale}
      />
    </StrictMode>
  );
}