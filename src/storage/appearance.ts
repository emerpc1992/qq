import { AppearanceState } from '../types/appearance';

const STORAGE_KEY = 'masterFactu:appearance';

export function saveAppearanceSettings(settings: AppearanceState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving appearance settings:', error);
  }
}

export function loadAppearanceSettings(): AppearanceState | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading appearance settings:', error);
    return null;
  }
}