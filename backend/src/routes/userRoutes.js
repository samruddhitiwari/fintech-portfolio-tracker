import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Get User Profile (Protected)
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update User Profile (Protected)
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = await bcrypt.hash(req.body.password, 10);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;