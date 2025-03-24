// server/routes/blogs.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  getBlogs, 
  getBlog, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const { verifyToken, authorize } = require('../middleware/auth');

// Get all blogs (public)
router.get('/', getBlogs);

// Get single blog (public)
router.get('/:id', getBlog);

// Create blog (private)
router.post(
  '/',
  [
    verifyToken,
    body('title', 'Title is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
    body('excerpt', 'Excerpt is required').notEmpty()
  ],
  createBlog
);

// Update blog (private)
router.put(
  '/:id',
  verifyToken,
  updateBlog
);

// Delete blog (private)
router.delete(
  '/:id',
  verifyToken,
  deleteBlog
);

module.exports = router;
