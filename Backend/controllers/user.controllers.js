const { use } = require('../app');
const userModel = require('../models/user.models');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToke.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const { fullname, email, password } = req.body;

  try {
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
      firstname:fullname.firstname,
      lastname:fullname.lastname,
      email,
      password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email }).select('+password');
  
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      const token = user.generateAuthToken();
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({ token, user });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};
  
  
module.exports.getUserProfile = async(req,res,next) =>{

    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req, res, next) => {
    try {
      // Clear the token cookie (good!)
      res.clearCookie('token');
  
      // Get token from cookies or Authorization header safely
      const token =
        req.cookies?.token || 
        req.headers?.authorization?.split(' ')[1];
  
      if (!token) {
        return res.status(400).json({ message: 'No token found to logout' });
      }
  
      // Add the token to blacklist
      await BlacklistTokenModel.create({ token });
  
      res.status(200).json({ message: 'Logged Out' });
    } catch (error) {
      next(error);
    }
};
  