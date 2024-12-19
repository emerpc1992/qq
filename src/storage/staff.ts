import { Staff } from '../types/staff';

const STORAGE_KEY = 'masterFactu:staff';

export function saveStaff(staff: Staff[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staff));
  } catch (error) {
    console.error('Error saving staff:', error);
  }
}

export function loadStaff(): Staff[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading staff:', error);
    return null;
  }
}