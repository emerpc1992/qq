import { Client } from '../types/clients';

const STORAGE_KEY = 'masterFactu:clients';

export function saveClients(clients: Client[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  } catch (error) {
    console.error('Error saving clients:', error);
  }
}

export function loadClients(): Client[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading clients:', error);
    return null;
  }
}