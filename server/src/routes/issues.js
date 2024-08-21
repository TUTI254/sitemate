const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue');

// Create a new issue
router.post('/', async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    await newIssue.save();
    console.log('Created:', newIssue);
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get specific issue
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    res.json(issue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an issue by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedIssue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    console.log('Updated:', updatedIssue);
    res.json(updatedIssue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an issue by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Issue.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    console.log('Deleted issue with ID:', id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
