export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  password: string;
  role: UserRole;
}