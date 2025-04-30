import mongoose from 'mongoose';
import Service from './Service.js';
import User from './User.js';

const bookingSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date_time: {
    type: Date,
    required: true,
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
    validate: {
      validator: async function (value) {
        const service = await Service.findById(value);
        return !!service;
      },
      message: 'Invalid service_id',
    },
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async function (value) {
        const user = await User.findById(value);
        return !!user;
      },
      message: 'Invalid user_id',
    },
  },
}, {
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
