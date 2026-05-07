const Contractor = require('../models/Contractor');
const Service = require('../models/Service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllContractors = catchAsync(async (req, res) => {
  // Optional search query
  const { search, service, minRating } = req.query;
  
  let query = {};
  
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  
  if (service) {
    query.service = service;
  }
  
  if (minRating) {
    query.rating = { $gte: Number(minRating) };
  }

  const contractors = await Contractor.find(query).populate('service', 'name icon');
  res.status(200).json(contractors);
});

exports.getContractorById = catchAsync(async (req, res) => {
  const contractor = await Contractor.findById(req.params.id).populate('service', 'name icon description');
  
  if (!contractor) {
    return next(new AppError('Contractor not found', 404));
  }
  
  res.status(200).json(contractor);
});

exports.getServices = catchAsync(async (req, res) => {
  const services = await Service.find({ isActive: true });
  res.status(200).json(services);
});
