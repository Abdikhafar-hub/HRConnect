// Success response helper
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

// Error response helper
const errorResponse = (res, message = 'Error occurred', statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message
  });
};

// Validation error response helper
const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    success: false,
    errors
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse
}; 