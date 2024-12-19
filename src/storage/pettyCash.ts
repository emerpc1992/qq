import { PettyCashState } from '../types/pettyCash';

const STORAGE_KEY = 'masterFactu:pettyCash';

export function savePettyCash(state: PettyCashState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving petty cash:', error);
  }
}

export function loadPettyCash(): PettyCashState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading petty cash:', error);
    return null;
  }
}