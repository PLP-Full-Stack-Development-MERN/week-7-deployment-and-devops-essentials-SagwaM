// server.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// In-memory database (replace with MongoDB, MySQL, etc. in production)
const users = [];

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

// User Routes
app.get('/api/users', authenticateToken, (req, res) => {
  // Only return non-sensitive information
  const safeUsers = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email
  }));
  
  res.json(safeUsers);
});

app.get('/api/users/:id', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  // Return only non-sensitive information
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});
