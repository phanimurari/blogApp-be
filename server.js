const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Passport config
require('./config/passport');

// Import routes
const authRoute = require('./routes/authRoute');
const blogsRoute = require('./routes/blogsRoute');

// Import middleware
const errorLogger = require('./middleware/errorLogger');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // The origin of your frontend app
  credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/blogs', blogsRoute);

// Error handling middleware (should be last)
app.use(errorLogger);

console.log(process.env.MONGODB_URI, "process.env.MONGODB_URI")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
