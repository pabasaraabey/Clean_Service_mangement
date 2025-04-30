import express from 'express';
import {
  getAllBookingsForAdmin,
  getBookingById,
  updateBooking,
  deleteBooking,
} from '../controllers/bookingController.js';

import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();


router.use(authMiddleware, adminMiddleware);

router.get('/', getAllBookingsForAdmin);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;
