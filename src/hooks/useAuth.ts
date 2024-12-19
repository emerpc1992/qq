import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { USERS } from '../constants/users';
import { loadUsers, saveUsers } from '../storage/users';

interface UseAuthReturn {
  isLoggedIn: boolean;
  error: string;
  currentUser: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Initialize users in localStorage if they don't exist
  useEffect(() => {
    const savedUsers = loadUsers();
    if (!savedUsers) {
      saveUsers(USERS);
    }
  }, []);

  const login = (username: string, password: string) => {
    const users = loadUsers() || USERS;
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      setError('');
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
      setError('Invalid credentials');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setError('');
  };

  return {
    isLoggedIn,
    error,
    currentUser,
    login,
    logout,
  };
}