import express from 'express';
import Contact from '../models/Contact.js';
import { sendContactMessage } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
   console.log('Incoming contact form data:', req.body); 
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please fill all fields.' });
  }

  try {
    // Save to MongoDB
    const newMessage = new Contact({ name, email, subject, message });
    await newMessage.save();

    // Send email to authority
    await sendContactMessage({ name, email, subject, message });

    res.status(201).json({ message: '✅ Your message has been sent successfully.' });
  } catch (err) {
    console.error('Contact form error:', err.message);
    res.status(500).json({ error: '❌ Something went wrong. Please try again later.' });
  }
});

export default router;
