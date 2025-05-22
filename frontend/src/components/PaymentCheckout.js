// Salvar em: frontend/src/components/PaymentCheckout.js
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useTranslation } from 'react-i18next';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentCheckout = ({ payment }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    try {
      const response = await axios.post('/api/stripe/checkout', {
        amount: payment.amount,
        patient_id: payment.patient_id,
        payment_id: payment.id,
      });
      await stripe.redirectToCheckout({ sessionId: response.data.id });
    } catch (err) {
      setError(t('payment.error'));
    }
  };

  return (
    <div className="container" role="region" aria-label={t('payment.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('payment.title')}</h2>
      <p>{t('payment.amount')}: R${payment.amount}</p>
      {error && <p className="alert">{error}</p>}
      {success && <p className="bg-green-100 text-green-800 p-3 rounded-lg">{t('payment.success')}</p>}
      <button onClick={handleCheckout} className="button mt-4">{t('payment.pay_now')}</button>
    </div>
  );
};

export default PaymentCheckout;
