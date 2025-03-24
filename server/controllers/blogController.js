// server/controllers/blogController.js
const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');
const slugify = require('slugify');

// Get all blogs
exports.getBlogs = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sort = '-createdAt', 
      category, 
      tag, 
      author, 
      status = 'published',
      featured,
      search
    } = req.query;

    const query = { status };

    // Filter by category
    if (category) {
      query.categories = { $in: [category] };
    }

    // Filter by tag
    if (tag) {
      query.tags = { $in: [tag] };
    }

    // Filter by author
    if (author) {
      query.author = author;
    }

    // Filter by featured
    if (featured) {
      query.featured = featured === 'true';
    }

    // Search by title or content
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    // If user is admin, they can see draft posts
    if (req.user && req.user.role === 'admin') {
      if (req.query.status) {
        query.status = req.query.status;
      } else {
        delete query.status;
      }
    }

    const blogs = await Blog.find(query)
      .populate({
        path: 'author',
        select: 'name avatar'
      })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      blogs
    });
  } catch (error) {
    next(error);
  }
};

// Get single blog
exports.getBlog = async (req, res, next) => {
  try {
    let blog;
    
    // Find by ID or slug
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      blog = await Blog.findById(req.params.id);
    } else {
      blog = await Blog.findOne({ slug: req.params.id });
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    // Populate author and comments
    await blog.populate([
      {
        path: 'author',
        select: 'name avatar bio'
      },
      {
        path: 'comments',
        select: 'content user createdAt',
        match: { parent: null },
        populate: {
          path: 'user',
          select: 'name avatar'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// Create blog
exports.createBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    req.body.author = req.user.id;
    
    // Generate slug from title if not provided
    if (!req.body.slug) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }

    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// Update blog
exports.updateBlog = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is blog owner or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
    }

    // Update slug if title changed
    if (req.body.title && req.body.title !== blog.title && !req.body.slug) {
      req.body.slug = slugify(req.body.title, { lower: true });
    }

    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};

// Delete blog
exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    // Check if user is blog owner or admin
    if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
    }

    await blog.remove();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
