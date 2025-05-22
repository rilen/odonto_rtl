// Salvar em: tests/offline.test.js
const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');

describe('Offline Functionality', () => {
  let window, navigator;

  beforeEach(() => {
    const dom = new JSDOM(fs.readFileSync('frontend/public/index.html', 'utf-8'));
    window = dom.window;
    navigator = window.navigator;
    global.caches = {
      open: () => Promise.resolve({
        addAll: () => Promise.resolve(),
        put: () => Promise.resolve(),
        match: () => Promise.resolve(new Response(JSON.stringify([])))
      })
    };
  });

  it('should cache key resources', async () => {
    navigator.serviceWorker = { register: () => Promise.resolve() };
    const sw = fs.readFileSync('frontend/serviceWorker.js', 'utf-8');
    eval(sw);
    await window.caches.open('odonto-rtl-cache-v1');
    expect(window.caches.open).to.have.been.calledWith('odonto-rtl-cache-v1');
  });

  it('should queue appointments offline', async () => {
    navigator.onLine = false;
    const appointment = { patient_id: 1, dentist_id: 2, date: '2025-06-01', type: 'evaluation' };
    await caches.open('offline-appointments').then(cache => cache.put('/api/appointments', new Response(JSON.stringify(appointment))));
    const response = await caches.match('/api/appointments');
    expect(await response.json()).to.deep.equal(appointment);
  });
});
