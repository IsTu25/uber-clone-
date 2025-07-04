const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captain.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

// Register Route
router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters'),
  body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters'),
  body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('vehicle.vehicleType').isIn(['Car', 'Motorcycle', 'Auto']).withMessage('Invalid vehicle type')
], captainController.registerCaptain);

// Login Route
router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], captainController.loginCaptain);

// Profile Route
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

// Logout Route
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
