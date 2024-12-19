import { useState, useEffect } from 'react';
import { Client } from '../types/clients';
import { loadClients, saveClients } from '../storage/clients';

export function useClients() {
  const [clients, setClients] = useState<Client[]>(() => {
    return loadClients() || [];
  });

  useEffect(() => {
    saveClients(clients);
  }, [clients]);

  const addClient = (client: Client) => {
    setClients(current => [...current, client]);
  };

  const updateClient = (code: string, clientData: Client) => {
    setClients(current =>
      current.map(client =>
        client.code === code ? clientData : client
      )
    );
  };

  const deleteClient = (code: string) => {
    setClients(current =>
      current.filter(client => client.code !== code)
    );
  };

  return {
    clients,
    addClient,
    updateClient,
    deleteClient,
  };
}