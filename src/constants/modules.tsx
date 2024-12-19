import React from 'react';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Wallet, 
  CreditCard, 
  UserCircle,
  BarChart3,
  Settings,
  Calendar,
  PiggyBank
} from 'lucide-react';

export const MODULES = [
  { id: 'appointments', label: 'Citas', icon: <Calendar /> },
  { id: 'products', label: 'Productos', icon: <Package /> },
  { id: 'sales', label: 'Ventas', icon: <ShoppingCart /> },
  { id: 'clients', label: 'Clientes', icon: <Users /> },
  { id: 'pettyCash', label: 'Caja Chica', icon: <PiggyBank /> },
  { id: 'expenses', label: 'Gastos', icon: <Wallet /> },
  { id: 'credits', label: 'Créditos', icon: <CreditCard /> },
  { id: 'staff', label: 'Colaboradores', icon: <UserCircle /> },
  { id: 'reports', label: 'Reportes', icon: <BarChart3 /> },
  { id: 'settings', label: 'Configuración', icon: <Settings /> },
] as const;