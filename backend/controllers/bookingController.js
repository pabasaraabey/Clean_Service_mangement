import mongoose from 'mongoose';
import Booking from '../models/Booking.js';


const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new booking
export const createBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;
  const user_id = req.user?.id;

  if (!customer_name || !address || !date_time || !service_id || !user_id) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }

  if (!isValidObjectId(service_id) || !isValidObjectId(user_id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid ObjectId for service or user' });
  }

  try {
    const newBooking = new Booking({ customer_name, address, date_time, service_id, user_id });
    await newBooking.save();
    res.status(201).json({
      status: 'success',
      message: 'Booking created successfully',
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error creating booking', error: error.message });
  }
};

// Get bookings for the logged-in user
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.user.id })
      .populate('service_id', 'name')
      .populate('user_id', 'name email');

    res.status(200).json({
      status: 'success',
      message: 'Your bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error fetching your bookings', error: error.message });
  }
};

// Admin or user-specific bookings
export const getAllBookingsForAdmin = async (req, res) => {
  try {
    const filter = req.user.isAdmin ? {} : { user_id: req.user.id };
    const bookings = await Booking.find(filter)
      .populate('service_id', 'name')
      .populate('user_id', 'name email');

    res.status(200).json({
      status: 'success',
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error fetching bookings', error: error.message });
  }
};

// Get single booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service_id', 'name')
      .populate('user_id', 'name email');

    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    if (!req.user.isAdmin && booking.user_id?.toString() !== req.user.id?.toString()) {
      return res.status(403).json({ status: 'error', message: 'Unauthorized access' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Booking retrieved successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error fetching booking', error: error.message });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  const { customer_name, address, date_time, service_id } = req.body;

  if (!isValidObjectId(service_id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid service ID' });
  }

  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    if (!req.user.isAdmin && booking.user_id?.toString() !== req.user.id?.toString()) {
      return res.status(403).json({ status: 'error', message: 'Not authorized to update' });
    }

    booking.customer_name = customer_name;
    booking.address = address;
    booking.date_time = date_time;
    booking.service_id = service_id;

    await booking.save();

    res.status(200).json({
      status: 'success',
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error updating booking', error: error.message });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ status: 'error', message: 'Booking not found' });
    }

    if (!req.user.isAdmin && booking.user_id?.toString() !== req.user.id?.toString()) {
      return res.status(403).json({ status: 'error', message: 'Not authorized to delete' });
    }

    await booking.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Booking deleted successfully',
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ status: 'error', message: 'Error deleting booking', error: error.message });
  }
};
