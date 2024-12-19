import React from 'react';
import { Receipt, Palette, Users } from 'lucide-react';

export const SETTINGS_MODULES = [
  {
    id: 'invoices',
    label: 'Facturas',
    icon: <Receipt className="h-5 w-5" />,
  },
  {
    id: 'appearance',
    label: 'Apariencia',
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: 'users',
    label: 'Usuarios',
    icon: <Users className="h-5 w-5" />,
  },
] as const;