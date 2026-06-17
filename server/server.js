require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const equipmentRoutes = require('./routes/equipment');
const maintenanceRoutes = require('./routes/maintenance');
const dashboardRoutes = require('./routes/dashboard');
const alertRoutes = require('./routes/alerts');
const reportRoutes = require('./routes/reports');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'RailGuard AI Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚂 RailGuard AI Server running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   ML API URL: ${process.env.ML_API_URL || 'http://localhost:5001'}\n`);
});
