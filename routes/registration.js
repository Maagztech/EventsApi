import { Router } from 'express';
import auth from '../middleware/auth.js';
import Registration from '../models/Registration.js';
const router = Router();

router.post('/events/register', auth, async (req, res) => {
  const registration = new Registration({ ...req.body, admin: req.user._id });
  await registration.save();
  res.json({ message: 'Registration successful' });
});

router.get('/events/registered', auth, async (req, res) => {
  const registration = await Registration.find({ admin: req.user._id });
  res.json(registration);
});


export default router;
