// server/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    let error = { ...err };
    error.message = err.message;
  
    // Mongoose duplicate key
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const message = `Duplicate field value entered: ${field}. Please use another value.`;
      error = { message };
    }
  
    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = { message };
    }
  
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  };
  
  module.exports = errorHandler;
  