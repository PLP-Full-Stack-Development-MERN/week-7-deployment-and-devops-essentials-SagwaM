// server/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/usersRoutes');
const blogRoutes = require('./routes/blogsRoutes');
const commentRoutes = require('./routes/commentsRoutes');

// Middleware
const { verifyToken } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandlerMiddleware');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
