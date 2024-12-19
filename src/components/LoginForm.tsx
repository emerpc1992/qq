import React from 'react';
import { User, Lock } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

interface LoginFormProps {
  username: string;
  password: string;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  primaryColor: string;
  loginButtonColor: string;
}

export function LoginForm({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  primaryColor,
  loginButtonColor
}: LoginFormProps) {
  return (
    <form className="mt-8 space-y-6" onSubmit={onSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="sr-only">{TRANSLATIONS.placeholders.username}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
              style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
              placeholder={TRANSLATIONS.placeholders.username}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">{TRANSLATIONS.placeholders.password}</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              className="appearance-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:z-10 sm:text-sm"
              style={{ '--tw-ring-color': primaryColor } as React.CSSProperties}
              placeholder={TRANSLATIONS.placeholders.password}
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">
          {error === 'Invalid credentials' ? TRANSLATIONS.errors.invalidCredentials : error}
        </p>
      )}

      <button
        type="submit"
        style={{ backgroundColor: loginButtonColor }}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
      >
        {TRANSLATIONS.buttons.login}
      </button>
    </form>
  );
}