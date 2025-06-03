const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const BlacklistToken = require('../models/blacklistToke.model');

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: 'Captain Already Exists' });
  }

  try {
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = new captainModel({
      fullname,
      email,
      password: hashedPassword,
      vehicle
    });

    await captain.save();

    const token = captain.generateAuthToken();

    res.status(201).json({ message: 'Captain registered successfully', token, captain });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Select password explicitly because of select:false in schema
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();

    // Set token in cookie with secure options
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({ message: 'Login successful', token, captain });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.getCaptainProfile = async (req, res) => {
  try {
    if (!req.captain) {
      return res.status(401).json({ message: 'Unauthorized: Captain not found' });
    }

    const { fullname, email, vehicle, _id } = req.captain;

    return res.status(200).json({
      captain: {
        id: _id,
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        vehicle
      }
    });
  } catch (error) {
    console.error('Error fetching captain profile:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports.logoutCaptain = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    // Add the token to the blacklist
    await BlacklistToken.create({ token });

    // Clear the cookie
    res.clearCookie('token');

    return res.status(200).json({ message: 'Captain logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Server error during logout' });
  }
};
