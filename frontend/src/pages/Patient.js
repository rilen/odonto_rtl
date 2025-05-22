// Salvar em: frontend/src/pages/Patient.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Patient = ({ userId }) => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get(`/api/appointments?patient_id=${userId}`).then(res => setAppointments(res.data));
  }, [userId]);

  return (
    <div className="container" role="region" aria-label={t('patient.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('patient.title')}</h2>
      <table className="table">
        <thead>
          <tr><th scope="col">{t('patient.date')}</th><th scope="col">{t('patient.type')}</th><th scope="col">{t('patient.status')}</th></tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.date}</td>
              <td>{a.type}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patient;
