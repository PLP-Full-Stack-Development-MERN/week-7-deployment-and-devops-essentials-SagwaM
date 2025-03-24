// server/routes/comments.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  getComments, 
  getComment, 
  createComment, 
  updateComment, 
  deleteComment 
} = require('../controllers/commentController');
const { verifyToken } = require('../middleware/auth');

// Get comments for a blog
router.get('/blog/:blogId', getComments);

// Get single comment
router.get('/:id', getComment);

// Create comment
router.post(
  '/',
  [
    verifyToken,
    body('content', 'Content is required').notEmpty(),
    body('blog', 'Blog ID is required').notEmpty()
  ],
  createComment
);

// Update comment
router.put(
  '/:id',
  [
    verifyToken,
    body('content', 'Content is required').notEmpty()
  ],
  updateComment
);

// Delete comment
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;
