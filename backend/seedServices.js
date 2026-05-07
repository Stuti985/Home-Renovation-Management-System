const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Contractor = require('./models/Contractor');
const connectDB = require('./config/db');

dotenv.config();

const services = [
  { name: 'Plumbing', description: 'Pipe installation, leak repair, and water systems.', icon: 'droplet' },
  { name: 'Electrical', description: 'Wiring, panel upgrades, and lighting installations.', icon: 'zap' },
  { name: 'Carpentry', description: 'Custom cabinets, framing, and woodwork.', icon: 'hammer' },
  { name: 'Painting', description: 'Interior and exterior painting services.', icon: 'paint-roller' },
  { name: 'HVAC', description: 'Heating, ventilation, and air conditioning.', icon: 'thermometer-sun' }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing
    await Service.deleteMany();
    await Contractor.deleteMany();
    
    // Insert Services
    const createdServices = await Service.insertMany(services);
    console.log('Services Seeded successfully!');

    // Insert Dummy Contractors
    const contractors = [
      { name: 'Mario Bros Plumbing', contact: '555-0101', service: createdServices[0]._id, rate: 85, rating: 4.8, reviewCount: 12 },
      { name: 'Sparky Electric', contact: '555-0102', service: createdServices[1]._id, rate: 95, rating: 4.9, reviewCount: 8 },
      { name: 'Woodcrafters Inc.', contact: '555-0103', service: createdServices[2]._id, rate: 75, rating: 4.5, reviewCount: 15 }
    ];

    await Contractor.insertMany(contractors);
    console.log('Contractors Seeded successfully!');

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
