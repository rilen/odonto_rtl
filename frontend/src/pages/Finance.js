// Salvar em: frontend/src/pages/Finance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Finance = () => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get('/api/payments').then(res => setPayments(res.data));
  }, []);

  return (
    <div className="container" role="region" aria-label={t('finance.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('finance.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('finance.patient')}</th><th scope="col">{t('finance.amount')}</th><th scope="col">{t('finance.status')}</th></tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className={p.status === 'paid' ? 'bg-green-100' : 'bg-red-100'}>
              <td>{p.patient_id}</td>
              <td>R${p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Finance;
