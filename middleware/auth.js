const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for JWT functionality
const User = require('../models/User'); // Import the User model

const auth = (roles = []) => { // Define the auth middleware function that accepts an array of roles
  if (typeof roles === 'string') { // Check if roles is a string
    roles = [roles]; // If roles is a string, convert it to an array
  }

  return async (req, res, next) => { // Return an asynchronous middleware function
    let token;

// Check for token in httpOnly cookie first
if (req.cookies.accessToken) {
  token = req.cookies.accessToken;
}
// Fallback to Authorization header
else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  token = req.headers.authorization.split(' ')[1];
}


    if (!token) { // Check if the token exists
      return res.status(401).json({ // If not, return a 401 Unauthorized error
        success: false, // Set success to false
        message: 'Not authorized to access this route' // Set the error message
      });
    }

    try { // Try to verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT_SECRET from the environment variables

      const user = await User.findById(decoded.id); // Find the user by the ID in the decoded token

      if (!user) { // Check if the user not exists
        return res.status(404).json({ // If not, return a 404 Not Found error
          success: false, // Set success to false
          message: 'No user found with this id' // Set the error message
        });
      }

      if (roles.length && !roles.includes(user.role)) { // Check if roles are specified and the user's role is not included in the allowed roles
        return res.status(403).json({ // If not, return a 403 Forbidden error
          success: false, // Set success to false
          message: 'Not authorized to access this route' // Set the error message
        });
      }

      req.user = user; // Add the user object to the request object
      next(); // Call the next middleware function
    } catch (error) { // Catch any errors
      return res.status(401).json({ // Return a 401 Unauthorized error
        success: false, // Set success to false
        message: 'Not authorized to access this route' // Set the error message
      });
    }
  };
};

module.exports = auth; // Export the auth middleware function