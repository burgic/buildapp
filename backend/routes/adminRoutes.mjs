import express from 'express';
import { authenticateJWT } from '../auth/jwt.mjs';
import * as adminController from '../controllers/admincontroller.mjs';

const router = express.Router();

// Dashboard route - this will be accessed as /api/admin/dashboard
router.get('/dashboard', authenticateJWT, async (req, res) => {
  try {
    // You can either put the logic here or move it to a controller
    const dashboardData = {
      status: 'success',
      message: 'Welcome to admin dashboard',
      user: req.user ? {
        id: req.user.id,
        email: req.user.email
      } : null,
      timestamp: new Date().toISOString()
    };
    
    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Failed to load dashboard' 
    });
  }
});

// Other admin routes
router.post('/invite', authenticateJWT, adminController.inviteClient);

export default router;