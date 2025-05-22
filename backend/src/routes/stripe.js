// Salvar em: backend/src/routes/stripe.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../services/stripe');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

router.post('/checkout', auth, async (req, res) => {
  const { amount, patient_id, payment_id } = req.body;
  try {
    const session = await createCheckoutSession({ amount, patient_id, payment_id });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { patient_id, payment_id } = session.metadata;
    await Payment.update(payment_id, { status: 'paid' });
  }

  res.json({ received: true });
});

module.exports = router;
