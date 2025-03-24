// server/models/Comment.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please provide content for your comment'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: [true, 'Please specify which blog this comment belongs to']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify which user created this comment']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual populate replies
CommentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parent',
  justOne: false
});

module.exports = mongoose.model('Comment', CommentSchema);
