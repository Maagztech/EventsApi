import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import { generateAccessToken, generateRefreshToken } from "../config/generateTokens.js";
import Users from '../models/Admin.js';
import authCtrl from '../utils/adminUtils.js';
const router = Router();

router.post('/auth', async (req, res) => {
  const { userName, password } = req.body;
  try {
    // Check if the user already exists
    let admin = await Users.findOne({ userName });

    if (!admin) {
      // Create a new user if not found
      const hashedPassword = await hash(password, 10); // Hash the password
      admin = new Users({
        userName,
        password: hashedPassword,
        role: 'admin', // Set a default role or customize as needed
      });
      const newUser = await admin.save();

      const access_token = generateAccessToken({ id: newUser._id });
      const refresh_token = generateRefreshToken({ id: newUser._id });
      newUser.refresh_token = refresh_token;
      const regUser = await newUser.save();
      return res.status(201).json({
        message: 'New admin created',
        user: { id: admin._id, userName: admin.userName, role: admin.role },
        access_token,
        refresh_token,
      });
    }

    const validPassword = await compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const access_token = generateAccessToken({ id: admin._id });
    const refresh_token = generateRefreshToken({ id: admin._id });
    await Users.findOneAndUpdate(
      { _id: admin._id },
      {
        refresh_token
      },
      { new: true }
    );
    res.json({
      message: 'User authenticated successfully',
      user: { id: admin._id, userName: admin.userName, role: admin.role },
      access_token,
      refresh_token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/refresh_token', authCtrl.refreshToken);

export default router;
