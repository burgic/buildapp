import express from 'express';
const router = express.Router();
import * as clientController from '../controllers/clientcontroller.mjs';
import db from '../models/index.mjs';

// Middleware to validate client token (implement your own logic)
const validateClientToken = async (req, res, next) => {
  const token = req.query.token || req.headers['x-client-token'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    // Validate token and attach client info to the request object
    // For simplicity, assume token is client ID
    const client = await db.Client.findByPk(token);
    if (client) {
      req.client = client;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get workflow steps/data
router.get('/workflow', validateClientToken, clientController.getWorkflow);

// Submit workflow data
router.post('/workflow', validateClientToken, clientController.submitWorkflow);

// Other client routes

export default router;
