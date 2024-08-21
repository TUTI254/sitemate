import axios from 'axios';
import IssueSchema from '../utils/IssueSchema.js';

const API_URL = import.meta.env.VITE_API_URL;


// Create Issue
export const createIssue = async (issue) => {
  const parsedIssue = IssueSchema.parse(issue);
  const response = await axios.post(API_URL, parsedIssue);
  return response.data;
};

// Get Issues
export const getIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Update Issue
export const updateIssue = async (id, issue) => {
  const parsedIssue = IssueSchema.parse(issue);
  const response = await axios.put(`${API_URL}/${id}`, parsedIssue);
  return response.data;
};

// Delete Issue
export const deleteIssue = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};