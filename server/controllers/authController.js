// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const JWT_SECRET = 'yourVerySecretKey123';

// ✅ REGISTER CONTROLLER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    // Generate token for auto-login after registration
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ LOGIN CONTROLLER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }



    const isMatch = await bcrypt.compare(password, user.password);

    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
        


    res.status(200).json({
      message: 'User logged in successfully', token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

   

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

