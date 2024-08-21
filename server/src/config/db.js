const mongoose = require('mongoose');
const log = require('../utils/logger');  
require('dotenv').config();

const connectDB = async () => {
  const dbUri = process.env.DB_URI;

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    log.info('MongoDB connected successfully ✅');
  } catch (error) {
    log.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
