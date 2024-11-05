import express from 'express';
const router = express.Router();
import * as adminController from '../controllers/adminController.mjs';
import passport from 'passport';

// Middleware to protect routes
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Admin dashboard
router.get('/dashboard', authenticateJWT, adminController.dashboard);

// Invite client
router.post('/invite', authenticateJWT, adminController.inviteClient);

// Other admin routes

export default router;
