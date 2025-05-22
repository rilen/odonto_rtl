if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js');
}
// In Appointment.js
const scheduleAppointment = async (appointment) => {
  if (!navigator.onLine) {
    await caches.open('offline-appointments').then(cache => cache.put('/api/appointments', new Response(JSON.stringify(appointment))));
    navigator.serviceWorker.ready.then(sw => sw.sync.register('sync-appointments'));
  } else {
    await fetch('/api/appointments', { method: 'POST', body: JSON.stringify(appointment) });
  }
};
