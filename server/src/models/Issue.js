const mongoose = require('mongoose');

// Define the schema for the Issue model
const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// Create and export the Issue model
module.exports = mongoose.model('Issue', issueSchema);
