import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express(); // ✅ Define app BEFORE using routes

// Import models
import './models/User.js';
import './models/Portfolio.js';
import './models/Transaction.js';

// Middleware
app.use(cors());
app.use(express.json());

// Import routes AFTER app is initialized
import authRoutes from './routes/auth.js';
import userRoutes from './routes/userRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/transactions', transactionRoutes);



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.log("❌ Database Connection Error:", err));

// Test Route
app.get('/', (req, res) => {
  res.send('🚀 FinTech Portfolio Tracker Backend is Running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));