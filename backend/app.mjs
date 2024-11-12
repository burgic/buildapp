import express from 'express';
import session from 'express-session';
import passport from './auth/passport.mjs';
import clientRoutes from './routes/clientRoutes.mjs';
import './auth/jwt.mjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import adminRoutes from './routes/adminRoutes.mjs';
import authRoutes from './routes/authRoutes.mjs';  // Add this import

const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://frontend1-e691af4ef904.herokuapp.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization',
    'X-Requested-With', 
    'Accept', 
    'Origin'
  ],
  credentials: true,
  maxAge: 86400
};

app.use(cors(corsOptions));

// Body parser configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoints - consolidate into one
app.get(['/health', '/api/health', '/'], (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString() 
  });
});

// API routes
app.use('/api/auth', authRoutes);  // Add auth routes
app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);

// OAuth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  async (req, res) => {
    try {
      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
      // Redirect to frontend with token
      res.redirect(`${process.env.CLIENT_URL}/dashboard?token=${token}`);
    } catch (error) {
      console.error('Auth callback error:', error);
      res.redirect('/auth/failure');
    }
  }
);

app.get('/auth/failure', (req, res) => {
  res.status(401).json({ error: 'Authentication failed' });
});

// Handle favicon requests
app.get('/favicon.ico', (req, res) => res.status(204));

// 404 handler - should come before error handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler - only need one
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    status: 'error',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

export default app;