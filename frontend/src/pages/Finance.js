// Salvar em: frontend/src/pages/Finance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import PaymentCheckout from '../components/PaymentCheckout';

const Finance = () => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    axios.get('/api/payments').then(res => setPayments(res.data));
  }, []);

  return (
    <div className="container" role="region" aria-label={t('finance.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('finance.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('finance.patient')}</th><th scope="col">{t('finance.amount')}</th><th scope="col">{t('finance.status')}</th><th scope="col">{t('finance.actions')}</th></tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className={p.status === 'paid' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}>
              <td>{p.patient_id}</td>
              <td>R${p.amount}</td>
              <td>{p.status}</td>
              <td>
                {p.status !== 'paid' && (
                  <button
                    onClick={() => setSelectedPayment(p)}
                    className="button"
                    aria-label={t('finance.pay', { id: p.id })}
                  >
                    {t('finance.pay')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPayment && <PaymentCheckout payment={selectedPayment} />}
    </div>
  );
};

export default Finance;
