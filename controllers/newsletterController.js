import Subscriber from '../models/Subscriber.js';

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    let subscriber = await Subscriber.findOne({ email });
    if (subscriber) {
      if (!subscriber.isActive) {
        subscriber.isActive = true;
        await subscriber.save();
        return res.json({ message: 'Subscription reactivated successfully' });
      }
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Unsubscribe
// @route   POST /api/newsletter/unsubscribe
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    await Subscriber.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true }
    );
    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};