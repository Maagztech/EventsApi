import { Router } from 'express';
import auth from '../middleware/auth.js';
import Events from '../models/Events.js';
const router = Router();

router.post('/events', auth, async (req, res) => {
  const event = new Events({ ...req.body, admin: req.user._id });
  const newEvent = await event.save();
  res.json(newEvent);
});

router.put('/events/:id', auth, async (req, res) => {
  const event = await Events.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.admin.toString() !== req.user._id) return res.status(403).json({ message: 'Forbidden' });
  const updatedEvent = await Events.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedEvent);
});

router.delete('/events/:id', auth, async (req, res) => {
  const event = await Events.findById(req.params.id);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  if (event.admin.toString() !== req.user._id) return res.status(403).json({ message: 'Forbidden' });
  await Events.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

router.get('/events', auth, async (req, res) => {
  const events = await Events.find({ admin: req.user._id });
  res.json(events);
});

router.get('/events/public', async (req, res) => {
  const events = await Events.find({ date: { $gte: new Date() } });
  res.json(events);
});

export default router;
