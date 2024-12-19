import { Credit } from '../types/credits';

const STORAGE_KEY = 'masterFactu:credits';

export function saveCredits(credits: Credit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(credits));
  } catch (error) {
    console.error('Error saving credits:', error);
  }
}

export function loadCredits(): Credit[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading credits:', error);
    return null;
  }
}