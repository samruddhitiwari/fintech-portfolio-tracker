import express from 'express';
import Transaction from '../models/Transaction.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/transactions
 * @desc    Get transactions for authenticated user
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    
    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found!" });
    }

    res.json(transactions);
  } catch (error) {
    console.error("❌ Transaction Fetch Error:", error.message); // Logs the exact error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/**
 * @route   POST /api/transactions
 * @desc    Create a new transaction
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  try {
    const { portfolioId, assetName, transactionType, quantity, priceAtTransaction } = req.body;

    // ✅ Ensure all required fields are provided
    if (!portfolioId || !assetName || !transactionType || !quantity || !priceAtTransaction) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // ✅ Validate transaction type
    if (!["Buy", "Sell"].includes(transactionType)) {
      return res.status(400).json({ message: "Invalid transaction type! Must be 'Buy' or 'Sell'." });
    }

    // ✅ Save transaction
    const transaction = await Transaction.create({
      userId: req.user.id,
      portfolioId,
      assetName,
      transactionType,
      quantity,
      priceAtTransaction,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error("❌ Transaction Creation Error:", error.message); // Logs the exact error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;