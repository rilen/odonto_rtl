// Salvar em: frontend/src/pages/Assistant.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Assistant = () => {
  const { t } = useTranslation();
  const [stock, setStock] = useState([]);

  useEffect(() => {
    axios.get('/api/stock').then(res => setStock(res.data));
  }, []);

  return (
    <div className="container" role="region" aria-label={t('assistant.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('assistant.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('assistant.item')}</th><th scope="col">{t('assistant.quantity')}</th><th scope="col">{t('assistant.critical')}</th></tr>
        </thead>
        <tbody>
          {stock.map(s => (
            <tr key={s.id} className={s.quantity <= s.critical_level ? 'bg-red-100' : ''}>
              <td>{s.item_name}</td>
              <td>{s.quantity}</td>
              <td>{s.critical_level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assistant;
