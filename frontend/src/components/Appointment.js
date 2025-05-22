// Salvar em: frontend/src/components/Appointment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Appointment = ({ userId, userRole }) => {
  const { t } = useTranslation();
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get('/api/appointments').then(res => setAppointments(res.data));
  }, []);

  const confirmAppointment = async (id) => {
    try {
      const res = await axios.put(`/api/appointments/${id}/confirm`);
      setAppointments(appointments.map(a => a.id === id ? res.data : a));
      setNotification(t('notifications.whatsapp_confirmation'));
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      console.error('Erro ao confirmar agendamento:', err);
    }
  };

  return (
    <div className="container" role="region" aria-label={t('secretary.title')}>
      <h2 className="text-2xl font-bold mb-4">{t('secretary.title')}</h2>
      {notification && <p className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">{notification}</p>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t('secretary.patient')}</th>
            <th scope="col">{t('secretary.date')}</th>
            <th scope="col">{t('secretary.type')}</th>
            <th scope="col">{t('secretary.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patient_id}</td>
              <td>{new Date(a.date).toLocaleString()}</td>
              <td>{a.type}</td>
              <td>
                {userRole === 'secretary' && a.status === 'pending' && (
                  <button
                    onClick={() => confirmAppointment(a.id)}
                    className="button"
                    aria-label={t('secretary.confirm_label', { id: a.id })}
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

export default Appointment;
