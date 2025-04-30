import Service from '../models/Service.js';

// CREATE a new service
export const createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ message: 'Service created', data: service });
  } catch (err) {
    res.status(500).json({ message: 'Error creating service', error: err.message });
  }
};

// GET all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ data: services });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching services', error: err.message });
  }
};

// GET a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ data: service });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching service', error: err.message });
  }
};

// UPDATE a service by ID
export const updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating service', error: err.message });
  }
};

// DELETE a service by ID
export const deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting service', error: err.message });
  }
};
