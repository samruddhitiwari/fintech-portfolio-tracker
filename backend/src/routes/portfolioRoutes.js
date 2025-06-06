import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/portfolio
 * @desc    Get user's portfolio
 * @access  Private (requires authentication)
 */
router.get('/', protect, async (req, res) => {
  try {
    console.log("🔍 Request received for user ID:", req.user.id);  // ✅ Debugging log
    const portfolio = await Portfolio.findOne({ userId: req.user.id.toString() });

    if (!portfolio) {
      console.log("🚫 No portfolio found for:", req.user.id);  // ✅ Debugging log
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    console.log("✅ Portfolio retrieved:", portfolio);  // ✅ Debugging log
    res.json(portfolio);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

/**
 * @route   POST /api/portfolio
 * @desc    Create or update user's portfolio
 * @access  Private (requires authentication)
 */
router.post('/', protect, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ userId: req.user.id });

    if (!portfolio) {
      // Create a new portfolio if none exists
      portfolio = new Portfolio({
        userId: req.user.id,
        assets: req.body.assets,
      });
    } else {
      // Update existing portfolio
      portfolio.assets = req.body.assets || portfolio.assets;
    }

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

/**
 * @route   PUT /api/portfolio
 * @desc    Update user's portfolio assets
 * @access  Private (requires authentication)
 */
router.put('/', protect, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    portfolio.assets = req.body.assets || portfolio.assets;
    await portfolio.save();

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

export default router;