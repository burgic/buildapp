import express from 'express';
import session from 'express-session';
import passport from './auth/passport.mjs';
import clientRoutes from './routes/clientRoutes.mjs'
import './auth/jwt.mjs'; // Initialize JWT strategy
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken');
import adminRoutes from './routes/adminRoutes.mjs';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'https://frontend1-e691af4ef904.herokuapp.com' || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
    preflightContinue: false,
    optionsSuccessStatus: 204
  };
  
app.use(cors(corsOptions));

  // Body parser configuration
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  }));
  

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Root route for API health check
app.get('/', (req, res) => {
    res.json({ status: 'API is running' });
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
  });

app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);

// OAuth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Catch-all route for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ 
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`
    });
});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  async (req, res) => {
    // Successful authentication
    // Generate JWT token
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    res.redirect(`/admin/dashboard?token=${token}`);
  }
);

app.get('/auth/failure', (req, res) => {
  res.send('Authentication failed');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
  });

export default app;
