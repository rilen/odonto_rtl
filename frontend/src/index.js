// Salvar em: frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
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

ReactDOM.render(<App />, document.getElementById('root'));
