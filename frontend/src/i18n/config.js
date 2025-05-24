import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
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
    console.error('Erro ao inicializar i18n:', err);
  });

// Validação do elemento root
const container = document.getElementById('root');
if (!container) {
  throw new Error("Elemento 'root' não encontrado no HTML.");
}

// Carregamento com Suspense para fallback visual (exibe 'Carregando...' enquanto i18n carrega)
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div>Carregando...</div>}>
        <App />
      </Suspense>
    </I18nextProvider>
  </React.StrictMode>
);
