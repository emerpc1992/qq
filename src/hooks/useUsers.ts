import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { USERS } from '../constants/users';
import { saveUsers, loadUsers } from '../storage/users';

export function useUsers() {
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = loadUsers();
    if (!savedUsers) {
      // If no users exist in localStorage, save the default users
      saveUsers(USERS);
      return USERS;
    }
    return savedUsers;
  });

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  const updateUser = (username: string, updates: Partial<User>) => {
    setUsers(currentUsers => 
      currentUsers.map(user => 
        user.username === username
          ? { ...user, ...updates }
          : user
      )
    );
  };

  return {
    users,
    updateUser,
  };
}