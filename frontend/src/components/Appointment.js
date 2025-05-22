// Salvar em: frontend/src/components/Appointment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Appointment = ({ userId, userRole }) => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ date: '', type: '' });

  useEffect(() => {
    fetch('/api/appointments').then(res => res.json()).then(data => setAppointments(data));
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY' })
          .then(subscription => {
            axios.post('/api/push/subscribe', { userId, subscription });
          });
      });
    }
  }, []);

  const scheduleAppointment = async () => {
    const appointment = { patient_id: userId, date: newAppointment.date, type: newAppointment.type };
    if (!navigator.onLine) {
      await caches.open('offline-appointments').then(cache => cache.put('/api/appointments', new Response(JSON.stringify(appointment))));
      navigator.serviceWorker.ready.then(sw => sw.sync.register('sync-appointments'));
    } else {
      await axios.post('/api/appointments', appointment);
      setAppointments([...appointments, appointment]);
    }
    setNewAppointment({ date: '', type: '' });
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Agendamentos</h2>
      {userRole === 'secretary' && (
        <div className="mb-4">
          <input
            type="date"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            className="input mr-2"
          />
          <select
            value={newAppointment.type}
            onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
            className="input mr-2"
          >
            <option value="">Tipo</option>
            <option value="evaluation">Avaliação</option>
            <option value="cleaning">Limpeza</option>
            <option value="treatment">Tratamento</option>
          </select>
          <button onClick={scheduleAppointment} className="button">Agendar</button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr><th>Data</th><th>Tipo</th><th>Status</th></tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}><td>{a.date}</td><td>{a.type}</td><td>{a.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointment;
