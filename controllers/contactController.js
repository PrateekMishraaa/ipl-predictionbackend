import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};