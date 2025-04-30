
import express from 'express';
import {
  loginUser,
  registerUser,
  getMe,
  getAllUsers,
 
} from '../controllers/authController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/me', authMiddleware, getMe);


router.get('/users', authMiddleware, adminMiddleware, getAllUsers);

export default router;
