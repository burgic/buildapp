import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authenticateJWT } from '../auth/jwt.mjs';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    // For testing purposes - replace this with real user authentication
    const mockUser = {
      id: 1,
      email: 'admin@example.com',
      role: 'admin'
    };

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: mockUser.id,
        role: mockUser.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      status: 'success',
      token,
      user: {
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Authentication failed'
    });
  }
});

// Logout route
router.post('/logout', authenticateJWT, (req, res) => {
  try {
    // Clear session if using sessions
    if (req.session) {
      req.session.destroy();
    }
    res.json({ status: 'success', message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Logout failed'
    });
  }
});

// Verify token route (useful for frontend token validation)
router.get('/verify', authenticateJWT, (req, res) => {
  res.json({
    status: 'success',
    user: req.user
  });
});

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/auth/failure' 
  }),
  async (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user.id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Redirect to frontend with token
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
      res.redirect(`${clientUrl}/dashboard?token=${token}`);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect('/auth/failure');
    }
  }
);

// Check auth status
router.get('/status', authenticateJWT, (req, res) => {
  res.json({
    status: 'success',
    isAuthenticated: true,
    user: req.user
  });
});

// Refresh token route (optional)
router.post('/refresh-token', authenticateJWT, (req, res) => {
  try {
    const newToken = jwt.sign(
      { id: req.user.id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      status: 'success',
      token: newToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to refresh token'
    });
  }
});

// Auth failure route
router.get('/failure', (req, res) => {
  res.status(401).json({
    status: 'error',
    message: 'Authentication failed'
  });
});

export default router;