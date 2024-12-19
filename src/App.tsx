import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { Logo } from './components/Logo';
import { useAuth } from './hooks/useAuth';
import { useAppearance } from './hooks/useAppearance';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, error, currentUser, login, logout } = useAuth();
  const { images, colors } = useAppearance();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  if (isLoggedIn && currentUser) {
    return <Dashboard onLogout={logout} currentUser={currentUser} />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${images.loginBackground}')`
      }}
    >
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
        <Logo />
        <LoginForm
          username={username}
          password={password}
          error={error}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onSubmit={handleLogin}
          primaryColor={colors.primary}
          loginButtonColor={colors.loginButton}
        />
      </div>
    </div>
  );
}