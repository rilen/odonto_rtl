import React from 'react';
import { createRoot } from 'react-dom/client'; // Atualizado para React 18+
import './styles.css';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './i18n/pt.json';
import en from './i18n/en.json';

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en }
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false }
});

// React 18+
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
