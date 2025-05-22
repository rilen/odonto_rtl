// Salvar em: frontend/src/pages/Dentist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Dentist = () => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/appointments').then(res => setAppointments(res.data));
  }, []);

  return (
    <div className="container" role="region" aria-label={t('dentist.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('dentist.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('dentist.patient')}</th><th scope="col">{t('dentist.date')}</th><th scope="col">{t('dentist.type')}</th></tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patient_id}</td>
              <td>{a.date}</td>
              <td>{a.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dentist;
