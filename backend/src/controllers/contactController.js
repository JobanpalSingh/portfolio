import ContactMessage from '../models/ContactMessage.js';
import { sendContactNotification } from '../services/mail.js';

export async function submitContact(req, res) {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const doc = await ContactMessage.create({ name, email, subject, message });

    try {
      await sendContactNotification({
        name,
        email,
        subject,
        message,
        id: doc._id,
      });
    } catch (mailErr) {
      console.error('[mail] Failed to send contact notification:', mailErr.message || mailErr);
    }

    res.status(201).json({ ok: true, id: doc._id });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Could not send message' });
  }
}

export async function listContacts(req, res) {
  try {
    const items = await ContactMessage.find().sort({ createdAt: -1 }).limit(200);
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Failed to load messages' });
  }
}
