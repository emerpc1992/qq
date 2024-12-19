import { User } from '../types/auth';
import { USERS } from '../constants/users';

const STORAGE_KEY = 'masterFactu:users';

export function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

export function loadUsers(): User[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const users = JSON.parse(stored);
    if (!Array.isArray(users)) {
      // If stored data is invalid, reset to default users
      saveUsers(USERS);
      return USERS;
    }
    
    return users;
  } catch (error) {
    console.error('Error loading users:', error);
    // If there's an error, reset to default users
    saveUsers(USERS);
    return USERS;
  }
}