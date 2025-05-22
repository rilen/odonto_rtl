// Salvar em: frontend/src/pages/Secretary.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Secretary = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments').then(res => setAppointments(res.data));
  }, []);

  const confirmAppointment = async (id) => {
    await axios.put(`/api/appointments/${id}`, { confirmed: true });
    setAppointments(appointments.map(a => a.id === id ? { ...a, confirmed: true } : a));
  };

  return (
    <div className="container" role="region" aria-label={t('secretary.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('secretary.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('secretary.patient')}</th><th scope="col">{t('secretary.date')}</th><th scope="col">{t('secretary.type')}</th><th scope="col">{t('secretary.actions')}</th></tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patient_id}</td>
              <td>{a.date}</td>
              <td>{a.type}</td>
              <td>
                {!a.confirmed && (
                  <button
                    onClick={() => confirmAppointment(a.id)}
                    className="button"
                    aria-label={t('secretary.confirm', { id: a.id })}
                  >
                    {t('secretary.confirm')}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Secretary;
