const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const issueRoutes = require('./routes/issues');
const log = require('./utils/logger');  

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json()); 

// API Routes
app.use('/api/issues', issueRoutes);
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB before starting the server
    app.listen(PORT, () => {
      log.info(`🚦Server running ✅ 🚀 on http://localhost:${PORT}`);
    });
  } catch (error) {
    log.error('❌ Server failed to start:', error.message);
    process.exit(1);
  }
};

startServer();
