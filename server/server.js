const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Sample hard-coded issues
let issues = [
  { id: 1, title: "Issue 1", description: "This is the first issue." },
  { id: 2, title: "Issue 2", description: "This is the second issue." },
  { id: 3, title: "Issue 3", description: "This is the third issue." }
];

// Create
app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log('Created:', newIssue);
  res.status(201).json(newIssue);
});

// Read
app.get('/api/issues', (req, res) => {
  res.json(issues);
});

// Update
app.put('/api/issues/:id', (req, res) => {
  const { id } = req.params;
  const updatedIssue = req.body;
  issues = issues.map(issue => issue.id == id ? updatedIssue : issue);
  console.log('Updated:', updatedIssue);
  res.json(updatedIssue);
});

// Delete
app.delete('/api/issues/:id', (req, res) => {
  const { id } = req.params;
  issues = issues.filter(issue => issue.id != id);
  console.log('Deleted issue with ID:', id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
