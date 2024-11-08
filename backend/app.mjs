import express from 'express';
const app = express();
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

dotenv.config();


// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    credentials: true, // Important for cookies/authentication
    maxAge: 3600 // Cache preflight requests for 1 hour
  }));
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup for Passport.js
app.use(
  session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
import adminRoutes from './routes/adminRoutes.mjs';


app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

// OAuth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

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

export default app;
