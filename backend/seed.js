require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');

async function main(){
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany({});
  await Project.deleteMany({});

  const pw = await bcrypt.hash('Password123', 10);
  const user = await User.create({ name: 'Demo User', email: 'demo@local', password: pw });

  const project = await Project.create({
    owner: user._id,
    title: 'Demo Renovation',
    description: 'Seeded demo project',
    budgetEstimate: 50000
  });

  console.log('Seed complete', { user: { id: user._id, email: user.email }, projectId: project._id });
  process.exit(0);
}

main().catch(err=>{ console.error(err); process.exit(1); });
