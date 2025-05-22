// Salvar em: backend/src/services/googleCalendar.js
const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function createEvent({ patient_id, dentist_id, date, type, accessToken }) {
  oauth2Client.setCredentials({ access_token: accessToken });

  const event = {
    summary: `Consulta: ${type}`,
    description: `Paciente ID: ${patient_id}, Dentista ID: ${dentist_id}`,
    start: { dateTime: date, timeZone: 'America/Sao_Paulo' },
    end: { dateTime: new Date(new Date(date).getTime() + 60 * 60 * 1000).toISOString(), timeZone: 'America/Sao_Paulo' },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });

  return response.data;
}

module.exports = { createEvent };
