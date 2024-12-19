import { BRANDING } from '../constants/branding';

export interface InvoiceSettings {
  width: number;
  fontSize: number;
  showLogo: boolean;
  showHeader: boolean;
  showFooter: boolean;
  headerText: string;
  footerText: string;
  additionalNotes: string;
  logo: {
    url: string;
    width: number;
    height: number;
  };
  header: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
  };
}

export const DEFAULT_INVOICE_SETTINGS: InvoiceSettings = {
  width: 70,
  fontSize: 10,
  showLogo: true,
  showHeader: true,
  showFooter: true,
  headerText: '',
  footerText: '¡Gracias por su compra!',
  additionalNotes: 'Este documento es un comprobante válido',
  logo: {
    url: '',
    width: 150,
    height: 80,
  },
  header: {
    title: BRANDING.name,
    subtitle: BRANDING.slogan,
    address: '',
    phone: '',
    email: '',
  },
};

export interface Colors {
  primary: string;
  secondary: string;
  loginButton: string;
}

export interface Images {
  loginLogo: string;
  favicon: string;
  loginBackground: string;
}

export interface Branding {
  name: string;
  slogan: string;
  browserTitle: string;
}

export interface AppearanceState {
  colors: Colors;
  images: Images;
  branding: Branding;
  invoiceSettings: {
    sales: InvoiceSettings;
    credits: InvoiceSettings;
  };
}