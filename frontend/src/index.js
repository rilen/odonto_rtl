import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from './i18n/pt.json';
import en from './i18n/en.json';

// Configuração de idiomas suportados
const supportedLanguages = ['pt', 'en'];
const browserLang = navigator.language?.split('-')[0];
const defaultLng = supportedLanguages.includes(browserLang) ? browserLang : 'pt';

// Inicialização do i18n com tratamento de erro
i18n
  .use(initReactI18next)
  .init({
    resources: {
      pt: { translation: pt },
      en: { translation: en }
    },
    lng: defaultLng,
    fallbackLng: 'pt',
    interpolation: { escapeValue: false }
  })
  .catch((err) => {
    // Feedback para falha na inicialização do i18n
    // (por exemplo, log para o desenvolvedor ou exibir mensagem)
    console.error('Erro ao inicializar i18n:', err);
  });

// Verifica se o elemento root existe antes de iniciar a aplicação
const container = document.getElementById('root');
if (!container) {
  // Feedback para o desenvolvedor caso o elemento root não exista
  throw new Error("Elemento 'root' não encontrado no HTML.");
}

// Montagem da aplicação
const root = createRoot(container);
root.render(<App />);
