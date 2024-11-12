import express from 'express';
import { authenticateJWT } from '../auth/jwt.mjs';
import * as adminController from '../controllers/admincontroller.mjs';
import { dashboard } from '../controllers/admincontroller.mjs';

const router = express.Router();

// Dashboard route - this will be accessed as /api/admin/dashboard
router.get('/dashboard', authenticateJWT, dashboard)

// Other admin routes
router.post('/invite', authenticateJWT, adminController.inviteClient);

export default router;